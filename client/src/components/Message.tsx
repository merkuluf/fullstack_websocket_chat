import '../static/css/message.css'
import stringToColor from '../utils/stringToHex'

interface IMessage {
    message: string,
    timestamp: string,
    username: string,
    index: number,
    role: number,
}


function Message({ message, timestamp, username, index, role }: IMessage) {

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    });
    return (
        <div className={`message-wrapper ${role === 0 && 'from-sender'}`}>
            <div
                className='message'
                style={{backgroundColor: stringToColor(username)}}
                key={index}
            >
                <p className="message-username">{username}</p>
                <p>{message}</p>
                <br />
                <span className="message-timestamp">{formattedDate}</span>
            </div>
        </div>
    )
}

export default Message