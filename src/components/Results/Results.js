
import { useNavigate } from 'react-router-dom';
import * as Constants from '../../utils/constants';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const state = location.state;

    const navigate = useNavigate();
    return (
        <div id="Results">
            {state  && state.result ?
                <div  className="fullViewPort">
                    <h1>{state.result.title}</h1>
                    <h2>{state.result.description}</h2>
                    <button className='primaryButton' onClick={() => navigate(Constants.HOME_RUOTE)}>Take Quiz Again!</button>
                </div> :
                <div className="fullViewPort">
                    <h2>Oops, Something went wrong. </h2>
                    We are not able to calculate your results. Please try again later.
                </div>
            }
        </div>
    );
}

export default Results;
