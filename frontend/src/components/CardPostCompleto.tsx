import { api } from "@/api/api";
import useBookForumStore from "@/store/store";
import { User, Comment, Post } from "@/types/entities";
import {
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaHeart, FaHeartBroken, FaRegEye, FaTrashAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import ModalComentario from "@/components/ModalComentario";

interface CardPostCompletoProps {
  post: Post;
  refresh: () => void
}

const CardPostCompleto = ({ post, refresh }: CardPostCompletoProps) => {
  const router = useRouter()
  const [comentarios, setComentarios] = useState<Comment[]>([]);
  const [description, setDescription] = useState<string>('');
  const [comment, setComment] = useState<Comment>({ description: '' });
  const { bearerToken, user } = useBookForumStore()
  const modalEditComentarioDisclosure = useDisclosure();
  
  const PostComment = async () => {
    const newComment: Comment = {
      user_id: user?.id,
      post_id: post.id,
      description
    }
    if (!bearerToken) return
    await api(bearerToken).post('comments', newComment);
    setDescription('')
    refresh()
  };

  const PatchLike = async () => {
    if (!bearerToken) return
    await api(bearerToken).patch(`posts/like/${post.id}`);
    refresh()
  };

  const PatchDislike = async () => {
    if (!bearerToken) return
    await api(bearerToken).patch(`posts/dislike/${post.id}`);
    refresh()
  };

  const removePost = async () => {
    if (!bearerToken) return
    await api(bearerToken).delete(`posts/${post.id}`)
    router.push('/')
  };

  const removeComment = async (id_comment: number) => {
    if (!bearerToken) return
    await api(bearerToken).delete(`comments/${id_comment}`)
    refresh()
  };

  const getLikedVotedColor = (): string => {
    if (post.liked_by?.find((id) => id === user?.id)) return "red";
    return "";
  };

  const getDislikedVotedColor = (): string => {
    if (post.disliked_by?.find((id) => id === user?.id))
      return "red";
    return "";
  };

  const getComentarios = async () => {
    if (!bearerToken) return
    const response = await api(bearerToken).get(`/comments/byPostId/${post.id}`);

    if (response.status == 200) setComentarios(response.data);
  }

  useEffect(() => {
    getComentarios();
  }, [post, bearerToken]);

  return (
    <>
      <VStack w="full">
        <Box w={{ base: "80%", lg: "50%" }}>
          <Center bgColor={"blue.200"} rounded={'lg'} p="20px">
            <VStack w="full">
              <HStack w="full">
                <VStack w="full">
                  <Text
                    w="full"
                    textAlign={"center"}
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                    mb={'-10px'}
                  >
                    {post.title}
                  </Text>
                  <Text w="full"
                  textAlign={"center"}
                  fontSize={"md"}
                  mb={'10px'}
                  >
                    Autor: {post?.user_id?.name}
                  </Text>                  

                  <Text w="full" textAlign={"left"}>
                    {post.description}
                  </Text>
                  <HStack textAlign={"end"} w="full">
                    <HStack pr="5px">
                      <FaRegEye />
                      <Text whiteSpace={"nowrap"} fontSize={"xs"}>
                        {post.views}
                      </Text>
                    </HStack>
                    <Spacer />
                    <Button onClick={PatchLike}>
                      <HStack pr="5px">                      
                          <FaHeart color={getLikedVotedColor()} />                      
                        <Text whiteSpace={"nowrap"} fontSize={"xs"} pr={0}>
                          {post.likes}
                        </Text>
                      </HStack>
                    </Button>
                    <Button onClick={PatchDislike}>
                      <HStack pr="5px">                      
                        <FaHeartBroken color={getDislikedVotedColor()} />
                        <Text whiteSpace={"nowrap"} fontSize={"xs"}>
                          {post.dislikes}
                        </Text>                      
                      </HStack>                      
                    </Button>
                    {user?.id == post?.user_id?.id &&
                    <Tooltip label='Deletar post' placement="top" hasArrow>
                      <Button onClick={removePost} variant={'ghost'} colorScheme="red">
                        <HStack pr="5px">                      
                          <FaTrashAlt />                        
                        </HStack>                                              
                      </Button>
                    </Tooltip>
                    }
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </Center>
          <HStack my='10px'>
            <Text fontWeight={"bold"}>Comentários</Text>
            <Badge colorScheme="green">{comentarios.length}</Badge>
          </HStack>
          <VStack w='full' mb='20px'>
            <FormControl w={{ base: "80%", lg: "90%" }}>
              <HStack>
              <Textarea value={description} onChange={(e) => { setDescription(e.target.value) }}/>
              <Button disabled={!description} onClick={PostComment} variant='ghost' colorScheme="blue"><IoSend /></Button>
              </HStack>
            </FormControl>
          </VStack>
          <VStack w="full">
            {comentarios.map((comentario) => {
              const commentUser: User = comentario?.user_id as User
            return (
              <VStack key={post.id} textAlign={'left'} bgColor={"blue.200"} w={{ base: "80%", lg: "90%" }} rounded={'md'} p='10px 15px'>
                <HStack w='full'>
                  {!comentario.removed ?
                    <>
                      <Text fontWeight={'bold'}>{commentUser.name}:</Text>
                      <Text>{comentario.description}</Text>
                      <Spacer />
                      {((user?.id == commentUser.id) || (post?.user_id?.id == user?.id)) &&
                        <Tooltip label='Editar comentário' placement="top" hasArrow>                      
                          <Button onClick={() => {
                            setComment(comentario)
                            modalEditComentarioDisclosure.onOpen()
                          }} variant={'ghost'} colorScheme="red">
                            <HStack pr="5px">                      
                              <FaEdit />                        
                            </HStack>                                              
                          </Button>
                        </Tooltip>
                      }
                      {((user?.id == commentUser.id) || (post?.user_id?.id == user?.id)) &&
                        <Tooltip label='Excluir comentário' placement="top" hasArrow>                      
                          <Button onClick={() => {removeComment(Number(comentario?.id))}} variant={'ghost'} colorScheme="red">
                            <HStack pr="5px">                      
                              <FaTrashAlt />                        
                            </HStack>                                              
                          </Button>
                        </Tooltip>
                      }
                    </>
                    :
                    <>
                      <Text as='i' fontWeight={'thin'}>Comentario removido</Text>
                    </>
                  }
                </HStack>
              </VStack>
            )})}            
          </VStack>
        </Box>
      </VStack>

      <ModalComentario disclosureProps={modalEditComentarioDisclosure} refresh={getComentarios} comment={comment}/>
    </>
  );
};

export default CardPostCompleto;
