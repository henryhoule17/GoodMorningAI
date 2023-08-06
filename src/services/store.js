import { configureStore } from "@reduxjs/toolkit"
import { generalApi } from "./api"
import drawerReducer from "./drawerState"
import authTokenReducer from "./authToken"

export const store = configureStore({
    reducer: {
        [generalApi.reducerPath]: generalApi.reducer,
        drawer: drawerReducer,
        authToken: authTokenReducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware()
            .concat(generalApi.middleware)
        )
});