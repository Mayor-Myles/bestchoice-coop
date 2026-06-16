'use client'

import { HStack, Box } from '@chakra-ui/react'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HStack align="stretch" minH="100vh" spacing={0}>
      <DashboardSidebar />
      <Box flex={1} overflowY="auto">
        {children}
      </Box>
    </HStack>
  )
}
