import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Constants from '../../utils/constants';
function Results() {
     //TO DO : Fetch from server
    const [results, setResults] = useState({title: "This is your Result", description: "Detailed description about result type. "});
    const navigate = useNavigate();
    return (
        <div className="fullViewPort" id="Results">
            <h1>{results.title}</h1>
            <h2>{results.description}</h2>
            <button className='primaryButton' onClick={() => navigate(Constants.HOME_RUOTE)}>Take Quiz Again!</button>
        </div>
    );
}

export default Results;
