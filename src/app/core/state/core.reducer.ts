import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as UserReducer from "./user/user.reducer";
import * as EventReducer from "./event/event.reducer";

export const reducers: ActionReducerMap<State> = {
    user: UserReducer.reducer,
    events: EventReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = [];