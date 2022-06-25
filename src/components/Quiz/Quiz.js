import { useState } from 'react';
import Question from './Question/Question';

function Quiz({ ...props }) {
    //TO DO : Fetch from server
    const [questions, setQuestions] = useState([{
        id: 0,
        question: "To prepare for a night out...",
        options: [
            {
                id: "A",
                text: "I buy the latest outfit, tell my friends, then dance the night away."
            },
            {
                id: "B",
                text: "Call a few of my closest friends to see if they will be there."
            },
            {
                id: "C",
                text: "Prepare? My friends have to drag me out most nights."
            },
        ],
    },
    {
        id: 1,
        question: "Being around people makes me feel...",
        options: [
            {
                id: "A",
                text: "Like I'm alive!"
            },
            {
                id: "B",
                text: "Inspired. I feed off of others' energy but there are times when I'd rather be alone."
            },
            {
                id: "C",
                text: "A bit exhausted. Being around others can be draining."
            },
        ]
    },
    {
        id: 2,
        question: "When given a choice between working as part of a team or working as a group, I would prefer to...",
        options: [
            {
                id: "A",
                text: "Work with as many people as possible."
            },
            {
                id: "B",
                text: "Work as part of a small group."
            },
            {
                id: "C",
                text: "Work by myself."
            },
        ]
    }]);

    const setSelectedOptionForQuestion = (questionId, optionId) => {
        let noOfAnsweredQuestions = 0;

        //update the question with user selected answer
        setQuestions(questions.map((q) => {
            if (q.id === questionId) {
                q.selectedOption = optionId;
            }
            //counter to check if all the question have been answered
            if (q.selectedOption) {
                noOfAnsweredQuestions++;
            }
            return q;
        }));

        if (noOfAnsweredQuestions === questions.length)
            props.setSubmitReady(true);
    }
    return (
        <div id="QuizWrapper">
            {questions.map((questionObj, index) => {

                //If its the last question, route to results. 
                let destination = (index === questions.length - 1) ? "SubmitLanding" : "QuestionNo" + (parseInt(questionObj.id) + 1)
                return <Question key={questionObj.id}
                    id={questionObj.id}
                    question={questionObj.question}
                    options={questionObj.options}
                    destination={destination}
                    setSelectedOptionForQuestion={ (questionId, optionId) => setSelectedOptionForQuestion(questionId, optionId)}
                    selectedOption={questionObj.selectedOption}
                />
            })}
        </div>
    )
}
export default Quiz;

