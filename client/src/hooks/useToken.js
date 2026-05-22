import { useState, useEffect } from "react";

const useToken = () => {
  // Sayfa ilk render edildiğinde LocalStorage'daki güncel veriyi direkt oku
  const [token, setToken] = useState(() => {
    const localData = localStorage.getItem("auth");
    try {
      return localData ? JSON.parse(localData) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    // Sayfa her yüklendiğinde hafızayı bir kez daha sağlama alıp senkronize et
    const localData = localStorage.getItem("auth");
    if (localData) {
      try {
        setToken(JSON.parse(localData));
      } catch (e) {
        setToken(null);
      }
    }
  }, []); // Boş bağımlılık dizisi sayesinde sonsuz döngü engellendi

  return token;
};

export default useToken;
