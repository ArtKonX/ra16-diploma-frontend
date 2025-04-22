import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import apiRequests from "@api/apiRequests";
import VITE_BACKEND_URL from "@src/environment/environment";

interface InitialState {
    loading: boolean,
    url: string,
    success: boolean,
    error: string,
}

interface Item {
    id: number,
    price: number,
    count: number
}

interface OrderData {
    owner: {
        phone: string,
        address: string,
    },
    items: Item[]
}

const initialState = {
    loading: false,
    url: VITE_BACKEND_URL,
    success: false,
    error: '',
} as InitialState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const OrderDataSlice = createSliceWithThunk({
    name: "orderData",
    initialState,
    selectors: {
        orderData: (state) => state,
    },
    reducers: (create) => ({
        resetSuccess: create.reducer((state) => {
            state.success = false;
        }),
        resetError: create.reducer((state) => {
            state.error = '';
        }),
        fetchOrder: create.asyncThunk(
            async (action: { data: OrderData }, { rejectWithValue, getState }) => {

                const state = getState() as { orderData: { url: string } }

                const { url } = state.orderData;

                try {
                    const response = await apiRequests({
                        type: 'fetchOrder',
                        payload: { url, data: action.data },
                    });

                    return response;
                } catch (error) {
                    return rejectWithValue(error.message || 'Неизвестная ошибка');
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state) => {
                    state.success = true;
                    state.loading = false;
                    state.error = "";
                },
                rejected: (state, action) => {
                    console.log(111, action.payload)
                    state.error = action.payload as string;
                    state.loading = false;
                },
                settled: (state) => {
                    state.loading = false;
                },
            }
        ),
    }),
});

export default OrderDataSlice.reducer;

export const { resetSuccess, resetError, fetchOrder } = OrderDataSlice.actions;