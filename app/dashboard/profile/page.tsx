'use client'

import { useState } from 'react'
import {
  VStack,
  Container,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  HStack,
  Avatar,
  useToast,
} from '@chakra-ui/react'
import { supabase } from '@/lib/supabaseClient'

export default function ProfilePage() {
  const [fullName, setFullName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const [phone, setPhone] = useState('+234 801 234 5678')
  const [address, setAddress] = useState('Lagos, Nigeria')
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const toast = useToast()

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        status: 'success',
      })
      setEditMode(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    toast({
      title: 'Info',
      description: 'Redirect to password change page',
      status: 'info',
    })
  }

  return (
    <Container maxW="md" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="lg" color="primary.600">
            My Profile
          </Heading>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <VStack spacing={6} align="stretch">
            <HStack justify="center" py={4}>
              <Avatar
                size="2xl"
                name={fullName}
                bg="primary.500"
                color="white"
              />
            </HStack>

            <VStack spacing={4}>
              <FormControl isReadOnly={!editMode}>
                <FormLabel color="gray.700" fontWeight="600">
                  Full Name
                </FormLabel>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isReadOnly={!editMode}>
                <FormLabel color="gray.700" fontWeight="600">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isReadOnly={!editMode}>
                <FormLabel color="gray.700" fontWeight="600">
                  Phone Number
                </FormLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isReadOnly={!editMode}>
                <FormLabel color="gray.700" fontWeight="600">
                  Address
                </FormLabel>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>
            </VStack>

            {editMode && (
              <HStack spacing={3} w="100%">
                <Button
                  variant="outline"
                  flex={1}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
                <Button
                  bg="primary.500"
                  color="white"
                  _hover={{ bg: 'primary.600' }}
                  flex={1}
                  isLoading={loading}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </HStack>
            )}

            {!editMode && (
              <Button
                w="100%"
                variant="outline"
                borderColor="primary.500"
                color="primary.500"
                _hover={{ bg: 'primary.50' }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </VStack>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <VStack spacing={4} align="stretch">
            <Heading as="h3" size="sm" color="gray.700">
              Account Settings
            </Heading>
            <Button
              variant="outline"
              borderColor="primary.500"
              color="primary.500"
              _hover={{ bg: 'primary.50' }}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </VStack>
        </Box>

        <Box
          bg="red.50"
          p={4}
          borderRadius="md"
          borderLeftWidth={4}
          borderLeftColor="red.500"
        >
          <Text fontSize="sm" color="red.900">
            <strong>Danger Zone:</strong> Contact support to deactivate your account
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}
