'use client'

import { useState } from 'react'
import {
  Container,
  VStack,
  Box,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'

interface Loan {
  id: string
  amount: number
  purpose: string
  disbursedDate: string
  dueDate: string
  status: 'active' | 'completed' | 'defaulted'
  interestRate: number
  amountPaid: number
}

export default function LoansPage() {
  const [loans] = useState<Loan[]>([
    {
      id: 'LOAN001',
      amount: 100000,
      purpose: 'Business expansion',
      disbursedDate: '2024-01-15',
      dueDate: '2025-01-15',
      status: 'active',
      interestRate: 12,
      amountPaid: 25000,
    },
    {
      id: 'LOAN002',
      amount: 50000,
      purpose: 'Personal use',
      disbursedDate: '2023-06-20',
      dueDate: '2024-06-20',
      status: 'completed',
      interestRate: 10,
      amountPaid: 50000,
    },
  ])

  const toast = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'blue'
      case 'completed':
        return 'green'
      case 'defaulted':
        return 'red'
      default:
        return 'gray'
    }
  }

  const handleApplyLoan = () => {
    toast({
      title: 'Coming Soon',
      description: 'Loan application form will be available soon',
      status: 'info',
    })
  }

  return (
    <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between" align="flex-start">
          <Box>
            <Heading as="h1" size="lg" color="gray.800">
              My Loans
            </Heading>
            <Text color="gray.600" mt={2}>
              View and manage your loan accounts
            </Text>
          </Box>
          <Button
            leftIcon={<Icon as={FaPlus} />}
            bg="primary.500"
            color="white"
            _hover={{ bg: 'primary.600' }}
            onClick={handleApplyLoan}
          >
            Apply for Loan
          </Button>
        </HStack>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          {loans.length === 0 ? (
            <VStack spacing={4} py={8}>
              <Text color="gray.500">No loans yet</Text>
              <Button
                size="sm"
                bg="primary.500"
                color="white"
                onClick={handleApplyLoan}
              >
                Apply for your first loan
              </Button>
            </VStack>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr bg="gray.50">
                    <Th color="gray.700">Loan ID</Th>
                    <Th color="gray.700">Amount</Th>
                    <Th color="gray.700">Purpose</Th>
                    <Th color="gray.700">Disbursed</Th>
                    <Th color="gray.700">Due Date</Th>
                    <Th color="gray.700">Paid</Th>
                    <Th color="gray.700">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loans.map((loan) => (
                    <Tr key={loan.id} borderBottomColor="gray.100">
                      <Td fontWeight="600" color="primary.600">
                        {loan.id}
                      </Td>
                      <Td>₦{loan.amount.toLocaleString()}</Td>
                      <Td>
                        <Text fontSize="sm">{loan.purpose}</Text>
                      </Td>
                      <Td fontSize="sm">{loan.disbursedDate}</Td>
                      <Td fontSize="sm">{loan.dueDate}</Td>
                      <Td>
                        <Text fontSize="sm" color="green.600">
                          ₦{loan.amountPaid.toLocaleString()}
                        </Text>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={getStatusColor(loan.status)}
                          variant="subtle"
                          textTransform="capitalize"
                        >
                          {loan.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>

        <Box bg="primary.50" p={6} borderRadius="lg">
          <Heading as="h3" size="sm" color="primary.700" mb={3}>
            Loan Information
          </Heading>
          <VStack spacing={2} align="flex-start" fontSize="sm">
            <Text>
              <strong>Interest Rate:</strong> Varies from 8-15% depending on loan
              amount
            </Text>
            <Text>
              <strong>Tenure:</strong> 6-24 months repayment period available
            </Text>
            <Text>
              <strong>Eligibility:</strong> Minimum 3 months membership required
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
