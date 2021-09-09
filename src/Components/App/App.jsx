import React from 'react';
import ChallengeSection from '../ChallengeSection/ChallengeSection';
import Footer from '../Footer/Footer';
import Landing from '../Landing/Landing';
import Nav from '../Nav/Nav';
import "./App.css";
import { SAMPLE_PARAGRAPHS } from '../../Data/SampleParagraph';

const TotalTime = 60;
const ServiceUrl ="http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
    selectedParagraph: '',
    timerStarted: false,
    timerRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: [],
};

class App extends React.Component {


    state = DefaultState;

fetchNewParagraphFallBack =()=> {
    const data = SAMPLE_PARAGRAPHS[
        Math.floor(Math.random()* SAMPLE_PARAGRAPHS.length)
    ];
    const selectedParagraphArray = data.split("");
    const testInfo = selectedParagraphArray.map(selectedLetter => {
        return {
            testLetter: selectedLetter,
            status: "notAttempted",
        }
    })
    this.setState({ ...DefaultState, testInfo, selectedParagraph: data })


}


fetchNewParagraph =() =>{
    fetch(ServiceUrl)
        .then(response => response.text())
        .then(data => {
            this.setState({ selectedParagraph: data })
          
        })


}


    componentDidMount () {
        this.fetchNewParagraphFallBack();


    }


    startTimer = () =>{
        this.setState({timerStarted: true});
        const timer = setInterval(()=>{
            if(this.state.timerRemaining>0){
                // change the wpm as well
                const timeSpent = TotalTime - this.state.timerRemaining;
                const wpm = timeSpent > 0 
                ?(this.state.words / timeSpent) * TotalTime 
                : 0;
                this.setState({
                    timerRemaining: this.state.timerRemaining - 1,
                    wpm: parseInt(wpm),
                });

            }else{
                clearInterval(timer)
            }
           

        }, 1000);
    }


    startAgain = () => this.fetchNewParagraphFallBack();
    handleUserInput = (inputValue) =>{
       if(!this.state.timerStarted) this.startTimer();


    //     handle under flow test - all characters chould be shown unattempted


    //  handle overflow case-  early exit 
    
    
    //  handle backspace - mark the index +1 element as not attempted

    // update - update the status in test info     find last charv in inputvalue and its index
            //  - check if character at same index as stateinfo matches or not 

        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters - 1;

        if (index < 0) {
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted",
                    },
                    ...this.state.testInfo.slice(1),
                ],
                characters,
                words,
            });

            return;
        }

        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words });
            return;
        }

        // Make a copy of testInfo
        const testInfo = this.state.testInfo;
        if (!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = "notAttempted";

        // Check for the correct typed letter
        const isCorrect = inputValue[index] === testInfo[index].testLetter;

        // Update the testInfo
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        // Update the state
        this.setState({
            testInfo,
            words,
            characters,
        });
    };


    render() {

        return (
            <div className="app">
                {/* Nav section */}
                <Nav />

                {/* Landing page */}
                <Landing />

                {/* challenge section */}
                <ChallengeSection
                    selectedParagraph={this.state.selectedParagraph}
                    words={this.state.words}
                    characters={this.state.characters}
                    wpm={this.state.wpm}
                    timerRemaining={this.state.timerRemaining}
                    timerStarted={this.state.timerStarted}
                    testInfo={this.state.testInfo}
                    onInputChange={this.handleUserInput}
                    startAgain={this.startAgain}
                     />
                    
                    

                {/* footer */}
                <Footer />
            </div>
        )
    }
}


export default App;