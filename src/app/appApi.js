import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const ServerUrl = 'http://localhost:5000'
// const ServerUrl = 'http://localhost:5000'
export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: ServerUrl,
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().tokenSlice
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', token)
            }
            return headers
        },

    }),

    endpoints: (builder) => ({

        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/adminLogin",
                method: "POST",
                body: userData,
                credentials: 'include',

            })
        }),
        profile: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET",
                credentials: 'include',
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: "/getUsers",
                method: "GET",
                credentials: 'include',
            })
        }),


        deleteById: builder.mutation({
            query: (id) => ({
                url: "/deleteById",
                method: "POST",
                body: id,
                credentials: 'include',

            })
        }),
        addUsers: builder.mutation({
            query: (userData) => ({
                url: "/addAdmin",
                method: "POST",
                body: userData,
                credentials: 'include',

            })
        }),
        editUserRole: builder.mutation({
            query: (userData) => ({
                url: "/editRole",
                method: "POST",
                body: userData,
                credentials: 'include',

            })
        }),
        uploadFont: builder.mutation({
            query: (FontData) => ({
                url: "/uploadFont",
                method: "POST",
                body: FontData,
                credentials: 'include',

            })
        }),
        getFontsData: builder.query({
            query: () => ({
                url: "/getFonts",
                method: "GET",
                credentials: 'include',
            })
        }),

        deleteFontsById: builder.query({
            query: (id) => ({
                url: `/deleteFont?id=${id}`,
                method: "GET",
                credentials: 'include',
            })
        }),

        visits: builder.query({
            query: () => '/getVisitors'
        }),
        getBugs: builder.query({
            query: () => '/getReportBugs'
        }),
        getLogs: builder.query({
            query: () => '/logs'
        }),


    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useLoginUserMutation,
    useProfileQuery,
    useGetUsersQuery,
    useDeleteByIdMutation,
    useAddUsersMutation,
    useEditUserRoleMutation,
    useUploadFontMutation,
    useGetFontsDataQuery,
    useDeleteFontsByIdQuery,
    useVisitsQuery,
    useGetBugsQuery,
    useGetLogsQuery,

} = appApi