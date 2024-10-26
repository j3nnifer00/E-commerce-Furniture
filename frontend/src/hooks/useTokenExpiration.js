import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from './useAuthContext';
import { useLogout } from "../hooks/useLogout";

const useTokenExpiration = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    if (!user || !user.token) return;

    const token = user.token;
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // 초 단위를 밀리초로 변환

    const handleExpiration = () => {
      const currentTime = Date.now();
      if (currentTime >= expirationTime) {
        logout(); // 토큰이 만료되었으면 로그아웃 처리
      }
    };

    const interval = setInterval(handleExpiration, 1000); // 매 초마다 만료 체크

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, [user, logout]);
};

export default useTokenExpiration;
