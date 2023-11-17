import {
  Button,
  FormControl,
  FormErrorMessage,
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

function EditModal({ isOpen, onOpen, onClose, tag }: any) {
  const [inputs, setInputs] = useState({
    displayName: "",
    show: false,
    description: "",
  });
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  //   async function onSubmit(values: any) {
  //     try {
  //       const body = { values };
  //       //   let res = await;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  const onSubmit = async (data: any) => {
    try {
      const body = { ...inputs };
      await fetch("/api/tags/edit/" + tag.name, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
    onClose();
    router.reload();
  };

  const handleChange = (e: any) => {
    const { id, value, checked } = e.target;
    if (id === "show") {
      setInputs((inputs) => ({ ...inputs, [id]: checked }));
    } else {
      setInputs((inputs) => ({ ...inputs, [id]: value }));
    }
  };

  const closeModal = () => {
    onClose();
    console.log(inputs);
  };

  useEffect(() => {
    setInputs({
      displayName: tag?.displayName ? tag.displayName : tag?.name,
      show: tag?.show ? tag.show : false,
      description: tag?.description,
    });
  }, [isOpen]);

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

export default EditModal;
