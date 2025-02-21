import { api } from "@/api/api"
import useBookForumStore from "@/store/store"
import {
    Button,
    Modal,
    ModalBody,
    UseDisclosureProps,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Center,
    ModalCloseButton,
    HStack,
    Spacer,
    FormControl,
    VStack,
    Input,
    FormLabel,
    Textarea,
  } from "@chakra-ui/react"
import { desc } from "framer-motion/client"
import { FormEvent, useState } from "react"
  
  interface ModalRealizaBackupProps {
    disclosureProps: UseDisclosureProps
    refresh: () => void
  }
  
  const ModalPost = ({ disclosureProps, refresh }: ModalRealizaBackupProps) => {  
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const { bearerToken } = useBookForumStore()

    const handlePublicar = async (e: FormEvent<HTMLFormElement>) => {      
      e.preventDefault()
      const payload = { title, description }
      const response = await api(bearerToken).post('posts', payload)

      if (response.status == 201)
      {
        setTitle('')
        setDescription('')
        
        disclosureProps.onClose?.()
        refresh()
      }      
    }

    return (
      <>
        <Modal isOpen={disclosureProps.isOpen as boolean} onClose={disclosureProps.onClose as () =>  void} closeOnOverlayClick={false} size='2xl'>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handlePublicar}>
              <ModalHeader>Criar uma nova publicação</ModalHeader>
              <ModalBody>              
                  <FormControl w='full'>
                      <FormLabel>Título</FormLabel>
                      <Input value={title} onChange={(e) => { setTitle(e.target.value) }}/>
                  </FormControl>
                  <FormControl w='full'>
                      <FormLabel pt='20px'>Descrição</FormLabel>
                      <Textarea value={description} onChange={(e) => { setDescription(e.target.value) }}/>
                  </FormControl>              
              </ModalBody>
              <ModalFooter>
                <HStack w='full'>
                  <Button onClick={disclosureProps.onClose}>Cancelar</Button>
                  <Spacer />
                  <Button type="submit" colorScheme="blue">Publicar</Button>
              </HStack>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default ModalPost