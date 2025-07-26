import React from 'react'
import './Landing.css'
import Typewriter from 'typewriter-effect';

import flash2 from './../../assets/flash2.jpg'


const Landing =() => {
    return( 
        <div className="landing-container">
        <div data-aos="fade-right" className="landing-left">
            <h1 className="landing-header">Can You Type...</h1>
            <div className="typewriter-container">
                    

                    <Typewriter
                        options={{
                            strings: ['Fast?', 'Correct?', 'Quick?'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
            </div>
        </div>
        <div className="landing-right">
                <img data-aos="fade-left" className="flash-image"
                    src={flash2}
            alt="hero"
            />
        </div>
        </div>
     )
}
export default Landing;