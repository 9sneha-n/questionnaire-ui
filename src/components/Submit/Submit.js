
import { useNavigate } from 'react-router-dom';
import * as Constants from '../../utils/constants';

function Submit({...props}) {

    const navigate = useNavigate();

    const routeToResultsOnSubmitClick = () => {
        navigate(Constants.RESULTS_RUOTE);
    }

    return (
        <div className="fullViewPort" id="SubmitLanding">
            <h1>{Constants.SUBMIT_TEXT}</h1>
            <button className='primaryButton' 
                onClick={routeToResultsOnSubmitClick} 
                disabled={!props.submitReady}>
                {Constants.SUBMIT_BUTTON_TEXT}
            </button>
            <div className='ErrorMessage' style={{display: props.submitReady ? 'none' : 'block' }}>{Constants.SUBMIT_ERROR_TEXT}</div>
        </div>
    );
}

export default Submit;