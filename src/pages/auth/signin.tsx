import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";

export default function SignInPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(values: any) {
    await signIn("credentials", {
      ...values,
      callbackUrl: router.query.callbackUrl,
    });
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Connectez vous</Heading>
          <Text fontSize={"lg"} color={"gray.500"}>
            pour avoir acces à toutes les fonctionnalités
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <VStack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl
                  id="username"
                  isInvalid={Boolean(router.query.error)}
                  isRequired
                >
                  <FormLabel>Username</FormLabel>
                  <Input type="username" {...register("username")} />
                </FormControl>
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={Boolean(router.query.error)}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {router.query.error &&
                    router.query.error === "CredentialsSignin" && (
                      <FormErrorMessage>Invalid credentials</FormErrorMessage>
                    )}
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    isLoading={isSubmitting}
                    loadingText="Connexion..."
                    colorScheme="blue"
                    type="submit"
                  >
                    Se connecter
                  </Button>
                </Stack>
              </Stack>
            </form>
          </VStack>
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    console.log("session", session);
    console.log("context", context);

    return {
      redirect: {
        destination: "/" + (context.query.callbackUrl || ""),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
