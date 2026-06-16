'use client'

import { useState } from 'react'
import {
  Container,
  VStack,
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Icon,
} from '@chakra-ui/react'
import { FaDownload } from 'react-icons/fa'

interface Statement {
  id: string
  date: string
  description: string
  type: 'credit' | 'debit'
  amount: number
  balance: number
}

export default function StatementPage() {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [statementType, setStatementType] = useState('all')

  const statements: Statement[] = [
    {
      id: '1',
      date: '2024-01-20',
      description: 'Fund wallet via bank transfer',
      type: 'credit',
      amount: 50000,
      balance: 250000,
    },
    {
      id: '2',
      date: '2024-01-18',
      description: 'Transfer to John Doe',
      type: 'debit',
      amount: 25000,
      balance: 200000,
    },
    {
      id: '3',
      date: '2024-01-15',
      description: 'Withdrawal to GTB account',
      type: 'debit',
      amount: 10000,
      balance: 225000,
    },
    {
      id: '4',
      date: '2024-01-10',
      description: 'Loan repayment',
      type: 'debit',
      amount: 5000,
      balance: 235000,
    },
    {
      id: '5',
      date: '2024-01-05',
      description: 'Monthly savings deposit',
      type: 'credit',
      amount: 15000,
      balance: 240000,
    },
  ]

  const handleExportPDF = () => {
    console.log('Export as PDF')
  }

  const handleExportCSV = () => {
    console.log('Export as CSV')
  }

  return (
    <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="lg" color="gray.800">
            Account Statement
          </Heading>
          <Text color="gray.600" mt={2}>
            View your transaction history
          </Text>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <VStack spacing={6} align="stretch">
            <Heading as="h3" size="sm" color="gray.700">
              Filter Statement
            </Heading>

            <HStack spacing={4} flexWrap="wrap">
              <FormControl flex={1} minW="200px">
                <FormLabel fontSize="sm" color="gray.700">
                  From Date
                </FormLabel>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl flex={1} minW="200px">
                <FormLabel fontSize="sm" color="gray.700">
                  To Date
                </FormLabel>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl flex={1} minW="200px">
                <FormLabel fontSize="sm" color="gray.700">
                  Transaction Type
                </FormLabel>
                <Select
                  value={statementType}
                  onChange={(e) => setStatementType(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                >
                  <option value="all">All Transactions</option>
                  <option value="credit">Credit Only</option>
                  <option value="debit">Debit Only</option>
                </Select>
              </FormControl>
            </HStack>
          </VStack>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <VStack spacing={4} align="stretch" mb={6}>
            <HStack justify="space-between">
              <Heading as="h3" size="sm" color="gray.700">
                Transactions
              </Heading>
              <HStack spacing={2}>
                <Button
                  size="sm"
                  leftIcon={<Icon as={FaDownload} />}
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  onClick={handleExportPDF}
                >
                  PDF
                </Button>
                <Button
                  size="sm"
                  leftIcon={<Icon as={FaDownload} />}
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  onClick={handleExportCSV}
                >
                  CSV
                </Button>
              </HStack>
            </HStack>
          </VStack>

          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr bg="gray.50">
                  <Th color="gray.700">Date</Th>
                  <Th color="gray.700">Description</Th>
                  <Th color="gray.700">Type</Th>
                  <Th color="gray.700">Amount</Th>
                  <Th color="gray.700">Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {statements.map((stmt) => (
                  <Tr key={stmt.id} borderBottomColor="gray.100">
                    <Td fontSize="sm">{stmt.date}</Td>
                    <Td>
                      <Text fontSize="sm">{stmt.description}</Text>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={stmt.type === 'credit' ? 'green' : 'red'}
                        variant="subtle"
                        textTransform="capitalize"
                      >
                        {stmt.type}
                      </Badge>
                    </Td>
                    <Td>
                      <Text
                        fontWeight="600"
                        color={
                          stmt.type === 'credit' ? 'green.600' : 'red.600'
                        }
                      >
                        {stmt.type === 'credit' ? '+' : '-'}₦
                        {stmt.amount.toLocaleString()}
                      </Text>
                    </Td>
                    <Td fontWeight="600" color="primary.600">
                      ₦{stmt.balance.toLocaleString()}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>
    </Container>
  )
}
