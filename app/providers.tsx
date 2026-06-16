'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e0f0ff',
      100: '#b3d9ff',
      200: '#80c0ff',
      300: '#4da7ff',
      400: '#2694ff',
      500: '#1e82e6',
      600: '#1565c0',
      700: '#0d47a1',
      800: '#082a68',
      900: '#051449',
    },
    dodgerBlue: '#1E90FF',
  },
  semanticTokens: {
    colors: {
      'primary.main': { _light: 'primary.500', _dark: 'primary.400' },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
