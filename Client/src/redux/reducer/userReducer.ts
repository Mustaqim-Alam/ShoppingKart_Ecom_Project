import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userReducerInitialState } from "../../types/reducerTypes";
import { User } from "../../types/types";

const initialState: userReducerInitialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExists: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExists: (state) => {
      state.loading = true;
      state.user = null;
    },
  },
});

export const {userExists, userNotExists} = userReducer.actions
