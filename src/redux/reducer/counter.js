// intial state untuk menyimpan data di dalam store berdasarkan fitur/reducernya
const initialState = {
  count: 0,
};

// proses reduser yang dijalankan setelah proses
// action berdasarkan tipe yang dikirmkan oleh action
const counter = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE": {
      return {
        ...initialState,
        count: state.count + 1,
      };
    }
    case "DECREASE": {
      return {
        ...initialState,
        count: state.count - 1,
      };
    }
    case "RESET": {
      return {
        ...initialState,
        count: 0,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default counter;