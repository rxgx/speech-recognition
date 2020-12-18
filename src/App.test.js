import { render, screen } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const { getByText } = render(<App />)
  getByText('Press Button and Speak')
  getByText('Press to Talk')
})
