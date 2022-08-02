export const increaseCounter = () => {
  return {
    // type = penamaan fitur
    // payload = untuk menjalankan proses axios
    type: "INCREASE", // type juga digunakan untuk proses didalam reducer
  };
};

export const decreaseCounter = () => {
  return {
    type: "DECREASE",
  };
};

export const resetCounter = () => {
  return {
    type: "RESET",
  };
};
