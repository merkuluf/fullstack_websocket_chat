import { FLASH } from "./actionTypes";
import { IFlash } from "../interfaces/redux.interfaces";

const initialState: IFlash = {
    active: false,
    message: '',
};


interface PayloadInterface {
    type: string;
    payload: IFlash | null; 
}

const flashReducer = (state = initialState, action: PayloadInterface) => {
	switch (action.type) {
		case FLASH.SET:
            return action.payload
		default:
			return state;
	}
};

export default flashReducer;
