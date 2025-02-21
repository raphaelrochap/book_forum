import { api } from "@/api/api";
import CardPostCompleto from "@/components/CardPostCompleto";
import Layout from "@/components/Layout";
import useBookForumStore from "@/store/store";
import { Post } from "@/types/entities";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRouter as useRouterNavigation } from "next/navigation";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter()
  const routerNav = useRouterNavigation()
  const { id } = router.query
  const [post, setPost] = useState<Post>({})
  const { bearerToken } = useBookForumStore()  

  const getPost = async () => {
    if (!bearerToken) return
    const response = await api(bearerToken).get(`posts/${id}`)

    if (response.status == 200)
      setPost(response.data)
  }

  const SessionCheck = () => {
    const token = localStorage.getItem("book-forum-storage")
    const user = JSON.parse(String(token));
    
    if(!user?.state?.bearerToken)
      routerNav.push('/login')
  }

  useEffect(() => {    
    SessionCheck()

    const patchPostViewed = async () => {      
      if (!bearerToken) return
      if (id)
        await api(bearerToken).patch(`posts/viewed/${id}`)
    }

    patchPostViewed()
    getPost()            
  }, [bearerToken, id, router])

  return (
    <>
      <Layout>
        <Center>
          <CardPostCompleto post={post} refresh={getPost} />
        </Center>
      </Layout>
    </>
  );
}

export default PostPage