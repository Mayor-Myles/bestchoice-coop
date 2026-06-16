'use client'

import { useState } from 'react'
import {
  Container,
  VStack,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react'

export default function TransferPage() {
  const [recipientType, setRecipientType] = useState('member')
  const [recipientIdentifier, setRecipientIdentifier] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recipientIdentifier || !amount) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
      })
      return
    }

    if (parseFloat(amount) <= 0) {
      toast({
        title: 'Error',
        description: 'Amount must be greater than 0',
        status: 'error',
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: 'Success',
        description: `₦${parseFloat(amount).toLocaleString()} transferred successfully`,
        status: 'success',
      })

      // Reset form
      setRecipientIdentifier('')
      setAmount('')
      setDescription('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Transfer failed. Please try again.',
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="md" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="lg" color="gray.800">
            Transfer Funds
          </Heading>
          <Text color="gray.600" mt={2}>
            Send money to another member
          </Text>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <VStack as="form" spacing={6} onSubmit={handleTransfer}>
            <FormControl isRequired>
              <FormLabel color="gray.700" fontWeight="600">
                Send To
              </FormLabel>
              <Select
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value)}
                borderColor="primary.200"
                _focus={{ borderColor: 'primary.500' }}
              >
                <option value="member">Member Account</option>
                <option value="bank">Bank Account</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.700" fontWeight="600">
                {recipientType === 'member'
                  ? 'Member ID/Email'
                  : 'Account Number'}
              </FormLabel>
              <Input
                type="text"
                placeholder={
                  recipientType === 'member'
                    ? 'Enter member ID or email'
                    : 'Enter account number'
                }
                value={recipientIdentifier}
                onChange={(e) => setRecipientIdentifier(e.target.value)}
                borderColor="primary.200"
                _focus={{ borderColor: 'primary.500' }}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.700" fontWeight="600">
                Amount (₦)
              </FormLabel>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                borderColor="primary.200"
                _focus={{ borderColor: 'primary.500' }}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.700" fontWeight="600">
                Description (Optional)
              </FormLabel>
              <Input
                type="text"
                placeholder="Purpose of transfer"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                borderColor="primary.200"
                _focus={{ borderColor: 'primary.500' }}
                isDisabled={loading}
              />
            </FormControl>

            <Box
              bg="yellow.50"
              p={4}
              borderRadius="md"
              borderLeftWidth={4}
              borderLeftColor="yellow.500"
            >
              <Text fontSize="sm" color="yellow.900">
                <strong>Note:</strong> Transfers are processed immediately and
                cannot be reversed.
              </Text>
            </Box>

            <Button
              w="100%"
              bg="primary.500"
              color="white"
              _hover={{ bg: 'primary.600' }}
              size="lg"
              isLoading={loading}
              type="submit"
            >
              Proceed to Transfer
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
