import { useNavigate } from "react-router-dom";

export function LogOutAction() {
  const navigate = useNavigate();

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  // 직접 navigate 함수를 사용하여 리다이렉션 수행
  navigate('/');
  
  // 이 부분에서 리턴값이 필요하지 않습니다. navigate 함수를 호출한 이후에 코드가 실행될 필요가 없기 때문입니다.
  return null;
}
