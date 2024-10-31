import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginHandler = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  // GoogleLoginHandler.js
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    const isAdmin = urlParams.get("isAdmin");

    if (token) {
        // localStorage에 저장
        localStorage.setItem("user", JSON.stringify({ token, email, isAdmin }));
        // context에 로그인 상태 업데이트
        dispatch({ type: "LOGIN", payload: { token, email, isAdmin } });
        // 홈으로 리디렉션
        navigate("/");
    }
  }, [dispatch, navigate]);


  return null;
};

export default GoogleLoginHandler;
