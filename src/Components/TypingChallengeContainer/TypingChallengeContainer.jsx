import React from 'react'
import ChallengeDetailsCard from '../ChallengeDetailsCard/ChallengeDetailsCard';
import TypingChallenge from '../TypingChallenge/TypingChallenge';
import './TypingChallengeContainer.css'

const TypingChallengeContainer = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timerStared,
    timerRemaining,
    testInfo,
    onInputChange,
}) => {

    return (
        <div className="typing-challenge-container">
            {/* Details sewction */}
            <div className="details-container">
                {/* words typed */}
                <ChallengeDetailsCard cardName="Words" cardValue={words} />

                {/* characters typed */}
                <ChallengeDetailsCard cardName="Characters" cardValue={characters} />

                {/* speed */}
                <ChallengeDetailsCard cardName="Speed" cardValue={wpm} />


            </div>

            {/* Challenge Section */}
            <div className="typewriter-container">
                <TypingChallenge
                    timerStared={timerStared}
                    timerRemaining={timerRemaining}
                    selectedParagraph={selectedParagraph}
                    testInfo={testInfo}
                    onInputChange={onInputChange}

                />
            </div>



        </div>

    )
}
export default TypingChallengeContainer;