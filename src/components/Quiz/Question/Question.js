import './Question.css'

import { Link } from "react-scroll";

function Question({ ...props }) {


    return (
        <div className='fullViewPort' id={"QuestionNo" + props.id}>
            <div className='QuestionDiv'>
                <div className='questionHeader'>
                <h2>{props.question}</h2>
                </div>
                <ul className='listWrapper'>
                    {props && props.options && props.options.map((option) => (
                        <li className='listItem' key={option.id}>
                            <Link
                                activeClass="active"
                                to={props.destination}
                                onClick={() => props.setSelectedOptionForQuestion(props.id,option.id)}
                                smooth={true}
                                duration={500}
                                className={(option.id === props.selectedOption) ? 'radioButton selected' : 'radioButton'} >
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