
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Constants from '../../utils/constants';
import loadingLogo from '../../assets/questionnaire_loader.gif';

function Submit({ ...props }) {
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const routeToResultsOnSubmitClick = (event) => {
        event.preventDefault();

        setIsLoaded(false);
        fetch(Constants.SERVER_RESULTS_API, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.filledQuestionnaire)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(Constants.SERVER_ERROR_TEXT);
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    navigate(Constants.RESULTS_RUOTE, { state: { result: { title: result.title, description: result.description } } });
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
    if (!isLoaded) {
        return <div className='fullViewPort'>
            <img src={loadingLogo} alt="loading..." />
        </div>;
    }
    else if (error) {
        return (
            <div className='fullViewPort'>
                <h2>{Constants.SERVER_ERROR_TEXT}</h2>
                {Constants.SERVER_ERROR_DETAIL}
            </div>
        )
    } else {
        return (
            <form className="fullViewPort" id="SubmitLanding" onSubmit={routeToResultsOnSubmitClick}>
                <h1>{Constants.SUBMIT_TEXT}</h1>
                <input type='submit' className='primaryButton'
                    disabled={!props.submitReady}
                    value={Constants.SUBMIT_BUTTON_TEXT}>
                </input>
                <div className='ErrorMessage' style={{ display: props.submitReady ? 'none' : 'block' }}>{Constants.SUBMIT_ERROR_TEXT}</div>
            </form>
        );
    }
}

export default Submit;