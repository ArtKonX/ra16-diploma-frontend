import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction
} from "@reduxjs/toolkit";

import apiRequests from "@api/apiRequests";
import VITE_BACKEND_URL from "@src/environment/environment";

interface Categorie {
    id: number,
    title: string,
    to: string
}

interface CategoriesItem {
    id: number,
    title: string,
    images: string[],
    price: number
}

interface InitialState {
    categories: Categorie[],
    categoriesItems: CategoriesItem[],
    nextLenItemsOffset: number,
    loading: boolean,
    url: string,
    error: string,
    render: boolean,
    searchText: string
}

interface AddSearchTextPayloadAction {
    searchText: string
}

const initialState = {
    categories: [],
    categoriesItems: [],
    nextLenItemsOffset: 6,
    loading: false,
    url: VITE_BACKEND_URL,
    error: '',
    render: false,
    searchText: ''
} as InitialState

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const CatalogSlice = createSliceWithThunk({
    name: "catalog",
    initialState,
    selectors: {
        topSalesState: (state) => state
    },
    reducers: (create) => ({
        addSearchText: create.reducer((state, action: PayloadAction<AddSearchTextPayloadAction>) => {
            state.searchText = action.payload.searchText;
        }),
        removeSearchText: create.reducer((state) => {
            state.searchText = '';
        }),
        resetItems: create.reducer((state) => {
            state.categoriesItems = [];
        }),
        resetNextLenItemsOffset: create.reducer((state) => {
            state.nextLenItemsOffset = 6;
        }),
        changeRender: create.reducer((state) => {
            state.render = !state.render;
        }),
        fetchNextLenItemsOffset: create.asyncThunk(
            async (action: { params: string; }, { getState, rejectWithValue }) => {
                try {
                    const state = getState() as { catalog: { url: string } }

                    const { url } = state.catalog;

                    const params = action.params || '';

                    const response = await apiRequests({
                        type: 'fetchCategoriesItems',
                        payload: {
                            url,
                            params
                        }
                    });

                    return [response.data, url];
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

                    state.url = action.payload[1];

                    state.nextLenItemsOffset = action.payload[0].length;

                    state.loading = false;
                    state.error = "";
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                    state.loading = false;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        fetchCategories: create.asyncThunk(
            async (_, { getState, rejectWithValue }) => {
                try {
                    const state = getState() as { catalog: { url: string } }

                    const { url } = state.catalog;

                    const response = await apiRequests({
                        type: 'fetchCategories',
                        payload: {
                            url
                        }
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
                    state.categories = action.payload;
                    state.error = "";
                    state.loading = false;
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                    state.loading = false;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        fetchCatalogCategoriesItems: create.asyncThunk(
            async (action: { params: string; }, { getState, rejectWithValue }) => {
                try {
                    const state = getState() as { catalog: { url: string } }

                    const { url } = state.catalog;

                    const params = action.params || '';

                    const response = await apiRequests({
                        type: 'fetchCategoriesItems',
                        payload: {
                            url,
                            params
                        }
                    });

                    return [response.data, url];
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

                    state.url = action.payload[1];
                    state.render = !state.render;

                    state.categoriesItems.push(...action.payload[0])

                    const uniqueItems = [...new Set(state.categoriesItems.map(item => item.id))]
                        .map(id => {
                            return state.categoriesItems.find(item => item.id === id);
                        });

                    state.categoriesItems = uniqueItems;

                    state.error = "";
                    state.loading = false;
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                    state.loading = false;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        fetchCatalogCategoriesItemsSearch: create.asyncThunk(
            async (_, { getState, rejectWithValue }) => {
                try {
                    const state = getState() as { catalog: { url: string, searchText: string } }

                    const { url } = state.catalog;

                    const searchText = state.catalog.searchText || '';

                    const response = await apiRequests({
                        type: 'fetchCategoriesItemsSearch',
                        payload: {
                            url,
                            searchText
                        }
                    });

                    return [response.data, url];
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

                    state.url = action.payload[1];
                    state.render = !state.render;

                    state.categoriesItems = []

                    state.categoriesItems = action.payload[0]

                    state.error = "";
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
    })
});

export const { fetchNextLenItemsOffset, resetNextLenItemsOffset, removeSearchText, addSearchText, changeRender, resetItems, fetchCategories, fetchCatalogCategoriesItems, fetchCatalogCategoriesItemsSearch } = CatalogSlice.actions;
export default CatalogSlice.reducer;