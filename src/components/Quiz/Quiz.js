import { useState, useEffect } from 'react';
import Question from './Question/Question';

function Quiz({ ...props }) {
    const [questions, setQuestions] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestionnaire = () => {
            fetch('http://localhost:5119/Questionnaire', { method: 'GET' })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Something went wrong, Please try again later');
                })
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setQuestions(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        error.message = 'Something went wrong, Please try again later';
                        setError(error);
                    }
                ).catch((exception) => {
                    setIsLoaded(true);
                    setError(exception);
                })
        }
        loadQuestionnaire();
    }, []);

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
    if (!isLoaded) {
        //TO DO : Replace with loading.gif
        return <div id="QuizWrapper" className='fullViewPort'>Loading...</div>;
    }
    else if (error) {
        return (
            <div id="QuizWrapper" className='fullViewPort'>
                <h2>Oops, Something went wrong. </h2>
                We are not able to contact our servers. Please try again later.
            </div>
        )
    } else {
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
                        setSelectedOptionForQuestion={(questionId, optionId) => setSelectedOptionForQuestion(questionId, optionId)}
                        selectedOption={questionObj.selectedOption}
                    />
                })}
            </div>
        )
    }
}
export default Quiz;

