import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface BasketDataItem {
    id: number,
    title: string,
    price: number,
    count: number,
    size: string,
    allPrice: number
}

interface AddInBasketPayloadAction {
    basketData: BasketDataItem
}

interface RemoveInBasketPayloadAction {
    id: number
}

interface InitialState {
    basketData: BasketDataItem[],
    quantityProducts: number,
    allPrice: number,
}

const initialState = {
    basketData: [],
    quantityProducts: 0,
    allPrice: 0,
} as InitialState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const BasketSlice = createSliceWithThunk({
    name: "basketData",
    initialState,
    selectors: {
        basketData: (state) => state,
    },
    reducers: (create) => ({
        addInBasket: create.reducer((state, action: PayloadAction<AddInBasketPayloadAction>) => {

            const { size, title, count, allPrice } = action.payload.basketData;

            const findItemIndex = state.basketData.findIndex(item => ((item.title == title) && (item.size == size)))

            if (findItemIndex !== -1) {
                const itemCount = state.basketData[findItemIndex].count + count;
                const itemAllPrice = state.basketData[findItemIndex].allPrice + allPrice;

                state.basketData[findItemIndex] = {
                    ...action.payload.basketData,
                    count: itemCount,
                    allPrice: itemAllPrice
                }

            } else {
                state.basketData.push(action.payload.basketData);
            }

            state.quantityProducts += count;
            state.allPrice += allPrice;
        }),
        removeInBasket: create.reducer((state, action: PayloadAction<RemoveInBasketPayloadAction>) => {

            const { id } = action.payload;

            const removedItem = state.basketData.find((_, indx) => indx === id);

            if (removedItem) {

                state.quantityProducts -= removedItem.count;
                state.allPrice -= removedItem.allPrice;

                state.basketData = state.basketData.filter(item => item.id !== removedItem.id)
            }
        }),
        resetBasket: create.reducer((state) => {
            state.basketData = [];
            state.quantityProducts = 0;
            state.allPrice = 0;
        })
    }),
});

export default BasketSlice.reducer;

const persistConfig = {
    key: 'basketData',
    storage,
    whitelist: ['basketData', 'quantityProducts', 'allPrice'],
};

const persistedReducer = persistReducer(persistConfig, BasketSlice.reducer);

export const { addInBasket, removeInBasket, resetBasket } = BasketSlice.actions;
export const reducer = persistedReducer;