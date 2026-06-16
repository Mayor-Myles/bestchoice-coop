'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Input,
  Button,
  Text,
  useToast,
  Spinner,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Logged in successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/dashboard')
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #e0f0ff 0%, #80c0ff 100%)" py={10}>
      <Container maxW="sm">
        <VStack spacing={6} py={20}>
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            color="primary.700"
          >
            BestChoice Coop
          </Heading>
          
          <Box
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
            w="100%"
          >
            <VStack as="form" spacing={4} onSubmit={handleLogin}>
              <Heading as="h2" size="lg" textAlign="center" color="primary.600">
                Login
              </Heading>

              <VStack spacing={1} w="100%">
                <Text fontSize="sm" fontWeight="600" color="gray.700" alignSelf="flex-start">
                  Email
                </Text>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px #1E90FF' }}
                  disabled={loading}
                />
              </VStack>

              <VStack spacing={1} w="100%">
                <Text fontSize="sm" fontWeight="600" color="gray.700" alignSelf="flex-start">
                  Password
                </Text>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderColor="primary.200"
                    _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px #1E90FF' }}
                    disabled={loading}
                  />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      fontSize="xs"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>

              <Button
                w="100%"
                mt={6}
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                isDisabled={loading}
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : 'Login'}
              </Button>
            </VStack>

            <Text textAlign="center" mt={4} fontSize="sm">
              Don't have an account?{' '}
              <Text
                as="span"
                color="primary.500"
                cursor="pointer"
                fontWeight="600"
                onClick={() => router.push('/signup')}
                _hover={{ textDecoration: 'underline' }}
              >
                Sign up
              </Text>
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
