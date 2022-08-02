import axiosApiIntances from "../../utils/axios";

// export const getAllMovie = (page, limit, sortBy, search) => {
//   return {
//     type: "GET_ALL_MOVIE",
//     payload: axiosApiIntances.get(
//       `bookingruangan?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`
//     ),
//   };
// };
export const getlaporanRuanganAll = (page, limit, sortBy, search) => {
  return {
    type: "GET_LAPORANRUANGAN_ALL",
    payload: axiosApiIntances.get(`laporanruangan?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`),
  };
};
export const getlaporanRuanganAllTanpaFill = (search) => {
  return {
    type: "GET_ALL_TANPAFILL",
    payload: axiosApiIntances.get(`laporanruangan/tanpafill/q?keywords=${search}`),
  };
};
export const getlaporanRuanganTanggal = (searchtanggal, fromdate, todate) => {
  return {
    type: "GET_ALL_TANGAL",
    payload: axiosApiIntances.get(`laporanruangan/bytanggal/tanggal/tanggal?searchtanggal=${searchtanggal}&fromdate=${fromdate}&todate=${todate}`),
  };
};
export const postlaporanRuangan = (data) => {
  return {
    type: "POST_LAPORANRUANGAN",
    payload: axiosApiIntances.post("laporanruangan", data),
  };
};
// export const getPremiereLocation = () => {
//   return {
//     type: "PREMIERE_LOC",
//     payload: axiosApiIntances.get("premiere/location"),
//   };
// };

// export const deletePremiere = (id) => {
//   return {
//     type: "DELETE_PREMIERE",
//     payload: axiosApiIntances.delete(`premiere/main/${id}`),
//   };
// };