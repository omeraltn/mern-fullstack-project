const authReducer = (state = { auth: null }, action) => {
  switch (action.type) {
    case "REGISTER":
      // 🔥 DÜZELTME: action.payload kullanıldı
      localStorage.setItem("auth", JSON.stringify({ ...action.payload }));
      return {
        ...state,
        auth: action.payload,
      };

    case "LOGIN":
      // 🔥 DÜZELTME: action.data yerine aksiyondan gelen doğru isim yani action.payload yazıldı!
      localStorage.setItem("auth", JSON.stringify({ ...action.payload }));
      return {
        ...state,
        auth: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("auth");
      return {
        ...state,
        auth: null,
      };

    default:
      // 🔥 DÜZELTME: default yapısı switch bloklarının en altına, standarda uygun şekilde çekildi
      return state;
  }
};

export default authReducer;
