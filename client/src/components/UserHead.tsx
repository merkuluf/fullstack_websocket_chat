import { IUser } from "../interfaces/redux.interfaces"
import '../static/css/userhead.css'


interface IUserHead {
    user: IUser;
    actionFunction: () => void;
    icon_svg: any;
    txt_content?: string;
}

function UserHead({user, actionFunction, icon_svg, txt_content}: IUserHead) {
    return (
        <div className='userhead-parent'>
            <div className="userhead-avatar">{user.username.slice(0, 1)}</div>
            <p>{user.username}</p>
                {txt_content && <span className="txt-content">{txt_content}</span>}
            <button className="userhead-action-button" onClick={actionFunction}>
                <img className="icon" src={icon_svg}></img>
            </button>
        </div>
    )
}

export default UserHead