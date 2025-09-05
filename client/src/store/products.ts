import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../models/Product";
import { apiCallBegin } from "./api";
import { getPriceSearchParams, getQuerySearchParam } from "../utils/helper";
// import moment from "moment";
import { type Dispatch } from "redux";
import type { RootState } from "./configureStore";
import { createSelector } from "@reduxjs/toolkit";

export type InitialStateType = {
  // list: Product[];
  list: Record<string, Product>;
  loading: boolean;
  error: null | string;
  totalProducts: number;
  pageNo: number;
  perPage: number;
  lastFetch: string; // Modified type
};

// function getPageNo() {
//   return Number(
//     new URLSearchParams(document.location.search).getAll("page") || 1
//   );
//}

const initialState: InitialStateType = {
  // list: [],
  list: {},
  loading: false,
  error: null,
  totalProducts: 0,
  pageNo: 1,
  perPage: 2,
  lastFetch: "", //store pageNo in url
  // pageNo: getPageNo() || 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // type --> "products/productsResolved"
    productsRequested(state) {
      state.loading = true;
      state.error = null;
    },
    resetPageNo(state) {
      state.pageNo = 1;
    },
    productsResolved(state, action) {
      // state.list = action.payload.products;
      state.list = {};
      action.payload.products.forEach(
        (prod: Product) => (state.list[prod._id] = prod)
      );
      state.lastFetch = new Date().toISOString();
      state.pageNo = state.pageNo + 1; //reset page no
      state.error = null;
      state.loading = false;
      state.totalProducts = action.payload.totalItems;
    },
    productAddSingle(state, action) {
      const { product } = action.payload;
      state.list[product._id] = product;
      state.error = null;
      state.loading = false;
    },
    productsAddMoreResolved(state, action) {
      const productsList: Record<string, Product> = {};
      action.payload.products.forEach(
        (prod: Product) => (productsList[prod._id] = prod)
      );
      state.list = { ...state.list, ...productsList };
      // state.list = [...state.list, ...action.payload.products];
      state.lastFetch = new Date().toISOString();
      state.pageNo = state.pageNo + 1; //new  sequential page no
      state.error = null;
      state.loading = false;
    },
    productsRequestedFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const {
  productsResolved,
  productsRequested,
  productsRequestedFailed,
  productsAddMoreResolved,
  resetPageNo,
  productAddSingle,
} = productSlice.actions;
export default productSlice.reducer;

// const url = "/products";
const url = "/products";

// if  using  directly in compoenent
// dispatch(
//   apiCallBegin({
//     url: "/data",
//     onSuccess: productsResolved.type,
//   })
// );

// if  resuable

// let pageNo = 1;
//important --> here page no is not stored in url
// export const loadProducts = ({ newRequest = true }) => {
//   const query = getQuerySearchParam();

//   pageNo = newRequest === true ? 1 : ++pageNo; //reset page no

//   const sizes = getPriceSearchParams();

//   return {
//     type: apiCallBegin.type,
//     payload: {
//       url: url + "/filter",
//       data: {
//         pageNo,
//         pageSize: 2,
//         ...(query ? { query: query } : {}),
//         ...(sizes ? { sizes } : {}),
//       },
//       method: "post",
//       onStart: productsRequested.type,
//       onSuccess:
//         newRequest === true
//           ? productsResolved.type
//           : productsAddMoreResolved.type,
//       onError: productsRequestedFailed.type,
//     },
//   };
// };

export const fetchProduct =
  (id: string) => (dispatch: Dispatch, getState: () => RootState) => {
    //last fetch single product whill have store last fetch time in each product

    if (!getState().products.list[id])
      return dispatch({
        type: apiCallBegin.type,
        payload: {
          url: url + "/" + id,
          method: "get",
          onStart: productsRequested.type,
          onSuccess: productAddSingle.type,
          onError: productsRequestedFailed.type,
        },
      });
  };

export const loadProducts =
  ({ newRequest }: { newRequest: boolean }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    // //dont use as page has filters
    // //prevent refetch/caching
    // const { lastFetch } = getState().products;
    // //since pagination caching only not newRequest caching
    // const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    // // console.log("diffInMinutes", diffInMinutes, diffInMinutes < 1);

    // if (newRequest && diffInMinutes < 1) return; //if diff in munites is 5 minutes allow new fetch
    // console.log("runs new fetch");

    //reset page no
    if (newRequest) {
      dispatch({ type: resetPageNo.type });
    }

    const query = getQuerySearchParam();
    const sizes = getPriceSearchParams();
    const _pageNo = getState().products.pageNo || 1; //take page no after reset action
    // const pageSize = 2;

    return dispatch({
      type: apiCallBegin.type,
      payload: {
        url: url + "/filter",
        data: {
          pageNo: _pageNo,
          pageSize: getState().products.perPage,
          ...(query ? { query: query } : {}),
          ...(sizes ? { sizes } : {}),
        },
        method: "post",
        onStart: productsRequested.type,
        onSuccess:
          newRequest === true
            ? productsResolved.type
            : productsAddMoreResolved.type,
        onError: productsRequestedFailed.type,
      },
    });
  };

//selectors
// export const getProducts = (state: RootState): Product[] => {
//   return Object.values(state.products.list);
// };
export const getProducts = createSelector(
  (state: RootState) => state.products.list,
  (productsDict) => Object.values(productsDict)
);

export const getProduct = (
  state: RootState,
  productId: string | undefined
): Product | null => {
  if (!productId) return null;
  return state.products.list[productId];
};
