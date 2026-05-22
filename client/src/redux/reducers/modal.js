const modalReducer = (state = { modal: false }, action) => {
  switch (action.type) {
    case "MODAL":
      return {
        ...state,
        modal: action.payload,
      };

    default:
      // 🔥 DÜZELTME: default yapısı switch bloklarının en altına, standarda uygun şekilde çekildi
      return state;
  }
};

export default modalReducer;
