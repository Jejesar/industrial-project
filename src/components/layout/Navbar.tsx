"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  useColorMode,
  IconButton,
  useDisclosure,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Stack,
} from "@chakra-ui/react";
import {
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
}

const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={href ? href : "/"}
    >
      {children}
    </Box>
  );
};

const loginIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
  </svg>
);

const logoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
  </svg>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isMobileNavOpen,
    onOpen: onMobileNavOpen,
    onClose: onMobileNavClose,
  } = useDisclosure();
  const { data: session } = useSession();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        boxShadow={"0 0 20px 0 rgba(0, 0, 0, 0.15)"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isMobileNavOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isMobileNavOpen ? onMobileNavClose : onMobileNavOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <Box
              as={Link}
              href={"/"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              fontSize={"larger"}
              mr={4}
              whiteSpace={"nowrap"}
            >
              Projet industriel
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink href="/">Accueil</NavLink>
              <NavLink href="/monitoring">Monitoring</NavLink>
              {session && session.user.role === "ADMIN" && (
                <NavLink href="/configuration">Configuration</NavLink>
              )}
            </HStack>
          </HStack>

          <Flex alignItems={"center"} display={{ base: "flex", lg: "none" }}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"md"}
                cursor={"pointer"}
                minW={0}
              >
                <SettingsIcon />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={toggleColorMode} closeOnSelect={false}>
                  {colorMode === "light" ? (
                    <Text>
                      Activer le dark mode
                      <MoonIcon ml={2} pb={0.5} />
                    </Text>
                  ) : (
                    <Text>
                      Activer le light mode
                      <SunIcon ml={2} pb={0.5} />
                    </Text>
                  )}
                </MenuItem>
                <MenuDivider />
                {session ? (
                  <>
                    <MenuItem color={"gray.400"}>
                      Connecté en temps que "{session.user.name}"
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>
                      <Text mr={2}>Se déconnecter</Text> {logoutIcon}
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => signIn()}>
                    <Text mr={2}>Se connecter</Text> {loginIcon}
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>

          <Flex alignItems={"center"} display={{ base: "none", lg: "flex" }}>
            <HStack spacing={2}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {session ? (
                <Button
                  leftIcon={logoutIcon}
                  colorScheme="gray"
                  onClick={() => signOut()}
                >
                  Se déconnecter
                </Button>
              ) : (
                <Button
                  leftIcon={loginIcon}
                  colorScheme="blue"
                  onClick={() => signIn()}
                >
                  Se connecter
                </Button>
              )}
            </HStack>
          </Flex>
        </Flex>
        {isMobileNavOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink href="/">Accueil</NavLink>
              <NavLink href="/monitoring">Monitoring</NavLink>
              {session && session.user.role === "ADMIN" && (
                <NavLink href="/configuration">Configuration</NavLink>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
