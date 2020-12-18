import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import App from './App'

beforeEach(cleanup)

describe('without APIs', () => {
  test('renders', () => {
    const { getByText } = render(<App />)
    getByText(/speech recognition not available in this browser/i)
  })
})

describe('with APIs', () => {
  const { SpeechRecognition, SpeechGrammarList } = window
  const spyOnStart = jest.fn()

  beforeEach(() => {
    // save for cleanup
    window.SpeechGrammarList = function () {
      return {}
    }
    window.SpeechRecognition = function () {
      return {
        start: spyOnStart
      }
    }
  })

  afterEach(() => {
    // cleanup
    window.SpeechGrammarList = SpeechGrammarList
    window.SpeechRecognition = SpeechRecognition
  })

  test('renders', () => {
    // render the application
    const { getByText } = render(<App />)
    getByText('Press Button and Speak')

    const button = getByText('Press to Talk')
    fireEvent.click(button)
    expect(spyOnStart).toBeCalled()
  })
})
