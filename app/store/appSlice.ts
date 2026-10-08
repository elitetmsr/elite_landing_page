import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isInitialized: boolean;
  theme: "light" | "dark";
}

const initialState: AppState = {
  isInitialized: true,
  theme: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
