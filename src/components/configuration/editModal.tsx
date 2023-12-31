// Importation des composants nécessaires depuis les bibliothèques correspondantes
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Définition du composant EditModal
function EditModal({ isOpen, onClose, tag }: any) {
  // Définition de l'état initial des inputs
  const [inputs, setInputs] = useState({
    displayName: "",
    show: false,
    description: "",
  });

  const router = useRouter();

  // Utilisation du hook useForm pour gérer le formulaire
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Fonction à exécuter lors de la soumission du formulaire
  const onSubmit = async () => {
    try {
      // Création du corps de la requête
      const body = { ...inputs };
      // Envoi de la requête à l'API pour éditer le tag
      await fetch("/api/tags/edit/" + tag.name, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
    // Fermeture du modal et rechargement de la page
    onClose();
    router.reload();
  };

  // Fonction pour gérer les changements dans les inputs
  const handleChange = (e: any) => {
    const { id, value, checked } = e.target;
    if (id === "show") {
      setInputs((inputs) => ({ ...inputs, [id]: checked }));
    } else {
      setInputs((inputs) => ({ ...inputs, [id]: value }));
    }
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    onClose();
    console.log(inputs);
  };

  // Mise à jour des inputs lorsque le modal est ouvert
  useEffect(() => {
    setInputs({
      displayName: tag?.displayName ? tag.displayName : tag?.name,
      show: tag?.show ? tag.show : false,
      description: tag?.description,
    });
  }, [isOpen]);

  // Rendu du composant
  return (
    <>
      <Modal isCentered closeOnEsc isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edition du tag - {tag?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl id="displayName" isRequired>
                  <FormLabel>Nom affiché</FormLabel>
                  <Input
                    type="text"
                    value={inputs.displayName}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    Modifier le nom du tag qui sera affiché sur la page du
                    monitoring.
                  </FormHelperText>
                </FormControl>
                <FormControl id="show">
                  <FormLabel>Afficher</FormLabel>
                  <Switch
                    defaultChecked={tag?.show}
                    checked={inputs.show}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    Choisir si le tag sera affiché sur la page du monitoring.
                  </FormHelperText>
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Ajouter une description au tag."
                    value={inputs.description}
                    onChange={handleChange}
                    resize={"none"}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={closeModal}>
                Fermer
              </Button>
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                Enregistrer
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

// Exportation du composant EditModal
export default EditModal;
