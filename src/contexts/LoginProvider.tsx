import { authTokenCookiesName, getAccessToken } from "@/components/api";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isNil } from "lodash";
import { useRouter } from "next/router";

interface LoginDataInterface {
  isLoggedIn: boolean;
  isLoginChecked: boolean;
}

const LoginProviderContext = createContext<LoginDataInterface>({
  isLoggedIn: false,
  isLoginChecked: false,
});

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = router.asPath;
  const [isLoginChecked, setIsLoginChecked] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authToken = Cookies.get(authTokenCookiesName);
    setIsLoginChecked(true);
    setIsLoggedIn(!isNil(authToken));
    if (isNil(authToken)) {
      router.replace("/login");
    }
  }, []);
  console.log("Path: ", path);
  if (path.includes("/login")) {
    return <>{children}</>;
  }

  return (
    <LoginProviderContext.Provider
      value={{
        isLoggedIn,
        isLoginChecked,
      }}
    >
      {children}
    </LoginProviderContext.Provider>
  );
};

export const useLoggedIn = () => useContext(LoginProviderContext);

export default LoginProvider;
