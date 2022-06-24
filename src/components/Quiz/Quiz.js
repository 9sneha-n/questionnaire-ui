import { useState } from 'react';
import Question from './Question/Question';

function Quiz() {
    //TO DO : Fetch from server
    const [questions, setQuestions] = useState([{
        id: 0,
        question: "To prepare for a night out...",
        options: [
            {
                id: 0,
                text: "I buy the latest outfit, tell my friends, then dance the night away."
            },
            {
                id: 1,
                text: "Call a few of my closest friends to see if they will be there."
            },
            {
                id: 2,
                text: "Prepare? My friends have to drag me out most nights."
            },
        ],
    },
    {
        id: 1,
        question: "Being around people makes me feel...",
        options: [
            {
                id: 0,
                text: "Like I'm alive!"
            },
            {
                id: 1,
                text: "Inspired. I feed off of others' energy but there are times when I'd rather be alone."
            },
            {
                id: 2,
                text: "A bit exhausted. Being around others can be draining."
            },
        ]
    },
    {
        id: 2,
        question: "When given a choice between working as part of a team or working as a group, I would prefer to...",
        options: [
            {
                id: 0,
                text: "Work with as many people as possible."
            },
            {
                id: 1,
                text: "Work as part of a small group."
            },
            {
                id: 2,
                text: "Work by myself."
            },
        ]
    }]);
    
    return (
        <div id="QuizStart">
            {questions.map((questionObj, index) => {
                //If its the last question, route to results. 
                //TO DO : What if all the questions are not answered? Dont route to results and show an error message.
                let destination = (index === questions.length - 1) ? "/results" : "QuestionNo" + (parseInt(questionObj.id) + 1)
                return <Question key={questionObj.id}
                    id={questionObj.id}
                    question={questionObj.question}
                    options={questionObj.options}
                    destination={destination}/>
            })}
        </div>
    )
}
export default Quiz;

