import Head from "next/head";
import { Box, Center } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Head>
        <title>Data Management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box>
        <Center>Data Checking</Center>
      </Box>
    </>
  );
}
