import { configureStore } from "@reduxjs/toolkit"
import { topicApi } from "./api"

export const store = configureStore({
    reducer: {
        [topicApi.reducerPath]: topicApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(topicApi.middleware)
});