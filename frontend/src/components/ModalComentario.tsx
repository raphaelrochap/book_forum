import { api } from "@/api/api";
import useBookForumStore from "@/store/store";
import { Comment } from "@/types/entities";
import {
  Button,
  Modal,
  ModalBody,
  UseDisclosureProps,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  Spacer,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";

interface ModalComentarioProps {
  disclosureProps: UseDisclosureProps;
  comment: Comment;
  refresh: () => void;
}

const ModalComentario = ({
  disclosureProps,
  comment,
  refresh,
}: ModalComentarioProps) => {
  const [description, setDescription] = useState<string>(comment.description);
  const { bearerToken } = useBookForumStore();

  const handleUpdateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { description };
    const response = await api(bearerToken).patch(
      `comments/${comment.id}`,
      payload
    );

    if (response.status == 200) {
      setDescription("");

      disclosureProps.onClose?.();
      refresh();
    }
  };

  useEffect(() => {
    setDescription(comment.description);
  }, [comment.description]);

  return (
    <>
      <Modal
        isOpen={disclosureProps.isOpen as boolean}
        onClose={disclosureProps.onClose as () => void}
        closeOnOverlayClick={false}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleUpdateComment}>
            <ModalHeader>Editar comentario</ModalHeader>
            <ModalBody>
              <FormControl w="full">
                <FormLabel pt="20px">Descrição</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <HStack w="full">
                <Button onClick={disclosureProps.onClose}>Cancelar</Button>
                <Spacer />
                <Button type="submit" colorScheme="blue">
                  Publicar
                </Button>
              </HStack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComentario;
