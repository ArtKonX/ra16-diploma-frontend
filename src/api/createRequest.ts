import axios from 'axios';

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

interface ApiCreateRequest {
  url: string;
  method: string;
  body?: OrderData;
}

const createRequest = async (options: ApiCreateRequest) => {
  try {
    const config = {
      method: options.method,
      url: options.url,
      headers: { "Content-Type": "application/json" },
      data: options.body && options.body
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Произошла неизвестная ошибка");
    }
  }
};

export default createRequest;