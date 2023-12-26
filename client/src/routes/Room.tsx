import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../interfaces/redux.interfaces";
import { route } from "preact-router";
import { useState, useEffect, useRef } from "preact/hooks";
import axios from "axios";
import { USER } from "../redux/actionTypes";

interface IMessage {
    name: string;
    message: string;
}

function Room() {
    const path: string[] = window.location.pathname.split('/');
    const id: string = path[path.length - 1];

    const msgRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [messages, setMessages] = useState<IMessage[]>([]);

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

    function handleSendMessage() {
        if (ws !== null && msgRef.current) {
            ws.send(JSON.stringify({
                name: user.username, message: msgRef.current.value
            }));
            msgRef.current.value = ''; // Clear the input field after sending the message
        }
    }

    return (
        <div className="room">
            <div className='room-info'>
                <button onClick={handleGoBack}>back</button>
                <p>Room {id}</p>
                <p>User {user.username}</p>
            </div>
            <div className="chat">
                <input ref={msgRef} placeholder="type something"></input>
                <button onClick={handleSendMessage}>send</button>
            </div>
            <div className="messages">
                {messages.map((item, index) => (
                    <p key={index}>{item.name}: {item.message}</p>
                ))}
            </div>
        </div>
    );
}

export default Room;
