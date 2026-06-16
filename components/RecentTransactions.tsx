'use client'

import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  Text,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { FaArrowDown, FaArrowUp, FaExchangeAlt } from 'react-icons/fa'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'transfer'
  amount: number
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'pending':
        return 'yellow'
      case 'failed':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return FaArrowDown
      case 'withdrawal':
        return FaArrowUp
      case 'transfer':
        return FaExchangeAlt
      default:
        return FaExchangeAlt
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'green'
      case 'withdrawal':
        return 'red'
      case 'transfer':
        return 'blue'
      default:
        return 'gray'
    }
  }

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h3" size="md" mb={6} color="primary.600">
        Recent Transactions
      </Heading>

      {transactions.length === 0 ? (
        <VStack spacing={4} py={8}>
          <Text color="gray.500" fontSize="sm">
            No transactions yet
          </Text>
        </VStack>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr bg="gray.50">
                <Th color="gray.700">Type</Th>
                <Th color="gray.700">Description</Th>
                <Th color="gray.700">Amount</Th>
                <Th color="gray.700">Date</Th>
                <Th color="gray.700">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((txn) => (
                <Tr key={txn.id} borderBottomColor="gray.100">
                  <Td>
                    <HStack spacing={2}>
                      <Icon
                        as={getTypeIcon(txn.type)}
                        color={`${getTypeColor(txn.type)}.500`}
                      />
                      <Text fontSize="sm" textTransform="capitalize">
                        {txn.type}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{txn.description}</Text>
                  </Td>
                  <Td>
                    <Text
                      fontWeight="600"
                      color={txn.type === 'deposit' ? 'green.600' : 'red.600'}
                    >
                      {txn.type === 'deposit' ? '+' : '-'}₦{txn.amount.toLocaleString()}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{txn.date}</Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={getStatusColor(txn.status)}
                      variant="subtle"
                      textTransform="capitalize"
                    >
                      {txn.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  )
}
