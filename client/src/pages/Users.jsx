import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
axios.defaults.withCredentials = true;

let firstRender = true;

const Users = () => {
  const { user, setUser } = useContext(AuthContext);

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/api/refresh", {
      withCredentials: true,
    });
    const data = await res.data;
    setUser(data.message);
    return data;
  };

  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/user", {
      withCredentials: true,
    });
    const data = await res.data;
    setUser(data.message);
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest();
    }
    let interval = setInterval(() => {
      refreshToken();
    }, 1000 * 29);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      {user && <h1>Welcome {user.name}</h1>}
    </div>
  );
};

export default Users;
