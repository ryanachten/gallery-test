import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import product, {
  getInitialState,
  productActions,
  productTypes
} from "./product";
import { API_URL } from "../constants/API";
import { Product, Size } from "../constants/interfaces";

const mockStore = configureMockStore([thunk]);
const productTemplate: Product = {
  index: 0,
  isSale: true,
  isExclusive: false,
  price: "$18.88",
  productImage: "product-1.jpg",
  productName: "Striped shirt",
  size: [Size.XS, Size.S, Size.L, Size.XL]
};

describe("Reducer: product", () => {
  it("should dispatch action GET_PRODUCTS_REQUEST and GET_PRODUCTS_RESPONSE when retrieving products", async () => {
    const store = mockStore(getInitialState());
    const products = [
      { ...productTemplate, index: "1" },
      { ...productTemplate, index: "2" },
      { ...productTemplate, index: "3" }
    ];
    Axios.get = jest.fn().mockImplementation(async () => {
      return { data: products };
    });
    const expectedActions = [
      { type: productTypes.GET_PRODUCTS_REQUEST },
      {
        type: productTypes.GET_PRODUCTS_RESPONSE,
        payload: products,
        error: false
      }
    ];
    await store.dispatch(productActions.getProducts());
    expect(Axios.get).toHaveBeenCalledWith(API_URL);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should handle GET_PRODUCTS_RESPONSE with successful response", () => {
    const products = [
      { ...productTemplate, index: "1" },
      { ...productTemplate, index: "2" },
      { ...productTemplate, index: "3" }
    ];
    const action = {
      type: productTypes.GET_PRODUCTS_RESPONSE,
      payload: products
    };
    expect(product(getInitialState(), action)).toEqual({
      ...getInitialState(),
      products,
      error: null,
      loading: false
    });
  });

  it("should handle GET_PRODUCTS_RESPONSE with error response", () => {
    const error = {
      code: "ErrorCode",
      message: "ErrorMessage"
    };
    const action = {
      type: productTypes.GET_PRODUCTS_RESPONSE,
      error: true,
      payload: error
    };
    expect(product(getInitialState(), action)).toEqual({
      ...getInitialState(),
      error,
      loading: false
    });
  });
});
