import { useState, useEffect } from 'react';
import Question from './Question/Question';
import loadingLogo from '../../assets/questionnaire_loader.gif';
import * as Constants from '../../utils/constants'

function Quiz({ ...props }) {
    const [questions, setQuestions] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestionnaire = () => {
            fetch(Constants.SERVER_QUESTIONNAIRE_API, { method: 'GET' })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(Constants.SERVER_ERROR_TEXT);
                })
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setQuestions(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        error.message = Constants.SERVER_ERROR_TEXT;
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

        if (noOfAnsweredQuestions === questions.length) {
            props.setSubmitReady(true);
            let filledQuestionnaire = [];
            questions.forEach(question => {
                filledQuestionnaire.push({questionId:question.id, selectedOptionId:question.selectedOption});
            });
            props.setFilledQuestionnaire(filledQuestionnaire);
        }
    }
    if (!isLoaded) {
        return <div id="QuizWrapper" className='fullViewPort'>
            <img src={loadingLogo} alt="loading..." />
        </div>;
    }
    else if (error) {
        return (
            <div id="QuizWrapper" className='fullViewPort'>
                <h2>{Constants.SERVER_ERROR_TEXT}</h2>
                {Constants.SERVER_ERROR_DETAIL}
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

