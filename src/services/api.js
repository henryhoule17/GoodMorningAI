import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const generalApi = createApi({
    reducerPath: 'generalApi',

    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://127.0.0.1:5000',
    }),
    endpoints: (builder) => ({
        postGeneral: builder.mutation({
            query: ({ messageData, endpoint }) => ({
                url: endpoint,
                method: 'POST',
                body: messageData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
})

export const { usePostGeneralMutation } = generalApi;
