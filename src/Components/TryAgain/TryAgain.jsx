import React from 'react'
import './TryAgain.css'
const TryAgain = ({ words, characters, wpm, startAgain}) =>{
    return(
        <div className="try-again-container">
            <h1>Test Results</h1>

            <div className="result-container">
                <p>
                    <b>characters:</b> {characters}
                </p>
                <p>
                    <b>words:</b> {words}
                </p>
                <p>
                    <b>speed:</b> {wpm} wpm
                </p>
            </div>
            
            <div>
                <button onClick={()=> startAgain()} className="end-buttons start-again-btn">Re-try</button>
                <button 
                onClick={()=> {
                        window.open("https://www.linkedin.com/in/aniket-gaikwad-7379111a9/ width=800,height=600")
                }}
                className="end-buttons share-btn"
                >
                    Linkedin
                </button>
                <button
                className="end-buttons linkedin-btn"
                onClick={()=>{
                    window.open("https://github.com/aniket787")
                }}
                >
                GitHub

                </button>
            </div>
        </div>
    )
}
export default TryAgain;