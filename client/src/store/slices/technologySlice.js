import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TechnologyService from '../../services/TechnologyService';
import { API_URL } from '../../http';
import axios from 'axios'

export const getDirections = createAsyncThunk('technology/getDirections', async () => {
    const response = await TechnologyService.getDirections();

    return response;
});

export const getStacks = createAsyncThunk('technology/getStacks', async (id_direction) => {
    console.log('2222222222222')
    const response = await TechnologyService.getStacks(id_direction);
    console.log('1000000000000000')
    return response;
});


const technologySlice = createSlice({
    name: 'technology', 
    initialState: {
        direction: [],
        stack: []
    },
    reducers: {
        setDirection(state, action) {
            state.direction = action.payload; 
        },
        setStack(state, action){
            state.stack = action.payload;
        }
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getDirections.fulfilled, (state, action) => {
                state.direction = action.payload;
            })
            .addCase(getStacks.fulfilled, (state, action) => {
                state.stack = action.payload;
            })
    },
});

export const { setDirection, setStack } = technologySlice.actions;

export default technologySlice.reducer;