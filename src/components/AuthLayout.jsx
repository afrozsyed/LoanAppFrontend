import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/componentLib"

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, authentication, navigate]);
  
    return loading ? <Loader/> : <>{children}</>;
}

export default AuthLayout;