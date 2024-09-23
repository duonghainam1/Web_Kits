import { jwtDecode } from "jwt-decode";

// Hàm lấy token từ localStorage
export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// Hàm giải mã token JWT
export const getDecodedToken = () => {
  const token = getToken();
  if (!token) return null; // Kiểm tra token trước khi giải mã

  try {
    const decoded = jwtDecode(token); // Chỉ gọi jwtDecode khi token không phải null
    return decoded;
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
    return null;
  }
};
