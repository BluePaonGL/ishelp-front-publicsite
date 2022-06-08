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
    (state: UserState) => state.user.userId
);

export const selectUserEmail = createSelector(
    selectUser,
    (state: UserState) => state.user.email
);

export const selectUserStudentId = createSelector(
    selectUser,
    (state: UserState) => state.user.studentId
);

export const selectUserEvents = createSelector(
    selectUser,
    (state: UserState) => state.user.events
);