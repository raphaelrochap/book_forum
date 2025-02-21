import Layout from "@/components/Layout"
import { Button, Center, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react';
import { api } from './../api/api'
import useBookForumStore from "@/store/store";
import { AxiosError } from "axios";

const Login = () => {
  const router = useRouter()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const { setBearerToken, setUser } = useBookForumStore()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const response = await postLogin(email, password)

    if (response && response.status == 200) {
      setBearerToken(response.data.access_token)
      setUser(response.data.user)
      toast({
        title: 'Seja bem vindo ao Book Fórum :D',
        status: 'success',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })

      router.push('/')
    }
  }

  const postLogin = async (email: string, password: string) => {
    const payload = { email, password }

    try {      
      return await api('').post('/auth/login', payload)
    }
    
    catch (err) {
      const error = err as AxiosError<{ message: string }>

      toast({
        title: 'Ops... :/',
        description: error.response?.data.message,
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Layout>
        <Center>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel textAlign={'center'}>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} size={'lg'} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel textAlign={'center'}>Senha</FormLabel>
              <Input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" size={'lg'} />
            </FormControl>

            <Center pt='15px'>
              <Button type="submit">Entrar</Button>
            </Center>
          </form>
        </Center>
      </Layout>
    </>
  )
}

export default Login
