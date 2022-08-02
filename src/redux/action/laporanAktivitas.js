import axiosApiIntances from "../../utils/axios";


export const getAllLaporanAktivitas = (page, limit, sortBy, sortCol, search) => {
  return {
    type: "GET_ALL_LAPORAN_AKTIVITAS",
    payload: axiosApiIntances.get(`laporanaktivitas?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}&sortCol=${sortCol}`),
  };
};

export const getAllLaporanToday = () => {
  return {
    type: "GET_ALL_LAPORAN_TODAY",
    payload: axiosApiIntances.get("laporanaktivitas/getlaporantoday"),
  };
};

export const getByIdLaporanAktivitas = (id) => {
  return {
    type: "GET_BY_ID_LAPORAN_AKTIVITAS",
    payload: axiosApiIntances.get(`laporanaktivitas/${id}`),
  };
};

export const getLaporanAktivitasByIdUser = (id) => {
  return {
    type: "GET_LAPORAN_AKTIVITAS_BY_ID_USER",
    payload: axiosApiIntances.get(`laporanaktivitas/laporan/${id}`),
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

