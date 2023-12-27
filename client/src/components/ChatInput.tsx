import '../static/css/chatinput.css'
import { Ref } from 'preact';
import send_svg from '../static/img/send.svg'

interface IChatInput {
    msgRef: Ref<HTMLInputElement>;
    handleSendMessage: (e:Event) => void;
}


function ChatInput({ msgRef, handleSendMessage }: IChatInput) {
    return (
        <div className="chat-input">
            <form class="chat-input-form">
                <input ref={msgRef} placeholder="type something"></input>
                <button className="send-button" type="submit" onClick={handleSendMessage}>
                    <img src={send_svg} className="icon"></img>
                </button>
            </form>
        </div>
    )
}

export default ChatInput