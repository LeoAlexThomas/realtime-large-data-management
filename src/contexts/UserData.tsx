import CustomLoader from "@/components/CustomLoader";
import { UserInterface, UserRoleEnum } from "@/types/user";
import { Center, Text } from "@mantine/core";
import { createContext, useContext } from "react";
import useSWR from "swr";
import { useLoggedIn } from "./LoginProvider";
import { useRouter } from "next/router";

const UserDataContext = createContext<UserInterface>({
  id: "dummy-user",
  email: "dummy@gmail.com",
  name: "dummy",
  role: UserRoleEnum.user,
});

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = router.asPath;
  const { isLoginChecked, isLoggedIn } = useLoggedIn();
  const { data, error } = useSWR<UserInterface>(
    isLoggedIn ? "/user/current" : ""
  );
  const isLoading = !data && !error;
  if (path.includes("/login")) {
    return <>{children}</>;
  }
  if (isLoading || !isLoginChecked) {
    return <CustomLoader />;
  }

  if (!data) {
    return (
      <Center h="100%">
        <Text>Error occurred while retrieving user data</Text>
      </Center>
    );
  }

  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);

export default UserDataProvider;
