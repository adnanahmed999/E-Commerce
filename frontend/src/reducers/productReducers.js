const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = require("../constants/productConstants");

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  console.log("i am here");
  console.log("current state in product reducer ", state);
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  console.log("ENTERED REDUCERS");
  console.log(state)
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      console.log("product detail request in reducer");
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      console.log("getting data from reducer");
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
