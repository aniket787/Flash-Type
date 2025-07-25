// src/components/App/App.js
import React from 'react'
import Nav from '../Nav/Nav'
import Landing from '../Landing/Landing'
import ChallengeSection from '../ChallengeSection/ChallengeSection'
import Footer from '../Footer/Footer'
import { SAMPLE_PARAGRAPHS } from '../../Data/SampleParagraph'
import './App.css'

const DefaultState = {
    selectedParagraph: '',
    timerStarted: false,
    timerRemaining: 0,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: [],
}

class App extends React.Component {
    state = {
        ...DefaultState,
        inputTime:"",        // user-entered seconds
        showTimerInput: true // show the “enter time” panel first
    }

    componentDidMount() {
        this.fetchNewParagraph()
    }

    // 1) Handle time-input changes
    handleTimeInput = (e) => {
        const secs = parseInt(e.target.value, 10)
        if (isNaN(secs) || secs < 0) return
        this.setState({ inputTime: secs })
    }

    // 2) When “Start Test” is clicked
    handleStartTest = () => {
        const { inputTime } = this.state
        if (inputTime <= 0) return               // guard invalid
        this.setState({
            showTimerInput: false,
            timerRemaining: inputTime,             // prime the countdown
        })
        // Note: actual timer starts on first keystroke in handleUserInput
    }

    // Pick a random paragraph & reset everything except inputTime
    fetchNewParagraph = () => {
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ]
        const testInfo = data.split('').map((letter) => ({
            testLetter: letter,
            status: 'notAttempted',
        }))

        this.setState((prev) => ({
            ...DefaultState,
            selectedParagraph: data,
            testInfo,
            inputTime: prev.inputTime,          // preserve
            showTimerInput: true,               // go back to time panel
            timerRemaining: 0,                  // reset
        }))
    }

    // Countdown logic
    startTimer = () => {
        this.setState({ timerStarted: true }, () => {
            this.interval = setInterval(() => {
                this.setState((prev) => {
                    const rem = prev.timerRemaining - 1
                    const timeSpent = this.state.inputTime - rem
                    const rawWpm =
                        timeSpent > 0
                            ? (prev.words / timeSpent) * this.state.inputTime
                            : 0

                    if (rem <= 0) {
                        clearInterval(this.interval)
                        return {
                            timerRemaining: 0,
                            wpm: Math.round(rawWpm),
                        }
                    }

                    return {
                        timerRemaining: rem,
                        wpm: Math.round(rawWpm),
                    }
                })
            }, 1000)
        })
    }

    // Reset & go back to time-entry
    startAgain = () => {
        clearInterval(this.interval)
        this.fetchNewParagraph()
    }

    // User typing handler
    handleUserInput = (inputValue) => {
        // kick off the timer on first keystroke
        if (!this.state.timerStarted) {
            this.startTimer()
        }

        const characters = inputValue.length
        const words =
            inputValue.trim() === ''
                ? 0
                : inputValue.trim().split(/\s+/).length
        const index = characters - 1

        // underflow: reset first letter
        if (index < 0) {
            const testInfo = [
                { ...this.state.testInfo[0], status: 'notAttempted' },
                ...this.state.testInfo.slice(1),
            ]
            this.setState({ testInfo, characters, words })
            return
        }

        // overflow: just stats
        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words })
            return
        }

        // normal: compare & update statuses
        const testInfo = [...this.state.testInfo]
        if (index + 1 < testInfo.length) {
            testInfo[index + 1].status = 'notAttempted'
        }
        const isCorrect =
            inputValue[index] === testInfo[index].testLetter
        testInfo[index].status = isCorrect ? 'correct' : 'incorrect'

        this.setState({ testInfo, characters, words })
    }

    render() {
        const {
            selectedParagraph,
            timerRemaining,
            timerStarted,
            words,
            characters,
            wpm,
            testInfo,
            inputTime,
            showTimerInput,
        } = this.state

        return (
            <div className="app">
                <Nav />
                <Landing />

                <ChallengeSection
                    selectedParagraph={selectedParagraph}
                    timerRemaining={timerRemaining}
                    timerStared={timerStarted}
                    wpm={wpm}
                    characters={characters}
                    words={words}
                    testInfo={testInfo}
                    onInputChange={this.handleUserInput}
                    startAgain={this.startAgain}
                    inputTime={inputTime}
                    handleTimeInput={this.handleTimeInput}
                    handleStartTest={this.handleStartTest}
                    showTimerInput={showTimerInput}
                />

                <Footer />
            </div>
        )
    }
}

export default App
