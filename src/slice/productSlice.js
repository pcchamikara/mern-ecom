import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCT_URL } from '../constants';
import { BACKEND_BASE } from '../constants/backendConstants';
const initialState = {
  products: [],
  product: {},
  topRatedProducts: [],
  status: '',
  mainSliderStatus: '',
  page: '',
  pages: '',
  error: null,
};

const requestHeader = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ keyword = '', pageNumber = 1 }, { rejectWithValue }) => {
    console.log('keyword', keyword);
    try {
      const response = await axios.get(
        `${BACKEND_BASE}/products?q=${keyword}&pageNumber=${pageNumber}`,
        initialState
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

/* delete product  */
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ productId, token, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE}/products/${productId}`,
        requestHeader(token)
      );
      toast.success(`Product ${productId} successfully deleted !`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
/* Edit product  */
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (
    { productId, token, toast, productData, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${BACKEND_BASE}/products/${productId}`,
        productData,
        requestHeader(token)
      );
      navigate('/admin/product-list');
      toast.success(`Product ${productId} successfully updated !`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
/* add product  */
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({ token, toast, productData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE}/products`,
        productData,
        requestHeader(token)
      );
      navigate('/admin/product-list');
      toast.success(`Product successfully updated !`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const fetchProductbyId = createAsyncThunk(
  'product/fetchProductbyId',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${PRODUCT_URL}${id}`,
        requestHeader(token)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE}/products/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const topRated = createAsyncThunk(
  'product/topRated',
  async (rejectWithValue) => {
    try {
      const response = await axios.get(`${BACKEND_BASE}/products/topRated`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const productReview = createAsyncThunk(
  'product/productReview',
  async ({ id, token, ratingData, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${PRODUCT_URL}${id}/review`,
        ratingData,
        requestHeader(token)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.status = 'scceeded';
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* update product */
    [deleteProduct.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [deleteProduct.fulfilled]: (state, action) => {
      const updatedProduct = state.products.filter(
        (product) => product._id !== action.meta.arg.productId
      );
      state.products = updatedProduct;
      state.status = 'scceeded';
    },
    [deleteProduct.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'faild';
    },
    /* edit product */
    [editProduct.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [editProduct.fulfilled]: (state, action) => {
      state.status = 'scceeded';
    },
    [editProduct.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'faild';
    },
    /* add product */
    [addProduct.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [addProduct.fulfilled]: (state, action) => {
      state.status = 'scceeded';
    },
    [addProduct.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'faild';
    },
    /* edit fetchProductbyId */
    [fetchProductbyId.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [fetchProductbyId.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = 'scceeded';
    },
    [fetchProductbyId.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'faild';
    },
    /* edit product review */
    [productReview.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [productReview.fulfilled]: (state, action) => {
      state.product = action.payload.updatedProduct;
      console.log(action.payload);
      state.status = 'scceeded';
    },
    [productReview.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'faild';
    },
    /* single product fetch */
    [fetchSingleProduct.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = 'scceeded';
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* top rated products fetch */
    [topRated.pending]: (state) => {
      state.mainSliderStatus = 'loading';
    },
    [topRated.fulfilled]: (state, action) => {
      state.topRatedProducts = action.payload;
      state.mainSliderStatus = 'scceeded';
    },
    [topRated.rejected]: (state, action) => {
      state.error = action.payload;
      state.mainSliderStatus = 'faild';
    },
  },
});

export default productSlice.reducer;
