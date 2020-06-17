import React, { Component } from 'react';
import './App.css';
import Letter from './Letter';

const LETTERS = "A,B,C,D,E,F,G,H,I,J,K,L,M,O,P,Q,R,S,T,U,V,W,X,Y,Z"
export default class App extends Component {
  state = {
    hiddenWord: "github".toUpperCase(),
    letters: this.generateLetters(),
    inputLetters: [],
    tries: 0,
    displayWord: "",
  }

  generateLetters() {
    return LETTERS.split(',')
  }

  handleClickLetter = (letter) => {
    const { inputLetters, tries } = this.state
    // Pour les lettres non rentrées
    if (tries + 1 < 10) {
      if (!inputLetters.includes(letter)) {
        this.setState({
          inputLetters: [...inputLetters, ...letter],
          tries: tries + 1,
        },
          () => this.upadateDisplayedWord(),
          () => this.displayPendu())
      }
    } else {
      alert('Vous avez perdu !')
      this.resetGame()
    }
  }

  getFeedbackForLetter(letter) {
    const { inputLetters, hiddenWord: word } = this.state
    if (inputLetters.includes(letter)) {
      if (word.includes(letter)) return 'correct'
      return 'incorrect'
    }
    return 'normal'
  }

  upadateDisplayedWord() {
    const { hiddenWord, inputLetters } = this.state
    let word = ""

    for (var i = 0; i < (hiddenWord.length); i++) {
      (inputLetters.includes(hiddenWord[i])) ? word += hiddenWord[i] : word += "_"
    }
    this.setState({ displayWord: word })
  }

  resetGame = () => {
    this.setState({
      inputLetters: [],
      tries: 0,
      displayWord: "",
    })
  }

  handleKeyDown = (event) => {
    if (this.state.letters.includes(event.key.toUpperCase())) this.handleClickLetter(event.key.toUpperCase())
  }

  componentDidMount() {
    this.upadateDisplayedWord()
    document.addEventListener("keydown", this.handleKeyDown)
  }

  render() {
    const { letters, tries, displayWord } = this.state
    return (
      <div className="pendu">
        <div className="word">{displayWord}</div>

        <div className="howToPlay">Cliquez sur les lettres ou tapez directement au claver</div>

        {letters.map((letter, index) => (
          <Letter
            letter={letter}
            feedback={this.getFeedbackForLetter(letter)}
            key={index}
            onClick={this.handleClickLetter}
          />
        ))}
        <div className="numberOfTries">Nombres d'éssais : {tries}</div>
        <div className="resetButton" onClick={this.resetGame}><span>Reset</span></div>
      </div>
    );
  }
}
