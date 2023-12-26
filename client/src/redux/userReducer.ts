import { USER } from "./actionTypes";
import { IUser } from "../interfaces/redux.interfaces";
const initialState = {
    username: '',
    password: '',
};



interface IAction {
    type: string;
    payload: IUser | null; 
}

const userReducer = (state = initialState, action: IAction) => {
	switch (action.type) {
		case USER.SET:
            return action.payload

		case USER.DELETE:
            return initialState
					
		default:
			return state;
	}
};

export default userReducer;
