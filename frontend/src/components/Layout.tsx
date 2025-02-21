import { Titulo } from "@/components/Titulo"
import useBookForumStore from "@/store/store"
import { Box, Button, Center, Container, HStack, Spacer, useToast, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { FaPowerOff } from "react-icons/fa"
interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const toast = useToast()
  const { bearerToken, setBearerToken, setUser } = useBookForumStore()
  
  const handleSairClick = () => {
    setBearerToken("")
    setUser(undefined)
    
    router.push('login')
  }

  return (
    <>
      <Container minHeight="100vh" w="100vw">
        <VStack w="full" >
          <HStack  bgColor={'blue.600'} w='100vw' h={'100px'}>
              <Center pl='135px' w='full'>
                <Titulo title="Book Fórum" />
              </Center>
              <Spacer />
            {bearerToken && <Button mr='40px' leftIcon={<FaPowerOff  />} onClick={handleSairClick}>Sair</Button>}
          </HStack>
          <Spacer />
          <Box w='100vw' pb='20px'>
            {children}
          </Box>
        </VStack>
      </Container>
    </>
  )
}

export default Layout
