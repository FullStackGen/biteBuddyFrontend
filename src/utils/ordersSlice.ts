import { createSlice } from "@reduxjs/toolkit";
import { OrderItem,OrdersState } from "../types/stateTypes";


const initialState: OrdersState = {
    items: [],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addItem: (state, action: { payload: OrderItem }) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: { payload: string }) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items.length = 0;
        }
    }
})

export const { addItem, removeItem, clearCart } = ordersSlice.actions;
export default ordersSlice.reducer;


//reducer function
// (state,action) => {
            
//         }

//action
//addItem