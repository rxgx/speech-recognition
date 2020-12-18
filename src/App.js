import React, { useState } from 'react'
import './App.css'

function App (props) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList

  if (!SpeechRecognition || !SpeechGrammarList) {
    return (
      <div className='App'>
        <p>Speech recognition not available in this browser.</p>
      </div>
    )
  }

  const [hasSpeech, setHasSpeech] = useState(false)
  const [result, setResult] = useState('')

  const handleSpeechStartEvent = event => {
    setHasSpeech(true)
  }

  const handleSpeechEndEvent = event => {
    setHasSpeech(false)
  }

  const handleVoiceResultEvent = event => {
    const result = event.results[0][0].transcript
    setResult(result)
    // bg.style.backgroundColor = color;
  }

  const handleVoiceClickEvent = event => {
    recognition.start()
  }

  const recognition = new SpeechRecognition()
  const speechRecognitionList = new SpeechGrammarList()

  recognition.grammars = speechRecognitionList
  recognition.lang = 'en-US'
  recognition.onresult = handleVoiceResultEvent
  recognition.onspeechstart = handleSpeechStartEvent
  recognition.onspeechend = handleSpeechEndEvent

  return (
    <div className='App'>
      <div className='App-header'>
        <h2>Press Button and Speak</h2>
      </div>
      <p>
        <button onClick={handleVoiceClickEvent}>Press to Talk</button>
        Has Speech?
        <strong style={{ color: hasSpeech ? 'green' : 'red' }}>
          {hasSpeech ? 'Yes' : 'No'}
        </strong>
      </p>
      <p>
        <textarea rows='5' readOnly value={result} />
      </p>
    </div>
  )
}

export default App
