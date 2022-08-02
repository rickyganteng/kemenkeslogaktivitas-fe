const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  dataOrder: [],
  dataUser: [],
  dataUserById: [],
  dataBookingById: [],
  dataWaitingById: [],
  dataLaporanById: []
};

const update = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "ORDER_HISTORY_PENDING":
      return {
        ...state,
        dataOrder: [],
      };
    case "ORDER_HISTORY_FULFILLED":
      return {
        ...state,
        dataOrder: action.payload.data.data,
      };
    case "ORDER_HISTORY_REJECTED":
      return {
        ...state,
        dataOrder: [],
      };
    case "GET_ALL_USER_TANPAFILL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_USER_TANPAFILL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataUser: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "GET_ALL_USER_TANPAFILL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataUser: []
      };
    case "GET_BY_ID_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_BY_ID_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataUserById: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "GET_BY_ID_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataUserById: []
      };
    case "ORDER_BOOKING_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ORDER_BOOKING_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataBookingById: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "ORDER_BOOKING_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataBookingById: []
      };
    case "ORDER_WAITING_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ORDER_WAITING_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataWaitingById: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "ORDER_WAITING_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataWaitingById: []
      };
    case "ORDER_LAPORAN_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ORDER_LAPORAN_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataLaporanById: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "ORDER_LAPORAN_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataLaporanById: []
      };
    case "POST_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "UPDATE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "DELETE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_USER_REJECTED":
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

export default update;