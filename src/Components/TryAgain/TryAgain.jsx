import React from 'react'
import './TryAgain.css'
const TryAgain = ({ words, characters, wpm, startAgain}) =>{
    return(
        <div className="try-again-container">
            <h1 className='result-heading'>Test Results</h1>

            <div className="result-container">
                <p>
                    <b>Characters you typed:</b> {characters}
                </p>
                <p>
                    <b>Words you typed:</b> {words}
                </p>
                <p>
                    <b>your Speed Was:</b> {wpm} wpm
                </p>
            </div>

            <div>
                <button onClick={() => startAgain()} className="end-buttons start-again-btn">Re-try Test Again</button>
            </div>

            <div>
                <h1 className='heading'>Thanks for taking this test</h1>
            </div>

            <h2>You can find me here 🙂 </h2>

            <div>



                <button
                    onClick={() => {
                        window.open("https://leetcode.com/u/aniketgaikwad33/ ")
                    }}
                    className="end-buttons leetcode-button"
                >
                    LeetCode
                </button>

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