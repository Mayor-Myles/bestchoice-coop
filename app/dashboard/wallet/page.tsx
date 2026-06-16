'use client'

import {
  Container,
  VStack,
  Box,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react'
import WalletCard from '@/components/WalletCard'
import RecentTransactions from '@/components/RecentTransactions'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'transfer'
  amount: number
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

export default function WalletPage() {
  const walletNumber = 'BC-1234567890'
  const bankName = 'BestChoice Coop Bank'
  const balance = 250000

  const recentTransactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'deposit',
      amount: 50000,
      description: 'Fund wallet via bank transfer',
      date: '2024-01-20',
      status: 'completed',
    },
    {
      id: 'TXN002',
      type: 'transfer',
      amount: 25000,
      description: 'Transfer to John Doe',
      date: '2024-01-18',
      status: 'completed',
    },
    {
      id: 'TXN003',
      type: 'withdrawal',
      amount: 10000,
      description: 'Withdrawal to GTB account',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 'TXN004',
      type: 'transfer',
      amount: 5000,
      description: 'Loan repayment',
      date: '2024-01-10',
      status: 'completed',
    },
  ]

  return (
    <Container maxW="4xl" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.600">
            Account Overview
          </Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <WalletCard
              walletNumber={walletNumber}
              bankName={bankName}
              balance={balance}
            />
          </GridItem>

          <GridItem bg="white" p={6} borderRadius="lg" boxShadow="md">
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Wallet Statistics
                </Text>
              </Box>

              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Total Deposits
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">
                    ₦500,000
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Total Withdrawals
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="red.600">
                    -₦150,000
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Total Transfers
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    ₦100,000
                  </Text>
                </Box>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>

        <RecentTransactions transactions={recentTransactions} />
      </VStack>
    </Container>
  )
}
