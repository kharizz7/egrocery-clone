import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchStocks = createAsyncThunk(
    'stocks/fetchStocks',
    async(category, {rejectWithValue}) =>{
        try{
            const res = await axios.get(`http://localhost:3000/api/grocery/${category}`);
            return res.data;

        }catch (err){
            return rejectWithValue(err.response?.data?.message || "Failed to fetch stocks");

        };
        
    }

);
const stocksSlice = createSlice({
    name:'stocks',
    initialState:{
        items:[],
        loading: false,
        error:null,
    },
    reducers:{
        clearStocks:(state)=> {
            state.items = [];
            state.loading = false;
            state.error = null;
        },   
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchStocks.pending, (state) =>{
            state.loading = true;
            state.error = null;

        })
        .addCase(fetchStocks.fulfilled, (state, action) =>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchStocks.rejected, (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export const { clearStocks } = stocksSlice.actions;
export default stocksSlice.reducer;