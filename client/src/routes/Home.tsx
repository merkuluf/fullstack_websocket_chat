import { generateRandomUsername, generateRandomPassword } from "../utils/generators";

import '../static/css/home.css'
import { useFlash } from "../utils/flashController";

import { IUser, RootState } from "../interfaces/redux.interfaces";
import { useSelector, useDispatch } from "react-redux";
import { USER } from "../redux/actionTypes";

import Loading from "../components/Loading";
import {  useState } from "preact/hooks";

import axios from "axios";
import { ChangeEvent } from "preact/compat";
import { route } from "preact-router";

import swap_svg from '../static/img/swap.svg'
import show_svg from '../static/img/show.svg'
import hide_svg from '../static/img/hide.svg'
import trash_svg from '../static/img/trash.svg'


function Home() {

    const { showFlash } = useFlash()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const [sent, setSent] = useState(false)


    function getAccount(): void {

        const username: string = generateRandomUsername()
        showFlash(3000, `New user ${username} suggested! Make sure you save credentials.`)

        dispatch({
            type: USER.SET, payload: {
                username: username,
                password: generateRandomPassword(),
            }
        })
    }

    const [scenario, setScenario] = useState<string>('Login')

    function handleAccount(): void {
        setScenario('Register')
        getAccount()
    }




    const [rotation, setRotation] = useState(360)

    function regenerateAccoint(): void {
        getAccount()
        setRotation((prevRotation) => {
            return prevRotation > 720 ? 360 : prevRotation += 360
        })

        const element = document.getElementById('regenerate');
        if (element) {
            element.style.transform = `rotate(${rotation}deg)`
        }

    }

    function discardAccount(): void {
        setScenario('Login')
        dispatch({type: USER.SET, payload: {
            username: '',
            password: '',
        }})
    }





    function handleLogin(e: Event): void {
        e.preventDefault()

        const userData: IUser = {
            username: user.username,
            password: user.password
        }

        setSent(true)

        // @ts-ignore
        userData['scenario'] = scenario
        console.log(userData)
        axios.post('http://localhost:3000/auth/', userData)
            .then(res => {
                console.log(res)
                if (res.data.error === true) {
                    showFlash(3000, res.data.message)
                } else {
                    showFlash(3000, res.data.message)
                    localStorage.setItem("token", res.data.token)
                    route('/lobby')
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setSent(false) 
            })

    }

    function handleChangeInput(e: ChangeEvent) {

        dispatch({
            type: USER.SET, payload: {

                //@ts-ignore
                ...user, [e.target.name]: e.target.value
            }
        })
    }


    const [showPass, setShowPass] = useState(false)

    const handleShowPass = (e: ChangeEvent) => {
        e.preventDefault()
        setShowPass(!showPass)
    }

    const title: string = sent ? 'Logging...' : 'Enter chat'
    // const userRecorded: boolean = (user.username || user.password) !== ''
    return (
        <main>
            <h1>{title}</h1>
            {sent
                ?
                <Loading />
                :
                <>
                    <div className="button-holder">
                        <button
                            className="main-button"
                            disabled={scenario === 'Register'}
                            onClick={handleAccount}>
                            Get Account
                        </button>
                        {scenario === 'Register' &&
                        <>
                            <button onClick={regenerateAccoint} className='icon-btn'>
                                <img id='regenerate' className="icon" src={swap_svg}></img>
                            </button>
                            <button onClick={discardAccount} className='discard-icon-btn'>
                                <img id='discard' className="icon" src={trash_svg}></img>
                            </button>
                        </>
                        }
                    </div>
                    <form>
                        <input
                            onChange={handleChangeInput}
                            placeholder='username'
                            name="username"
                            value={user.username}></input>
                        <span className="form-span">
                            <button onClick={handleShowPass} className="hide-show">
                                {showPass ? <img className="icon" src={hide_svg}></img> : <img className="icon" src={show_svg}></img>}
                            </button>
                            <input
                                onChange={handleChangeInput}
                                placeholder='password'
                                name="password"
                                type={showPass ? "text" : "password"}
                                value={user.password}></input>
                        </span>
                        <button className="main-button" onClick={handleLogin} type="submit">{scenario}</button>
                    </form>
                </>
            }
        </main>
    )
}

export default Home