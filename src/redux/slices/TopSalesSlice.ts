import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import apiRequests from "@api/apiRequests";
import VITE_BACKEND_URL from "@src/environment/environment";

interface TopSalesElem {
    id: number,
    title: string,
    images: string[],
    price: number
}

interface InitialState {
    topSalesList: TopSalesElem[],
    loading: boolean,
    url: string,
    error: string
}

const initialState = {
    topSalesList: [],
    loading: false,
    url: VITE_BACKEND_URL,
    error: '',
} as InitialState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const TopSalesSlice = createSliceWithThunk({
    name: "topSales",
    initialState,
    selectors: {
        topSalesState: (state) => state,
    },
    reducers: (create) => ({
        fetchTopSale: create.asyncThunk(
            async (_, { rejectWithValue, getState }) => {

                const state = getState() as { topSales: { url: string } }

                const { url } = state.topSales;

                try {
                    const response = await apiRequests({
                        type: 'fetchTopSale',
                        payload: { url },
                    });
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.message || 'Неизвестная ошибка');
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state, action) => {
                    state.topSalesList = action.payload;
                    state.error = "";
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                },
                settled: (state) => {
                    state.loading = false;
                },
            }
        ),
    }),
});

export const { fetchTopSale } = TopSalesSlice.actions;
export default TopSalesSlice.reducer;