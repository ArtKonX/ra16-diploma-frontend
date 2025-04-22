import { RootState } from "@src/redux/store";
import { createSelector } from 'reselect';

export const selectTopSales = createSelector(
    (state: RootState) => state.topSales,
    (topSales) => topSales
);

export const selectCatalog = createSelector(
    (state: RootState) => state.catalog,
    (catalog) => catalog
);

export const selectCatalogItem = createSelector(
    (state: RootState) => state.catalogItem,
    (catalogItem) => catalogItem
);

export const selectOrderData = createSelector(
    (state: RootState) => state.orderData,
    (orderData) => orderData
);

export const selectBasketData = createSelector(
    (state: RootState) => state.basketData,
    (basketData) => basketData
);