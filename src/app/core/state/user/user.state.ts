import { User } from "../../models/user.model";

export interface UserState {
    user: User;
}

export const initialState: UserState = {
    user: {} as User,
}