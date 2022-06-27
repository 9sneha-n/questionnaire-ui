
import './Results.css';
import { useNavigate } from 'react-router-dom';
import * as Constants from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import introvert_img from '../../assets/introvert.png';
import extrovert_img from '../../assets/extrovert.png';
import ambivert_img from '../../assets/ambivert.png';

function Results() {
    const location = useLocation();
    const state = location.state;

    const navigate = useNavigate();
    return (
        <div id="Results">
            {state && state.result ?
                <div className="resultsDiv">
                    <h1>{state.result.title}</h1>
                    <div className='desc'>
                        <img className='resultImg' alt="Introvert/Extrovert/Ambivert" src={state.result.title.includes("Introvert") ? introvert_img : (state.result.title.includes("Extrovert") ? extrovert_img : ambivert_img)}></img>
                        <h3>{state.result.description}</h3>
                    </div>
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
