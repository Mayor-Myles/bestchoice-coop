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
  useToast,
  HStack,
  Select,
} from '@chakra-ui/react'

export default function WithdrawPage() {
  const [amount, setAmount] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !bankAccount || !bankCode) {
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
        description: `Withdrawal request for ₦${parseFloat(amount).toLocaleString()} submitted`,
        status: 'success',
      })

      setAmount('')
      setBankAccount('')
      setBankCode('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Withdrawal failed. Please try again.',
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
            Withdraw Funds
          </Heading>
          <Text color="gray.600" mt={2}>
            Withdraw to your bank account
          </Text>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <VStack as="form" spacing={6} onSubmit={handleWithdraw}>
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
              <Text fontSize="xs" color="gray.500" mt={1}>
                Available Balance: ₦50,000
              </Text>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.700" fontWeight="600">
                Bank Name
              </FormLabel>
              <Select
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                placeholder="Select your bank"
                borderColor="primary.200"
                _focus={{ borderColor: 'primary.500' }}
                isDisabled={loading}
              >
                <option value="001">Guaranty Trust Bank (GTB)</option>
                <option value="002">First Bank of Nigeria</option>
                <option value="003">United Bank for Africa (UBA)</option>
                <option value="004">Access Bank</option>
                <option value="005">Zenith Bank</option>
                <option value="006">Standard Chartered Bank</option>
                <option value="007">FCMB Group</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.700" fontWeight="600">
                Account Number
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter account number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                borderColor="primary.200"
                _focus={{ borderColor: 'primary.500' }}
                isDisabled={loading}
              />
            </FormControl>

            <Box
              bg="blue.50"
              p={4}
              borderRadius="md"
              borderLeftWidth={4}
              borderLeftColor="blue.500"
            >
              <Text fontSize="xs" color="blue.900">
                <strong>Processing Time:</strong> Withdrawals are processed within 1-3
                business days.
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
              Request Withdrawal
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
