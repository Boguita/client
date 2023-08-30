import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

 const login = async (inputs, setError) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        { withCredentials: true } // Asegúrate de incluir esta opción para enviar las cookies
      );
      if(res.status === 200){
      setCurrentUser(res.data);
      }
    } catch (error) {
      throw(error.response.data);
    }
  };
  const loginAdmin = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/admin", inputs);
      const userData = { ...res.data, token: res.data.access_token }; // Agregar el token a la respuesta
      setCurrentUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
