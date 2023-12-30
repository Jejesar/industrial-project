// Importation des composants nécessaires depuis les modules correspondants
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

// Définition de l'interface NavLinkProps
interface NavLinkProps {
  children: React.ReactNode; // Les enfants du composant NavLink
  href?: string; // L'URL vers laquelle le lien doit pointer
}

// Définition du composant NavLink
const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <Box
      as={Link} // Utilisation du composant Link pour la navigation
      px={2} // Padding horizontal
      py={1} // Padding vertical
      rounded={"md"} // Bord arrondi
      _hover={{
        textDecoration: "none", // Pas de soulignement au survol
        bg: useColorModeValue("gray.200", "gray.700"), // Couleur de fond au survol, dépendant du mode couleur
      }}
      href={href ? href : "/"} // L'URL vers laquelle le lien doit pointer, par défaut vers la page d'accueil
    >
      {children}
    </Box>
  );
};

// Définition de l'icône de connexion
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

// Définition de l'icône de déconnexion
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

// Importation des composants nécessaires depuis les modules correspondants
export default function Navbar() {
  // Utilisation du hook useColorMode pour obtenir le mode de couleur actuel et la fonction pour le changer
  const { colorMode, toggleColorMode } = useColorMode();
  // Utilisation du hook useDisclosure pour gérer l'état d'ouverture du menu mobile
  const {
    isOpen: isMobileNavOpen,
    onOpen: onMobileNavOpen,
    onClose: onMobileNavClose,
  } = useDisclosure();
  // Utilisation du hook useSession pour obtenir les informations de session de l'utilisateur
  const { data: session } = useSession();

  // Retourne le composant Navbar
  return (
    <>
      <Box
        // Définit la couleur de fond en fonction du mode de couleur
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        // Ajoute une ombre à la boîte
        boxShadow={"0 0 20px 0 rgba(0, 0, 0, 0.15)"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Bouton pour ouvrir/fermer le menu mobile */}
          <IconButton
            size={"md"}
            icon={isMobileNavOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isMobileNavOpen ? onMobileNavClose : onMobileNavOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            {/* Lien vers la page d'accueil */}
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
            {/* Navigation principale */}
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* Liens de navigation, affichés en fonction du rôle de l'utilisateur */}
              <NavLink href="/">Accueil</NavLink>
              {session &&
                (session.user.role === "ADMIN" ||
                  session.user.role === "TECH") && (
                  <NavLink href="/monitoring">Monitoring</NavLink>
                )}
              {session && session.user.role === "ADMIN" && (
                <NavLink href="/configuration">Configuration</NavLink>
              )}
            </HStack>
          </HStack>
          {/* Menu pour les appareils mobiles */}
          <Flex alignItems={"center"} display={{ base: "flex", lg: "none" }}>
            <Menu>
              {/* Bouton pour ouvrir le menu */}
              <MenuButton
                as={Button}
                rounded={"md"}
                cursor={"pointer"}
                minW={0}
              >
                <SettingsIcon />
              </MenuButton>
              {/* Liste des options du menu */}
              <MenuList>
                {/* Option pour changer le mode de couleur */}
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
                {/* Option pour se connecter ou se déconnecter */}
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

          {/* Menu pour les appareils de bureau */}
          <Flex alignItems={"center"} display={{ base: "none", lg: "flex" }}>
            <HStack spacing={2}>
              {/* Bouton pour changer le mode de couleur */}
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {/* Bouton pour se connecter ou se déconnecter */}
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

        {/* Navigation mobile */}
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
