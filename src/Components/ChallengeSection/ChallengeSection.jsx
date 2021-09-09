import React from 'react'
import TestContainer from '../TestContainer/TestContainer';
import "./ChallengeSection.css"

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
}) => {
    
    return (
        <div className="challenge-section-container">
            <h1 data-aos="fade-down" className="challenge-section-header">
                Take a speed test now !
            </h1>
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



                
            />
        </div>
    )
}
export default ChallengeSection;