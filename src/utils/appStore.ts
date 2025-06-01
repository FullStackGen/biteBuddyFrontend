import { configureStore } from "@reduxjs/toolkit"
import ordersReducer from "./ordersSlice"
import userReducer from "./userSlice"


const appStore = configureStore({
    reducer: {
        orders: ordersReducer,
        users: userReducer
    }
})

export default appStore