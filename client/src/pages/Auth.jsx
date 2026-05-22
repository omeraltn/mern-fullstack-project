import React, { useState } from "react";
import { loginAction, registerAction } from "../redux/actions/auth";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const authFunc = () => {
    if (signUp) {
      dispatch(registerAction(authData));
    } else {
      dispatch(loginAction(authData));
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50 ">
      <div className="w-1/3 bg-white p-5 rounded-md shadow-md min-w-100">
        <h1 className="text-2xl text-indigo-700 font-bold mb-4 text-center ">
          {signUp ? "Kayıt Ol" : "Giriş Yap"}
        </h1>
        <div className="flex flex-col space-y-3 mb-5 ">
          {signUp && (
            <input
              type="text"
              name="username"
              placeholder="Kullanıcı Adı"
              className="input-style"
              value={authData.username}
              onChange={onChangeFunc}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Adresi"
            className="input-style"
            value={authData.email}
            onChange={onChangeFunc}
          />
          {/* DÜZELTME: type="password" yapılarak şifre gizlendi */}
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            className="input-style"
            value={authData.password}
            onChange={onChangeFunc}
          />
        </div>
        <div className="text-red-600 text-xs mb-4 cursor-pointer font-medium">
          {signUp ? (
            <span onClick={() => setSignUp(false)}>
              Zaten bir hesabınız var mı? Giriş Yap
            </span>
          ) : (
            <span onClick={() => setSignUp(true)}>
              Hesabınız yok mu? Kayıt Olun!
            </span>
          )}
        </div>
        <div
          onClick={authFunc}
          className="cursor-pointer hover:bg-indigo-800 transition-colors duration-200
        w-full p-2 text-center bg-indigo-600 text-white rounded-md font-semibold"
        >
          {signUp ? "Kayıt Ol" : "Giriş Yap"}
        </div>
      </div>
    </div>
  );
};

export default Auth;
