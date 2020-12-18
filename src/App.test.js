import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

test('renders without crashing', () => {
  const { getByText } = render(<App />)
  getByText(/speech recognition not available in this browser/i)
})
