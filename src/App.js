import React, {Component} from 'react';
import './App.css';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

const speechRecognitionList = new SpeechGrammarList();

class App extends Component {
  state = {
    hasSpeech: false,
    result: ''
  };

  constructor(props) {
    super();
    this.recognition = new SpeechRecognition();
    this.recognition.grammars = speechRecognitionList;
    this.recognition.lang = 'en-US';
    this.recognition.onresult = this.handleVoiceResultEvent;
    this.recognition.onspeechstart = this.handleSpeechStartEvent;
    this.recognition.onspeechend = this.handleSpeechEndEvent;

    console.log('created recognition');
  }

  handleSpeechStartEvent = event => {
    this.setState({hasSpeech: true});
  };

  handleSpeechEndEvent = event => {
    this.setState({hasSpeech: false});
  };

  handleVoiceResultEvent = event => {
    console.log('results', event.results);
    const result = event.results[0][0].transcript;
    this.setState({result});
    // bg.style.backgroundColor = color;
  };

  handleVoiceClickEvent = event => {
    this.recognition.start();
    console.log('Ready to receive a command');
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Press Button and Speak</h2>
        </div>
        <p>
          <button onClick={this.handleVoiceClickEvent}>Press to Talk</button>
          Has Speech?
          <strong style={{color: this.state.hasSpeech ? 'green' : 'red'}}>
            {this.state.hasSpeech ? 'Yes' : 'No'}
          </strong>
        </p>
        <p>
          <textarea rows="5" value={this.state.result} />
        </p>
      </div>
    );
  }
}

export default App;
