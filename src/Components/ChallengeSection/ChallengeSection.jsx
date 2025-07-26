import React from 'react';
import TestContainer from '../TestContainer/TestContainer';
import "./ChallengeSection.css";

const ChallengeSection = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timerStared,
    timerRemaining,
    testInfo,
    onInputChange,
    startAgain,
    inputTime,
    handleTimeInput,
    handleStartTest,
    showTimerInput,
}) => {
    return (
        <div className="challenge-section-container">
            <h1 data-aos="fade-down" className="challenge-section-header">
                Take a speed test now ! ⏰
            </h1>

            {/* Input Time Section */}
            {showTimerInput && (
                <div className="timer-input-section">
                    <h2>Enter your desired Time for test</h2>
                    <input className='input-class'
                        // type="number"
                        value={inputTime}
                        onChange={handleTimeInput}
                        placeholder="Enter time in seconds"
                    />
                    <button className="start-button" onClick={handleStartTest}>
                        Start Test
                    </button>
                </div>
            )}

            {/* Typing Test Container */}
            {!showTimerInput && (
                <TestContainer
                    timerRemaining={timerRemaining}
                    timerStared={timerStared}
                    wpm={wpm}
                    characters={characters}
                    words={words}
                    selectedParagraph={selectedParagraph}
                    testInfo={testInfo}
                    onInputChange={onInputChange}
                    startAgain={startAgain}
                    inputTime={inputTime}
                />
            )}
        </div>
    );
};

export default ChallengeSection;
