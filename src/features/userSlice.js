import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        loginUser: localStorage.getItem("users")
            ? JSON.parse(localStorage.getItem("users"))
            : null,
    },
    reducers: {
      userData: (state,actions) => {
        state.loginUser = actions.payload
      }
    },
});


export const { userData } = userSlice.actions;

export default userSlice.reducer;
