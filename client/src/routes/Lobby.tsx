import axios from "axios"
import { route } from "preact-router"
import { useEffect, useState } from "preact/hooks"
import { useDispatch, useSelector } from "react-redux"
import { USER } from "../redux/actionTypes"
import { RootState } from "../interfaces/redux.interfaces"
import '../static/css/lobby.css'

function Lobby() {

    const _token = localStorage.getItem("token")
    const dispatch = useDispatch()

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    useEffect(() => {

        axios.get('http://localhost:3000/auth/jwt', {
            headers: {
                'Authorization': `Bearer ${_token}`
            }
        })
            .then(res => {
                if (res.data.error === true) {
                    return route('/')
                }
                dispatch({
                    type: USER.SET, payload: {
                        username: res.data.username,
                        password: 'true',
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                // do smth 
            })

    }, [_token])

    const [roomsAmt, setRoomsAmt] = useState<number[]>([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/rooms')
            .then(res => {

                setRoomsAmt(res.data.amt)
            })
            .catch(err => {
                console.log(err)
            })
        // .finally(() => {
        //     console.log('finally')
        // })
    }, [])





    const user = useSelector((state: RootState) => state.user)

    function handleRedirect(e: MouseEvent) {
        // @ts-ignore
        console.log(e.target.id)
        // @ts-ignore
        route('/room/' + e.target.id)
    }

   

    return (
        <div className="lobby">
            <div className='user-profile'>
                <div className="avatar">{user.username.slice(0, 1)}</div>
                <p>{user.username}</p>
                <button className="logout-button" onClick={handleLogout}>
                    logout
                </button>
            </div>
            {roomsAmt.map((item, index) => {
                return <button
                    className="main-button"
                    key={index}
                    // @ts-ignore
                    id={index}
                    onClick={handleRedirect}
                >
                    Server #{item}
                </button>
            })}

        </div>
    )
}

export default Lobby