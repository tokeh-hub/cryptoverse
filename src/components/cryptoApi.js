import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '437e1e6990msha3f6ebee6ce3bdep190dc4jsn0d4e99b367c8'
}

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

const baseUrl = 'https://coinranking1.p.rapidapi.com'

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints:(builder) =>({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinID) => createRequest(`/coin/${coinID}`)
        }),
        getCryptoHistory: builder.query({
            query: (coinID, timePeriod) => createRequest(`/coin/${coinID}/history?timeperiod=${timePeriod}`)
        })
    })
})

export const {
    useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery
} = cryptoApi;