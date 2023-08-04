import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://127.0.0.1:5000',
    }),
    endpoints: (builder) => ({
        postAuthCheck: builder.mutation({
            query: ({ formData, endpoint }) => ({
                url: endpoint,
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
})

export const { usePostAuthCheckMutation } = authApi;
