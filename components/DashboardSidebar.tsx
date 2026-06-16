'use client'

import {
  VStack,
  Box,
  Button,
  Heading,
  Divider,
  useToast,
  Text,
  Icon,
} from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { FaHome, FaWallet, FaExchangeAlt, FaDownload, FaFileAlt, FaUser, FaSignOutAlt, FaLandmark } from 'react-icons/fa'

const menuItems = [
  { label: 'Overview', href: '/dashboard', icon: FaHome },
  { label: 'Wallet', href: '/dashboard/wallet', icon: FaWallet },
  { label: 'Loans', href: '/dashboard/loans', icon: FaLandmark },
  { label: 'Transfer', href: '/dashboard/transfer', icon: FaExchangeAlt },
  { label: 'Withdraw', href: '/dashboard/withdraw', icon: FaDownload },
  { label: 'Statement', href: '/dashboard/statement', icon: FaFileAlt },
  { label: 'Profile', href: '/dashboard/profile', icon: FaUser },
]

export default function DashboardSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const toast = useToast()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 2000,
      })
      router.push('/login')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
      })
    }
  }

  return (
    <Box
      w={{ base: '80px', md: '250px' }}
      bg="primary.600"
      color="white"
      p={{ base: 2, md: 6 }}
      minH="100vh"
      overflowY="auto"
    >
      <VStack spacing={{ base: 4, md: 8 }} align="stretch">
        <Heading
          as="h1"
          size={{ base: 'sm', md: 'lg' }}
          textAlign="center"
          display={{ base: 'none', md: 'block' }}
        >
          BestChoice
        </Heading>
        
        <Divider display={{ base: 'none', md: 'block' }} borderColor="primary.400" />

        <VStack spacing={2} align="stretch">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              as="a"
              href={item.href}
              leftIcon={<Icon as={item.icon} />}
              justifyContent={{ base: 'center', md: 'flex-start' }}
              variant={pathname === item.href ? 'solid' : 'ghost'}
              bg={pathname === item.href ? 'primary.500' : 'transparent'}
              _hover={{
                bg: pathname === item.href ? 'primary.500' : 'primary.500',
                opacity: 0.8,
              }}
              color="white"
              textAlign="left"
              onClick={(e) => {
                e.preventDefault()
                router.push(item.href)
              }}
              display="flex"
              fontSize={{ base: 'xs', md: 'sm' }}
              h={{ base: '40px', md: '40px' }}
            >
              <Text display={{ base: 'none', md: 'block' }}>{item.label}</Text>
            </Button>
          ))}
        </VStack>

        <Divider display={{ base: 'none', md: 'block' }} borderColor="primary.400" />

        <Button
          w="100%"
          leftIcon={<Icon as={FaSignOutAlt} />}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          variant="ghost"
          _hover={{ bg: 'primary.500' }}
          color="white"
          onClick={handleLogout}
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          <Text display={{ base: 'none', md: 'block' }}>Logout</Text>
        </Button>
      </VStack>
    </Box>
  )
}
