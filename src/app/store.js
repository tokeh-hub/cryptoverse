import { configureStore } from "@reduxjs/toolkit";
import {cryptoApi} from '../components/cryptoApi'
import {cryptoNewsApi} from '../components/cryptoNewsApi'
export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer
        
    }
})