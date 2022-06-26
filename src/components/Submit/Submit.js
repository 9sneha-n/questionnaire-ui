
import { useNavigate } from 'react-router-dom';
import * as Constants from '../../utils/constants';

function Submit({...props}) {

    const navigate = useNavigate();

    const routeToResultsOnSubmitClick = (event) => {
        event.preventDefault();
        navigate(Constants.RESULTS_RUOTE, {state:{result : {title:'Introvert', description:'Detailed description about result type.'}}});
    }

    return (
        <form className="fullViewPort" id="SubmitLanding" onSubmit={routeToResultsOnSubmitClick}>
            <h1>{Constants.SUBMIT_TEXT}</h1>
            <input type='submit' className='primaryButton' 
                disabled={!props.submitReady}
                value={Constants.SUBMIT_BUTTON_TEXT}>
            </input>
            <div className='ErrorMessage' style={{display: props.submitReady ? 'none' : 'block' }}>{Constants.SUBMIT_ERROR_TEXT}</div>
        </form>
    );
}

export default Submit;