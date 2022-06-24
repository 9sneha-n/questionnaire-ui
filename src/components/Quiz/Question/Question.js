import './Question.css'
import { useState } from 'react';
import { Link } from "react-scroll";
import { useNavigate } from 'react-router-dom';


function Question({ ...props }) {
    const [selectedOption, setSelectedOption] = useState(-1);
    const navigate = useNavigate();

    const routeOnOptionSelect = (id, dest) => {
        setSelectedOption(id);
        if (dest === "/results") {
            navigate(dest);
        }
    }

    return (
        <div className='QuestionWrapper' id={"QuestionNo" + props.id}>
            <div className='QuestionDiv'>
                <h2>{props.question}</h2>
                <ul className='listWrapper'>
                    {props && props.options && props.options.map((option) => (
                        <li className='listItem' key={option.id}>
                            <Link
                                activeClass="active"
                                to={props.destination}
                                onClick={() => routeOnOptionSelect(option.id, props.destination)}
                                smooth={true}
                                duration={500}
                                className={(option.id === selectedOption) ? 'radioButton selected' : 'radioButton'} >
                                {option.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Question;