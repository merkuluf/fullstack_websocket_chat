import '../static/css/flash.css'
import { useSelector } from 'react-redux';
import { IFlash, RootState } from '../interfaces/redux.interfaces';


function FlashMessage() {

    const flashState: IFlash = useSelector((state: RootState) => state.flash)

    return (
        <div className={`flash ${flashState.active && 'f-act'}`}>
            {flashState.message}
        </div>
    );
}

export default FlashMessage;
