import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define a type for the slice state
interface CommonState {
  showMobileMenu: boolean;
}

// Define the initial state using that type
const initialState: CommonState = {
  showMobileMenu: false,
};

export const commonSlice = createSlice({
  name: "common",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.showMobileMenu = action.payload;
    },
  },
});

export const { setShowMobileMenu } = commonSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.common.showMobileMenu

export default commonSlice.reducer;
