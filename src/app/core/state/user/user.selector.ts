import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const selectUser = createFeatureSelector<UserState>("user");

export const selectUserUsername = createSelector(
    selectUser,
    (state: UserState) => state.user.username
);