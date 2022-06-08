import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as UserReducer from "./user/user.reducer";
import * as EventReducer from "./event/event.reducer";
import * as ApplicationReducer from "./applications/application.reducer";

export const reducers: ActionReducerMap<State> = {
    user: UserReducer.reducer,
    events: EventReducer.reducer,
    applications: ApplicationReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = [];