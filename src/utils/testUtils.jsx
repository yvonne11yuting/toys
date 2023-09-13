import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import commonSlice from "@/store/common/commonSlice";
import tlySlice from "@/store/tly/tlySlice";
import { tlyVocApi } from "@/store/tly/tlyVocApi";

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                common: commonSlice,
                tly: tlySlice,
                [tlyVocApi.reducerPath]: tlyVocApi.reducer
            },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
