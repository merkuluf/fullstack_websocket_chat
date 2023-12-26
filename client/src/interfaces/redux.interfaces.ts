export interface IFlash {
    active: boolean;
    message: string;
}

export interface IUser {
    username: string;
    password: string;
}


export interface RootState {
    user: IUser;
    flash: IFlash;
}