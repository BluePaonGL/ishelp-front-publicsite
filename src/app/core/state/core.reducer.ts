import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as UserReducer from "./user/user.reducer";

export const reducers: ActionReducerMap<State> = {
    user: UserReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];