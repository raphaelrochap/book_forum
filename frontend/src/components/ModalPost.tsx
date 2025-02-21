import { api } from "@/api/api"
import useBookForumStore from "@/store/store"
import { Post } from "@/types/entities"
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
    Input,
    FormLabel,
    Textarea,
  } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react"
  
  interface ModalPostProps {
    disclosureProps: UseDisclosureProps
    insert?: boolean
    post?: Post
    refresh: () => void
  }
  
  const ModalPost = ({ disclosureProps, insert = false, post, refresh }: ModalPostProps) => {  
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image_url, setImageUrl] = useState<string>('')
    const { bearerToken } = useBookForumStore()

    const handlePublicarEditar = async (e: FormEvent<HTMLFormElement>) => {      
      e.preventDefault()
      let response = undefined
      if(insert)
        response = await api(bearerToken).post('posts', { title, description, image_url })
      else
        response = await api(bearerToken).patch(`posts/${post?.id}`, { title, description, image_url })

      if (response.status == 201 || response.status == 200)
      {
        setTitle('')
        setDescription('')
        
        disclosureProps.onClose?.()
        refresh()
      }      
    }

    useEffect(() => {
      if(post){
        setTitle(String(post?.title))
        setDescription(String(post?.description))
        setImageUrl(String(post?.image_url))
      }        
    }, [post])

    return (
      <>
        <Modal isOpen={disclosureProps.isOpen as boolean} onClose={disclosureProps.onClose as () =>  void} closeOnOverlayClick={false} size='2xl'>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handlePublicarEditar}>
              <ModalHeader>{insert ? 'Criar' : 'Editar'} uma nova publicação</ModalHeader>
              <ModalBody>              
                  <FormControl w='full' isRequired>
                      <FormLabel>Título</FormLabel>
                      <Input value={title} onChange={(e) => { setTitle(e.target.value) }}/>
                  </FormControl>
                  <FormControl w='full'>
                      <FormLabel pt='10px'>Url da imagem</FormLabel>
                      <Input value={image_url} onChange={(e) => { setImageUrl(e.target.value) }}/>
                  </FormControl>
                  <FormControl w='full' isRequired>
                      <FormLabel pt='10px'>Descrição</FormLabel>
                      <Textarea value={description} onChange={(e) => { setDescription(e.target.value) }}/>
                  </FormControl>              
              </ModalBody>
              <ModalFooter>
                <HStack w='full'>
                  <Button onClick={disclosureProps.onClose}>Cancelar</Button>
                  <Spacer />
                  <Button type="submit" colorScheme="blue">{insert ? 'Publicar' : 'Editar publicação'}</Button>
              </HStack>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default ModalPost