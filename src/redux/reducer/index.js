import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";
import updateProfile from "./user";
import user from "./user"
import laporanAktivitas from "./laporanAktivitas"

export default combineReducers({
  user,
  counter,
  auth,
  updateProfile,
  laporanAktivitas
});