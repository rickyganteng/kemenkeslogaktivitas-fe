import axiosApiIntances from "../../utils/axios";


export const getAllLaporanAktivitas = (page, limit, sortBy, sortCol, search, FromDate, ToDate) => {
  console.log('testttttt', FromDate);
  return {
    type: "GET_ALL_LAPORAN_AKTIVITAS",
    payload: axiosApiIntances.get(`laporanaktivitas?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}&sortCol=${sortCol}&fromdate=${FromDate}&todate=${ToDate}`),
  };
};

export const getAllLaporanToday = (page, limit, sortBy, sortCol, search) => {
  return {
    type: "GET_ALL_LAPORAN_TODAY",
    payload: axiosApiIntances.get(`laporanaktivitas/getlaporantoday?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}&sortCol=${sortCol}`),
  };
};

export const getByIdLaporanAktivitas = (id) => {
  return {
    type: "GET_BY_ID_LAPORAN_AKTIVITAS",
    payload: axiosApiIntances.get(`laporanaktivitas/${id}`),
  };
};

export const getLaporanAktivitasByIdUser = (page, limit, id) => {
  console.log('page', page);
  console.log('limit', limit);
  console.log('id', id);
  return {
    type: "GET_LAPORAN_AKTIVITAS_BY_ID_USER",
    payload: axiosApiIntances.get(`laporanaktivitas/laporan/${id}?page=${page}&limit=${limit}`),
  };
};

export const postLaporanAktivitas = (data) => {
  return {
    type: "POST_LAPORAN_AKTIVITAS",
    payload: axiosApiIntances.post("laporanaktivitas", data),
  };
};

export const updateLaporanAktivitas = (id, data) => {
  return {
    type: "UPDATE_LAPORAN_AKTIVITAS",
    payload: axiosApiIntances.patch(`laporanaktivitas/${id}`, data),
  };
};

export const deleteLaporanAktivitas = (id) => {
  return {
    type: "DELETE_LAPORAN_AKTIVITAS",
    payload: axiosApiIntances.delete(`laporanaktivitas/${id}`),
  };
};

