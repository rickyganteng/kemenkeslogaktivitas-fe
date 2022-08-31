const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  pagination: {},
  paginationLaporanToday: {},
  paginationByUserId: {},
  dataLaporanAll: [],
  dataLaporanToday: [],
  dataLaporanById: [],
  dataLaporanByIdUser: []
};

const update = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_LAPORAN_AKTIVITAS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_LAPORAN_AKTIVITAS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataLaporanAll: action.payload.data.data,
        pagination: action.payload.data.pagination
        // pag: action.payload.data.pagination
      };
    case "GET_ALL_LAPORAN_AKTIVITAS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataLaporanAll: [],
        pagination: {}
      };
    case "GET_BY_ID_LAPORAN_AKTIVITAS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_BY_ID_LAPORAN_AKTIVITAS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataLaporanById: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "GET_BY_ID_LAPORAN_AKTIVITAS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataLaporanById: []
      };
    case "GET_LAPORAN_AKTIVITAS_BY_ID_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_LAPORAN_AKTIVITAS_BY_ID_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataLaporanByIdUser: action.payload.data.data,
        paginationByUserId: action.payload.data.pagination
        // pag: action.payload.data.pagination
      };
    case "GET_LAPORAN_AKTIVITAS_BY_ID_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataLaporanByIdUser: [],
        paginationByUserId: {}
      };
    case "GET_ALL_LAPORAN_TODAY_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_LAPORAN_TODAY_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataLaporanToday: action.payload.data.data,
        paginationLaporanToday: action.payload.data.pagination

        // pag: action.payload.data.pagination
      };
    case "GET_ALL_LAPORAN_TODAY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataLaporanToday: [],
        paginationLaporanToday: {}
      };
    case "POST_LAPORAN_AKTIVITAS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_LAPORAN_AKTIVITAS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_LAPORAN_AKTIVITAS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "UPDATE_LAPORAN_AKTIVITAS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_LAPORAN_AKTIVITAS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_LAPORAN_AKTIVITAS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    case "DELETE_LAPORAN_AKTIVITAS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_LAPORAN_AKTIVITAS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_LAPORAN_AKTIVITAS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "DELETE_LAPORAN_AKTIVITAS_ALL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_LAPORAN_AKTIVITAS_ALL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_LAPORAN_AKTIVITAS_ALL_REJECTED":
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