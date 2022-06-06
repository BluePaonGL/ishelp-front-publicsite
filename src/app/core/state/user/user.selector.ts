import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const selectUser = createFeatureSelector<UserState>("user");

export const selectUserUsername = createSelector(
    selectUser,
    (state: UserState) => state.user.username
);

export const selectUserLastName = createSelector(
    selectUser,
    (state: UserState) => state.user.lastName
);

export const selectUserFirstName = createSelector(
    selectUser,
    (state: UserState) => state.user.firstName
);

export const selectUserId = createSelector(
    selectUser,
    (state: UserState) => state.user.id
);