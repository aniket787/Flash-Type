import React, { useState, useEffect, useRef } from "react";
import TestLetter from "../TestLetter/TestLetter";
import "./TypingChallenge.css";

const TypingChallenge = ({
    testInfo,
    onInputChange,
}) => {
    const [inputTime, setInputTime] = useState("");
    const [timerRemaining, setTimerRemaining] = useState(0);
    const [timerStarted, setTimerStarted] = useState(false);
    const timerIdRef = useRef(null);

    const handleTimeInput = (e) => {
        setInputTime(e.target.value);
    };

    const handleStartTest = () => {
        const time = parseInt(inputTime, 10);
        if (!isNaN(time) && time > 0) {
            setTimerRemaining(time);
            setTimerStarted(true);
        }
    };

    useEffect(() => {
        if (timerStarted && timerRemaining > 0) {
            timerIdRef.current = setTimeout(() => {
                setTimerRemaining(prev => prev - 1);
            }, 1000);
        }

        if (timerRemaining === 0 && timerStarted) {
            clearTimeout(timerIdRef.current);
            setTimerStarted(false);
        }

        return () => clearTimeout(timerIdRef.current);
    }, [timerRemaining, timerStarted]);

    return (
        <div className="typing-challenge">
            <div className="timer-input-section">
                <h6>Please Enter Time</h6>

                {!timerStarted && (
                    <div className="timer-input-row">
                        <input
                            type="number"
                            value={inputTime}
                            onChange={handleTimeInput}
                            placeholder="Enter Time In seconds"
                        />
                        <button className="start-button" onClick={handleStartTest}>Start Test</button>
                    </div>
                )}

                {timerStarted && (
                    <p className="timer">
                        00:{timerRemaining >= 10 ? timerRemaining : `0${timerRemaining}`}
                    </p>
                )}

                {!timerStarted && (
                    <p className="timer-info">
                        Click "Start Test" to begin typing
                    </p>
                )}
            </div>

            <div className="textarea-container">
                <div className="textarea-left">
                    <div className="textarea test-paragraph">
                        {testInfo.map((individualLetterInfo, index) => (
                            <TestLetter
                                key={index}
                                individualLetterInfo={individualLetterInfo}
                            />
                        ))}
                    </div>
                </div>

                <div className="textarea-right">
                    <textarea
                        onChange={(e) => onInputChange(e.target.value)}
                        className="textarea"
                        placeholder="Start typing here"
                        disabled={!timerStarted}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default TypingChallenge;
