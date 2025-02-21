import { Post } from "@/types/entities";
import { Box, Center, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { FaHeart, FaHeartBroken, FaRegEye } from "react-icons/fa";

interface CardResumoPostProps {
  post: Post
}

const CardResumoPost = ({post }: CardResumoPostProps) => {
  return (
    <>
      <Box
        w="500px"
        bgColor={"blue.200"}
        borderRadius={"4px"}
        p="8px"
        _hover={{ bgColor: "blue.300", cursor: "pointer" }}
      >
        <Center>
          <VStack w="full">
            <HStack w="full">
              <VStack w="full">
                <Text
                  w="full"
                  textAlign={"left"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >
                  Título: {post?.title}
                </Text>
                <HStack w="full">
                  <Text whiteSpace={"nowrap"} fontSize={"xs"}>
                    Por: {post.user_id?.name}
                  </Text>
                  <Spacer />
                  <HStack pr='5px'>
                    <FaRegEye />
                    <Text whiteSpace={"nowrap"} fontSize={"xs"}>
                    {post.views}
                    </Text>
                  </HStack>
                  <HStack pr='5px'>
                    <FaHeart />
                    <Text whiteSpace={"nowrap"} fontSize={"xs"} pr={0}>
                      {post.likes}
                    </Text>                    
                  </HStack>
                  <HStack pr='5px'>
                    <FaHeartBroken />
                    <Text whiteSpace={"nowrap"} fontSize={"xs"}>
                    {post.dislikes}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default CardResumoPost;
