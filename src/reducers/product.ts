import Axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_URL } from "../constants/API";
import { Action, Product } from "../constants/interfaces";

interface State {
  products: Product[];
  error: Error | null;
  loading: boolean;
}

export function getInitialState(): State {
  return {
    products: [],
    loading: false,
    error: null
  };
}

export const productTypes = {
  GET_PRODUCTS_REQUEST: "GET_PRODUCTS_REQUEST",
  GET_PRODUCTS_RESPONSE: "GET_PRODUCTS_RESPONSE"
};

export const productActions: any = {
  getProducts: () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: productTypes.GET_PRODUCTS_REQUEST });
    try {
      const { data } = await Axios.get(API_URL);
      dispatch({
        type: productTypes.GET_PRODUCTS_RESPONSE,
        payload: data,
        error: false
      });
    } catch (e) {
      dispatch({
        type: productTypes.GET_PRODUCTS_RESPONSE,
        payload: e,
        error: true
      });
      return e;
    }
  }
};

export default function product(state = getInitialState(), action: Action) {
  const { type, payload, error } = action;
  switch (type) {
    case productTypes.GET_PRODUCTS_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case productTypes.GET_PRODUCTS_RESPONSE: {
      if (error) {
        return {
          ...state,
          loading: false,
          error: payload,
          products: state.products
        };
      }
      return { ...state, loading: false, error: null, products: payload };
    }
  }
  return state;
}
