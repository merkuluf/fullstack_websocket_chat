import Router from "preact-router"
import Home from "./routes/Home"
import FlashMessage from "./components/FlashMessage"
import Lobby from "./routes/Lobby"
import Room from "./routes/Room"


export function App() {

	return (
		<>
			<FlashMessage />
			<Router>
				<Home path='/' />
				<Lobby path='/lobby' />
				<Room path='/room/:id' />
			</Router>
		</>
	)
}
