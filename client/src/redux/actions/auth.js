import axios from "axios";
import { toast } from "react-toastify";

export const registerAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5001/register",
      authData,
    );

    // 1. Önce LocalStorage'a yazıyoruz
    localStorage.setItem("auth", JSON.stringify(data));

    // 2. Redux Store'u güncelliyoruz
    dispatch({ type: "REGISTER", payload: data });

    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  } catch (error) {
    const msg = error.response?.data?.message || "Bir hata oluştu!";
    toast.error(msg, { position: "top-right", autoClose: 2000 });
  }
};

export const loginAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5001/login", authData);

    // 1. Önce LocalStorage'a yazıyoruz
    localStorage.setItem("auth", JSON.stringify(data));

    // 2. Redux Store'u güncelliyoruz
    dispatch({ type: "LOGIN", payload: data });

    // 3. 🔥 ÇÖZÜM: Yazma işleminin bitmesini garantiye alıyoruz
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  } catch (error) {
    const msg = error.response?.data?.message || "Bir hata oluştu!";
    toast.error(msg, { position: "top-right", autoClose: 2000 });
  }
};
