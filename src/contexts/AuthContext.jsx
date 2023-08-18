import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAutheticated, setIsAuthenticated] = useState(false);
  const [toFreeTrial, setToFreeTrial] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [me, setMe] = useState({
    id: null,
    fname: null,
    email: null,
    lname: null,
    socialLoginId: null,
  });
  const loginData = window.sessionStorage.getItem("login_data");
  useEffect(() => {
    if (loginData) {
      setIsAuthenticated(true);
      setMe(JSON.parse(loginData));
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/templates");
      }
    } else {
      if (location.pathname !== "/delete-account-confirmed") {
        if (
          location.pathname.includes(
            "freetrial"
          )
        ) {
          setToFreeTrial(location.pathname);
        } else {
          setToFreeTrial("");
        }
        navigate("/login");
        setIsAuthenticated(false);
        setMe({
          id: null,
          fname: null,
          email: null,
          lname: null,
          socialLoginId: null,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doSetUser = (data) => {
    window.sessionStorage.removeItem("login_data");
    window.sessionStorage.setItem("login_data", JSON.stringify(data));
    setIsAuthenticated(true);
    setMe(data);
  };

  const logOut = () => {
    window.sessionStorage.removeItem("login_data");
    setMe({
      id: null,
      fname: null,
      email: null,
      lname: null,
      socialLoginId: null,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        me,
        isAutheticated,
        toFreeTrial,
        doSetUser,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
