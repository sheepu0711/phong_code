import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUserInfo = localStorage.getItem("userInfo");

      if (storedToken && storedUserInfo) {
        try {
          const parsedUserInfo = JSON.parse(storedUserInfo);

          // Kiểm tra xem parsedUserInfo có phải là object hợp lệ không
          if (
            parsedUserInfo &&
            typeof parsedUserInfo === "object" &&
            parsedUserInfo.id
          ) {
            setToken(storedToken);
            setUserInfo(parsedUserInfo);
          } else {
            console.error("userInfo không hợp lệ:", parsedUserInfo);
            // Xóa dữ liệu không hợp lệ
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            setToken(null);
            setUserInfo(null);
          }
        } catch (parseError) {
          console.error("Lỗi khi parse userInfo:", parseError);
          // Xóa dữ liệu không hợp lệ
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          setToken(null);
          setUserInfo(null);
        }
      } else {
        // Nếu thiếu một trong hai, xóa cả hai để tránh trạng thái không đồng bộ
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setToken(null);
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra đăng nhập:", error);
      // Xóa dữ liệu không hợp lệ
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      setToken(null);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (newToken, newUserInfo) => {
    if (!newToken || !newUserInfo) {
      console.error("Dữ liệu đăng nhập không hợp lệ");
      return;
    }

    // Kiểm tra xem newUserInfo có phải là object hợp lệ không
    if (typeof newUserInfo !== "object" || !newUserInfo.id) {
      console.error("userInfo không hợp lệ:", newUserInfo);
      return;
    }

    try {
      // Lưu token
      localStorage.setItem("token", newToken);

      // Lưu thông tin user dưới dạng JSON string
      const userInfoString = JSON.stringify(newUserInfo);
      localStorage.setItem("userInfo", userInfoString);

      // Cập nhật state
      setToken(newToken);
      setUserInfo(newUserInfo);

      console.log("Đăng nhập thành công:", {
        token: newToken,
        userInfo: newUserInfo,
      });
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      // Xóa dữ liệu nếu có lỗi
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      setToken(null);
      setUserInfo(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setToken(null);
    setUserInfo(null);
  };

  const getBookMark = () => {
    
  }

  // Tạo một giá trị mặc định cho userInfo để tránh lỗi null
  const safeUserInfo = userInfo || {
    id: null,
    name: "User",
    email: "",
    avatar: null,
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userInfo: safeUserInfo, // Sử dụng safeUserInfo thay vì userInfo
        isAuthenticated: !!token,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
