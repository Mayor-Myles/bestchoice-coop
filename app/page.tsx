'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, VStack, Heading, Text, Button, HStack, Icon, Spinner } from '@chakra-ui/react'
import { FaArrowRight, FaShieldAlt, FaMoneyBillWave, FaHandshake } from 'react-icons/fa'
import { supabase } from '@/lib/supabaseClient'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setIsAuthenticated(true)
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="lg" color="primary.500" />
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #e0f0ff 0%, #80c0ff 100%)">
      {/* Navigation */}
      <Box bg="white" boxShadow="sm" py={4}>
        <Container maxW="6xl">
          <HStack justify="space-between">
            <Heading as="h1" size="lg" color="primary.600">
              BestChoice Coop
            </Heading>
            <HStack spacing={4}>
              <Button
                variant="ghost"
                color="primary.600"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxW="6xl" py={16}>
        <VStack spacing={12} align="stretch">
          <VStack spacing={6} textAlign="center">
            <Heading as="h2" size="3xl" color="primary.900">
              Welcome to BestChoice Cooperative Society
            </Heading>
            <Text fontSize="xl" color="primary.800" maxW="2xl" mx="auto">
              Your trusted partner for financial services. Save, borrow, and grow your wealth with us.
            </Text>
            <HStack spacing={4} justify="center" pt={4}>
              <Button
                bg="primary.500"
                color="white"
                size="lg"
                rightIcon={<Icon as={FaArrowRight} />}
                _hover={{ bg: 'primary.600' }}
                onClick={() => router.push('/signup')}
              >
                Get Started
              </Button>
              <Button
                bg="white"
                color="primary.600"
                size="lg"
                borderWidth="2px"
                borderColor="primary.600"
                _hover={{ bg: 'primary.50' }}
              >
                Learn More
              </Button>
            </HStack>
          </VStack>

          {/* Features */}
          <VStack spacing={8} pt={8}>
            <Heading as="h3" size="lg" color="primary.900">
              Why Choose Us?
            </Heading>
            <HStack spacing={6} align="stretch" flexWrap="wrap" justify="center">
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                maxW="280px"
                flex={1}
              >
                <Icon as={FaMoneyBillWave} fontSize="40px" color="primary.500" mb={4} />
                <Heading as="h4" size="md" mb={2} color="gray.800">
                  Flexible Loans
                </Heading>
                <Text color="gray.600">
                  Access quick and flexible loans with competitive interest rates.
                </Text>
              </Box>

              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                maxW="280px"
                flex={1}
              >
                <Icon as={FaShieldAlt} fontSize="40px" color="primary.500" mb={4} />
                <Heading as="h4" size="md" mb={2} color="gray.800">
                  Secure Platform
                </Heading>
                <Text color="gray.600">
                  Your funds and personal data are protected with industry-leading security.
                </Text>
              </Box>

              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                maxW="280px"
                flex={1}
              >
                <Icon as={FaHandshake} fontSize="40px" color="primary.500" mb={4} />
                <Heading as="h4" size="md" mb={2} color="gray.800">
                  Community First
                </Heading>
                <Text color="gray.600">
                  Join a community committed to mutual financial growth and support.
                </Text>
              </Box>
            </HStack>
          </VStack>

          {/* CTA Section */}
          <Box bg="white" p={8} borderRadius="lg" boxShadow="xl" textAlign="center">
            <Heading as="h3" size="lg" mb={4} color="primary.700">
              Ready to Transform Your Financial Future?
            </Heading>
            <Text color="gray.600" mb={6} fontSize="lg">
              Join thousands of members already managing their finances with BestChoice Coop.
            </Text>
            <Button
              bg="primary.500"
              color="white"
              size="lg"
              rightIcon={<Icon as={FaArrowRight} />}
              _hover={{ bg: 'primary.600' }}
              onClick={() => router.push('/signup')}
            >
              Create Your Account Now
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
