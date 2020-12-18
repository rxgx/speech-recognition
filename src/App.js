import React, { useState } from 'react'
import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList

const speechRecognitionList = new SpeechGrammarList()

function App (props) {
  const [hasSpeech, setHasSpeech] = useState(false)
  const [result, setResult] = useState('')

  const recognition = new SpeechRecognition()
  recognition.grammars = speechRecognitionList
  recognition.lang = 'en-US'
  recognition.onresult = this.handleVoiceResultEvent
  recognition.onspeechstart = this.handleSpeechStartEvent
  recognition.onspeechend = this.handleSpeechEndEvent

  console.log('created recognition')

  const handleSpeechStartEvent = event => {
    this.setState({ hasSpeech: true })
  }

  const handleSpeechEndEvent = event => {
    this.setState({ hasSpeech: false })
  }

  const handleVoiceResultEvent = event => {
    console.log('results', event.results)
    const result = event.results[0][0].transcript
    setResult(result)
    // bg.style.backgroundColor = color;
  }

  const handleVoiceClickEvent = event => {
    recognition.start()
    console.log('Ready to receive a command')
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <h2>Press Button and Speak</h2>
      </div>
      <p>
        <button onClick={this.handleVoiceClickEvent}>Press to Talk</button>
        Has Speech?
        <strong style={{ color: this.state.hasSpeech ? 'green' : 'red' }}>
          {this.state.hasSpeech ? 'Yes' : 'No'}
        </strong>
      </p>
      <p>
        <textarea rows='5' value={this.state.result} />
      </p>
    </div>
  )
}

export default App
