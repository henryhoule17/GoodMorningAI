import { configureStore } from "@reduxjs/toolkit"
import { topicApi } from "./api"
import { authApi } from "./auth"
import drawerReducer from "./drawerState"

export const store = configureStore({
    reducer: {
        [topicApi.reducerPath]: topicApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        drawer: drawerReducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware()
            .concat(topicApi.middleware)
            .concat(authApi.middleware)
        )
});