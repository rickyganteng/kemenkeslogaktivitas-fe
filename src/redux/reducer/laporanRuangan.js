const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  laporanruangann: [],
  laporantanggal: [],
  pag: []
};

const laporanruangan = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LAPORANRUANGAN_ALL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_LAPORANRUANGAN_ALL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        laporann: action.payload.data.data,
        pag: action.payload.data.pagination
      };
    case "GET_LAPORANRUANGAN_ALL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        laporann: []
      };
    case "GET_ALL_TANPAFILL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_TANPAFILL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        laporanruangann: action.payload.data.data,
        pag: action.payload.data.pagination
      };
    case "GET_ALL_TANPAFILL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        laporanruangann: []
      };
    case "GET_ALL_TANGAL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_TANGAL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        laporantanggal: action.payload.data.data,
        pag: action.payload.data.pagination
      };
    case "GET_ALL_TANGAL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        laporantanggal: []
      };
    case "POST_LAPORANRUANGAN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_LAPORANRUANGAN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_LAPORANRUANGAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    default:
      return state;
  }
};

export default laporanruangan;