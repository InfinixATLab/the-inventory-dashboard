import type { ProductState, ProductAction } from "../../types/ProductTypes";

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case "PRODUCT_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "PRODUCT_FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "PRODUCT_FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error("Unknown action type");
  }
};
