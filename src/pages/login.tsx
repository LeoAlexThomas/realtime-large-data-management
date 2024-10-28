import LoginForm from "@/components/LoginForm";
import { Box, Center } from "@mantine/core";

const Login = () => {
  return (
    <Center h="100vh">
      <Box
        w="100%"
        maw={600}
        p={32}
        style={{
          border: "1px solid #00000050",
          boxShadow: "0px 0px 5px black",
          borderRadius: 12,
        }}
      >
        <LoginForm />
      </Box>
    </Center>
  );
};

export default Login;
