import axiosInstance from './axios';

export const registerSale = async (body, token) => {
  try {
    const request = await axiosInstance.post('/sales', body, {
      headers: { Authorization: token },
    });

    return request;
  } catch (err) {
    return { error: err.response };
  }
};

export const getAllSales = async (token) => {
  try {
    const request = await axiosInstance.get('/sales', {
      headers: { Authorization: token },
    });

    return request.data;
  } catch (err) {
    return { error: err };
  }
};
export const getOrdersByUserId = async (userId, token) => {
  try {
    const request = await axiosInstance.get(`/sales/${userId}`, {
      headers: { Authorization: token },
    });

    return request;
  } catch (err) {
    return { error: err.response };
  }
};

export const getOrdersBySellerId = async (sellerId, token) => {
  try {
    const request = await axiosInstance.get(`/sales/seller/${sellerId}`, {
      headers: { Authorization: token },
    });

    return request;
  } catch (err) {
    return { error: err.response };
  }
};

export const getOrderByID = async (id, token) => {
  try {
    const request = await axiosInstance.get(`/sales/order/${id}`, {
      headers: { Authorization: token },
    });

    return request.data;
  } catch (err) {
    return { error: err.response };
  }
};

export const updateStatusOrderById = async (body, id, token) => {
  try {
    await axiosInstance.patch(`/sales/updateStatus/${id}`, body, {
      headers: { Authorization: token },
    });
  } catch (err) {
    return { error: err.response };
  }
};

export const getAllProducts = async () => {
  try {
    const request = await axiosInstance.get('/products', {
    });

    return request.data;
  } catch (err) {
    return { error: err.response };
  }
};

export const getproductListBySaleId = async (saleId, token) => {
  try {
    const request = await axiosInstance.get(`/products/${saleId}`, {
      headers: { Authorization: token },
    });

    const allProducts = await getAllProducts();

    const requestCopy = request.data.slice();

    const allProductsCopy = allProducts.slice();

    const productListWithSaleId = requestCopy.map((productWithSaleId) => {
      const productFinded = allProductsCopy
        .find((product) => productWithSaleId.product_id === product.id);
      const mappedList = {
        ...productWithSaleId,
        name: productFinded.name,
        productId: productFinded.id,
        quantity: productWithSaleId.quantity,
        subTotal: (Number(productWithSaleId.quantity) * Number(productFinded.price)),
        unitPrice: productFinded.price,
      };
      return mappedList;
    });

    return productListWithSaleId;
  } catch (err) {
    return { err };
  }
};

export const t = () => t;
