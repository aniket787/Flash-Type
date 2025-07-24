import React from 'react'
import TryAgain from '../TryAgain/TryAgain';
import TypingChallengeContainer from '../TypingChallengeContainer/TypingChallengeContainer';
import './TestContainer.css';

const TestContainer = ({ 
    timerRemaining,
    timerStared,
     wpm,
    characters,
    words,
    selectedParagraph,
    testInfo,
    onInputChange,
    startAgain,
}) =>{
    return( 
        <div className="test-container">
        {
            timerRemaining > 0 ? (
        
        <div data-aos="fade-up" className="typing-challenge-container">
                        <TypingChallengeContainer 
                        timerRemaining={timerRemaining}
                            timerStared={timerStared}
                            wpm={wpm}
                               characters={characters}
                            words={words}
                            selectedParagraph={selectedParagraph}
                            testInfo={testInfo}
                            onInputChange={onInputChange}
                             />
                        
        </div>
            ): (
                        <div className="try-again-container">
                            <TryAgain words={words} characters={characters} wpm={wpm} startAgain={startAgain} />
                        </div>

            ) } 
        </div>
     )
}
export default TestContainer;