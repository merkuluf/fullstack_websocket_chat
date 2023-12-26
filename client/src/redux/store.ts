import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';
import flashReducer from './flashReducer';

const rootReducer = combineReducers({
    user: userReducer,
    flash: flashReducer
});

export const store = createStore(rootReducer);