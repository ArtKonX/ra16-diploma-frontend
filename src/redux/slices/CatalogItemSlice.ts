import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import apiRequests from "@api/apiRequests";
import VITE_BACKEND_URL from "@src/environment/environment";

interface Size {
    size: string,
    available: boolean
}

interface CatalogItem {
    id: number,
    title: string,
    images: string[],
    price: number,
    sku: string,
    manufacturer: string,
    color: string,
    material: string,
    season: string,
    reason: string,
    sizes: Size[],
}

interface InitialState {
    catalogItem: CatalogItem | [],
    loading: boolean,
    url: string,
    error: string
}

const initialState = {
    catalogItem: [],
    loading: false,
    url: VITE_BACKEND_URL,
    error: '',
} as InitialState

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const CatalogItemSlice = createSliceWithThunk({
    name: "catalogItem",
    initialState,
    selectors: {
        catalogItemState: (state) => state,
    },
    reducers: (create) => ({
        fetchCatalogItem: create.asyncThunk(
            async (action: { id: string; }, { rejectWithValue, getState }) => {

                const state = getState() as { catalogItem: { url: string } }

                const { url } = state.catalogItem;
                const { id } = action;

                try {
                    const response = await apiRequests({
                        type: 'fetchCatalogItem',
                        payload: { url, id },
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
                    state.catalogItem = action.payload;
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

export const { fetchCatalogItem } = CatalogItemSlice.actions;
export default CatalogItemSlice.reducer;