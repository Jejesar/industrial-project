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
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SimpleCard({}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  let defaultBody = {
    grant_type: "",
    username: "asdf@gmail.com",
    password: "asdf",
    scope: "",
    client_id: "",
    client_secret: "",
  };

  async function onSubmit(values: any) {
    try {
      const body = { ...defaultBody, ...values };
      let res = await signIn("credentials", {
        ...body,
        callbackUrl: router.query.callbackUrl,
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (status === "authenticated") {
    router.push(router.query.callbackUrl as string);
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
            {/* <FormPasswordlessEmail /> */}

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
