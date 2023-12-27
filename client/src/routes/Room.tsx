import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../interfaces/redux.interfaces";
import { route } from "preact-router";
import { useState, useEffect, useRef } from "preact/hooks";
import axios from "axios";
import { USER } from "../redux/actionTypes";
import '../static/css/room.css'
import back_svg from '../static/img/back.svg'
import UserHead from "../components/UserHead";
import ChatInput from "../components/ChatInput";
import Message from "../components/Message";

interface IMessage {
    name: string;
    message: string;
    timestamp: string;
    room: string;
}

function Room() {
    const path: string[] = window.location.pathname.split('/');
    const id: string = path[path.length - 1];

    const msgRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [messages, setMessages] = useState<IMessage[]>([]);
    const thisRoomMessages = messages.filter((message: IMessage) => message.room === id);


    useEffect(() => {
        const _token = localStorage.getItem('token');

        axios.get(`http://localhost:3000/auth/jwt`, {
            headers: {
                'Authorization': `Bearer ${_token}`
            }
        }).then(res => {
            if (res.data.error === true) {
                return route('/');
            }
            dispatch({
                type: USER.SET, payload: {
                    username: res.data.username,
                    password: 'true',
                }
            });
        });
    }, []);

    function handleGoBack() {
        route('/lobby');
    }

    const [ws, setWs] = useState<WebSocket | null>(null);
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');
        setWs(socket);

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, ...data]);
            console.log('Message from server ', data);
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
            setWs(null);
        };

        return () => {
            socket.close();
        };
    }, []);

    function handleSendMessage(e: Event) {
        e.preventDefault()
        if (ws !== null && msgRef.current) {
            ws.send(JSON.stringify({
                name: user.username, 
                message: msgRef.current.value,
                room: id,
            }));
            msgRef.current.value = ''; // Clear the input field after sending the message
        }
    }

    const messagesEndRef = useRef<HTMLInputElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Dependency array ensures this runs when 'messages' changes



    return (
        <div className="room">
            <UserHead
                actionFunction={handleGoBack}
                icon_svg={back_svg}
                user={user}
                txt_content={`Room #${id}`}
            />
            <div className="chat-parent">
                <ChatInput
                    msgRef={msgRef}
                    handleSendMessage={handleSendMessage}
                />
                <div className="messages">
                    {thisRoomMessages.map((item, index) => {
                        return <Message
                            role={user.username === item.name ? 0 : 1}
                            index={index}
                            message={item.message}
                            timestamp={item.timestamp}
                            username={item.name}
                        />
                    })}
                    <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}

                </div>

            </div>
        </div>
    );
}

export default Room;
