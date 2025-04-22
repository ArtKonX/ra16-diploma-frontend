import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import TopSalesSlice from "@redux/slices/TopSalesSlice";
import CatalogSlice from "@redux/slices/CatalogSlice";
import CatalogItemSlice from "@redux/slices/CatalogItemSlice";
import OrderDataSlice from "@redux/slices/OrderDataSlice";
import BasketSlice from "@redux/slices/BasketSlice";

const persistConfig = {
    key: 'basketData',
    storage,
};

const persistedOrderDataReducer =
    persistReducer(persistConfig, BasketSlice);

export const store = configureStore({
    reducer: {
        topSales: TopSalesSlice,
        catalog: CatalogSlice,
        catalogItem: CatalogItemSlice,
        orderData: OrderDataSlice,
        basketData: persistedOrderDataReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST'],
                    ignoredPaths: ['persist.register']
                }
            }
        )
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;