import { api } from "@/api/api";
import CardResumoPost from "@/components/CardResumoPost";
import Layout from "@/components/Layout";
import ModalPost from "@/components/ModalPost";
import useBookForumStore from "@/store/store";
import { Post } from "@/types/entities";
import { Button, Center, useDisclosure, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const modalPostDisclosure = useDisclosure();
  const { bearerToken } = useBookForumStore();

  const SessionCheck = () => {
    const token = localStorage.getItem("book-forum-storage");
    const user = JSON.parse(String(token));

    if (!user?.state?.bearerToken) router.push("/login");
  };

  const getPosts = async () => {
    if (!bearerToken) return;
    const response = await api(bearerToken).get("/posts");

    if (response.status == 200) setPosts(response.data);
  };

  useEffect(() => {
    SessionCheck();
    getPosts();
  }, [bearerToken, router]);

  return (
    <>
      <Layout>
        <Center mt="30px">
          <VStack>
            <Center mb="30px">
              <Button colorScheme="blue" onClick={modalPostDisclosure.onOpen}>
                Criar Publicação
              </Button>
            </Center>
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <CardResumoPost post={post} />
              </Link>
            ))}
          </VStack>
        </Center>
      </Layout>

      <ModalPost
        disclosureProps={modalPostDisclosure}
        refresh={getPosts}
        insert
      />
    </>
  );
};

export default Home;
