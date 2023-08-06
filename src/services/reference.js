import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const topicApi = createApi({
    reducerPath: 'topicApi',

    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://127.0.0.1:5000',
    }),
    endpoints: (builder) => ({
        postTestMessage: builder.mutation({
            query: ({ phone, messageType }) => ({
                url: '/test-message',
                method: 'POST',
                body: {
                    phoneNumber: phone,
                    messageType: messageType,
                },
            }),
        }),
    }),
})

export const { usePostTestMessageMutation } = topicApi;
