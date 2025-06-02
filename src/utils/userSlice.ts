
import { createSlice } from '@reduxjs/toolkit';
import {Userstate } from '../types/stateTypes';

const initialState: Userstate | null | {} =  {
    userDetails: null,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
         setUserData: (state,action:{payload:Userstate}) => {
            return {...action.payload};
         },
         setUserLocationInfo: (state,action:{payload:{lat:string,long:string}})=> {
            return {...state,lat:action.payload.lat,long:action.payload.long};
         }
    }
})

export const {setUserData} = userSlice.actions;
export default userSlice.reducer; 