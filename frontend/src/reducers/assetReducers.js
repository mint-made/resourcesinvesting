import {
  ASSET_LIST_REQUEST,
  ASSET_LIST_SUCCESS,
  ASSET_LIST_FAIL,
  ASSET_DELETE_REQUEST,
  ASSET_DELETE_SUCCESS,
  ASSET_DELETE_FAIL,
  ASSET_CREATE_FAIL,
  ASSET_CREATE_SUCCESS,
  ASSET_CREATE_REQUEST,
  ASSET_CREATE_RESET,
} from '../constants/assetConstants';

export const assetListReducer = (state = { assets: [] }, action) => {
  switch (action.type) {
    case ASSET_LIST_REQUEST:
      return { loading: true, assets: [] };
    case ASSET_LIST_SUCCESS:
      return {
        loading: false,
        assets: action.payload,
      };
    case ASSET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assetDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_DELETE_REQUEST:
      return { loading: true };
    case ASSET_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ASSET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assetCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_CREATE_REQUEST:
      return { loading: true };
    case ASSET_CREATE_SUCCESS:
      return { loading: false, success: true, asset: action.payload };
    case ASSET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
