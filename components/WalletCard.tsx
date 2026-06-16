'use client'

import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  useModal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  useToast,
  useState as useReactState,
} from '@chakra-ui/react'
import { FaPlus, FaWallet } from 'react-icons/fa'

interface WalletCardProps {
  walletNumber: string
  bankName: string
  balance: number
}

export default function WalletCard({ walletNumber, bankName, balance }: WalletCardProps) {
  const { isOpen, onOpen, onClose } = useModal()
  const [amount, setAmount] = useReactState('')
  const toast = useToast()

  const handleAddFunds = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid amount',
        status: 'error',
        duration: 2000,
      })
      return
    }

    toast({
      title: 'Success',
      description: `₦${amount} added to your wallet`,
      status: 'success',
      duration: 2000,
    })
    setAmount('')
    onClose()
  }

  return (
    <>
      <Box
        bg="linear-gradient(135deg, #1E90FF 0%, #1565c0 100%)"
        p={8}
        borderRadius="lg"
        color="white"
        boxShadow="lg"
      >
        <VStack spacing={6} align="flex-start">
          <HStack>
            <Icon as={FaWallet} fontSize="24px" />
            <Heading as="h3" size="md">
              My Wallet
            </Heading>
          </HStack>

          <VStack spacing={4} w="100%">
            <Box w="100%">
              <Text fontSize="sm" opacity={0.9}>
                Wallet Number
              </Text>
              <Text fontSize="xl" fontWeight="bold" fontFamily="monospace">
                {walletNumber}
              </Text>
            </Box>

            <Box w="100%">
              <Text fontSize="sm" opacity={0.9}>
                Bank Name
              </Text>
              <Text fontSize="lg" fontWeight="600">
                {bankName}
              </Text>
            </Box>

            <Box w="100%" pt={4} borderTopWidth="1px" borderTopColor="rgba(255,255,255,0.2)">
              <Text fontSize="sm" opacity={0.9}>
                Available Balance
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                ₦{balance.toLocaleString()}
              </Text>
            </Box>
          </VStack>

          <Button
            leftIcon={<Icon as={FaPlus} />}
            bg="white"
            color="primary.600"
            _hover={{ bg: 'gray.100' }}
            fontWeight="600"
            w="100%"
            onClick={onOpen}
          >
            Add Funds
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="primary.600">Add Funds to Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box w="100%">
                <Text fontSize="sm" fontWeight="600" color="gray.700" mb={2}>
                  Amount (₦)
                </Text>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  borderColor="primary.200"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </Box>
              <Text fontSize="xs" color="gray.600">
                You will be redirected to payment gateway
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button bg="primary.500" color="white" onClick={handleAddFunds}>
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
