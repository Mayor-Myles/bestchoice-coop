'use client'

import {
  Container,
  VStack,
  Grid,
  GridItem,
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import WalletCard from '@/components/WalletCard'
import RecentTransactions from '@/components/RecentTransactions'
import { FaWallet, FaExchangeAlt, FaDownload, FaLandmark } from 'react-icons/fa'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'transfer'
  amount: number
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

export default function DashboardPage() {
  const router = useRouter()
  const toast = useToast()

  const walletNumber = 'BC-1234567890'
  const bankName = 'BestChoice Coop Bank'
  const balance = 250000

  const quickStats = [
    {
      label: 'Total Balance',
      value: '₦250,000',
      icon: FaWallet,
      color: 'blue',
    },
    {
      label: 'Active Loans',
      value: '1',
      icon: FaLandmark,
      color: 'purple',
    },
    {
      label: 'This Month',
      value: '₦75,000',
      icon: FaExchangeAlt,
      color: 'teal',
    },
    {
      label: 'Pending',
      value: '₦10,000',
      icon: FaDownload,
      color: 'orange',
    },
  ]

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
  ]

  const quickActions = [
    {
      label: 'Transfer',
      icon: FaExchangeAlt,
      href: '/dashboard/transfer',
      color: 'primary',
    },
    {
      label: 'Withdraw',
      icon: FaDownload,
      href: '/dashboard/withdraw',
      color: 'primary',
    },
    {
      label: 'Apply Loan',
      icon: FaLandmark,
      href: '/dashboard/loans',
      color: 'primary',
    },
  ]

  return (
    <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading as="h1" size="2xl" color="gray.800">
            Welcome back, John! 👋
          </Heading>
          <Text color="gray.600" mt={2}>
            Here's your account overview
          </Text>
        </Box>

        {/* Quick Stats */}
        <Grid
          templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }}
          gap={4}
        >
          {quickStats.map((stat, idx) => (
            <GridItem key={idx}>
              <Box bg="white" p={4} borderRadius="lg" boxShadow="md">
                <HStack mb={3}>
                  <Icon
                    as={stat.icon}
                    color={`${stat.color}.500`}
                    fontSize="20px"
                  />
                  <Text fontSize="xs" color="gray.600" fontWeight="600">
                    {stat.label}
                  </Text>
                </HStack>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {stat.value}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>

        {/* Wallet and Quick Actions */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          <GridItem>
            <WalletCard
              walletNumber={walletNumber}
              bankName={bankName}
              balance={balance}
            />
          </GridItem>

          <GridItem>
            <VStack spacing={3}>
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  w="100%"
                  leftIcon={<Icon as={action.icon} />}
                  bg="white"
                  borderWidth="2px"
                  borderColor={`primary.500`}
                  color="primary.600"
                  _hover={{
                    bg: 'primary.50',
                    borderColor: 'primary.600',
                  }}
                  justifyContent="flex-start"
                  size="lg"
                  onClick={() => router.push(action.href)}
                >
                  {action.label}
                </Button>
              ))}
            </VStack>
          </GridItem>
        </Grid>

        {/* Recent Transactions */}
        <RecentTransactions transactions={recentTransactions} />

        {/* Announcements */}
        <Box bg="primary.50" p={6} borderRadius="lg" borderLeftWidth={4} borderLeftColor="primary.500">
          <Heading as="h3" size="sm" color="primary.700" mb={2}>
            📢 Important Notice
          </Heading>
          <Text color="primary.900" fontSize="sm">
            Our platform will undergo scheduled maintenance on Friday, January 26th from 2 AM to 4 AM GMT+1. During this time, services may be unavailable.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}
