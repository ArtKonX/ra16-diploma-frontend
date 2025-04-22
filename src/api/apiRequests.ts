import createRequest from "./createRequest";

interface ApiRequests {
    payload: {
        id?: string,
        search?: string,
        url?: string,
        params?: string
        searchText?: string,
        data?: OrderData
    },
    type: string
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

const apiRequests = (action: ApiRequests) => {
    const { payload, type } = action;
    if (payload) {
        switch (type) {
            case 'fetchTopSale':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}/api/top-sales`
                });
            case 'fetchCategories':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}/api/categories`
                });
            case 'fetchCategoriesItems':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}/api/items${payload.params}`
                });
            case 'fetchCategoriesItemsSearch':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}/api/items?q=${payload.searchText}`
                });
            case 'fetchCatalogItem':
                return createRequest({
                    method: "GET",
                    url: `${payload.url}/api/items/${payload.id}`
                });
            case 'fetchOrder':
                return createRequest({
                    method: "POST",
                    url: `${payload.url}/api/order`,
                    body: payload.data
                });
            default:
                throw new Error(`Нераспознанный тип действия: ${type}`);
        }
    }
};

export default apiRequests;