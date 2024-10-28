import { Button, Stack, Text } from "@mantine/core";
import InputField from "./form/InputField";
import { useForm } from "react-hook-form";
import { UserLoginInterface } from "@/types/user";
import useApi from "@/hooks/useApi";
import api, { authTokenCookiesName } from "./api";
import { isNil } from "lodash";
import { ToastStatus, useCustomToast } from "@/hooks/useToast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LoginForm = () => {
  const { makeApiCall } = useApi();
  const { showToast } = useCustomToast();
  const router = useRouter();
  const hookForm = useForm<UserLoginInterface>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: UserLoginInterface) => {
    makeApiCall<{ token: string }>({
      apiFn: () => api("/user/login", { method: "POST", data }),
      onSuccessFn: (res) => {
        if (isNil(res.token)) {
          showToast({
            id: "Token not found",
            message: "Error in loggingIn, Please try again",
            status: ToastStatus.error,
          });
          return;
        }
        hookForm.reset();
        Cookies.set(authTokenCookiesName, res.token);
        router.replace("/");
      },
    });
  };

  return (
    <form onSubmit={hookForm.handleSubmit(onSubmit)}>
      <Stack w="100%" gap={20}>
        <Text ff="Playfair Display" fz={32} fw={700} ta="center">
          Login to get all Access
        </Text>
        <InputField
          hForm={hookForm}
          name="email"
          title="Email"
          rules={{ required: true }}
          type="email"
        />
        <InputField
          hForm={hookForm}
          name="password"
          title="Password"
          rules={{ required: true }}
          type="password"
        />
        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
