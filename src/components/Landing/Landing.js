import { Link } from "react-scroll";
import * as Constants from '../../utils/constants';

function Landing() {
    return (
        <div className="fullViewPort">
            <h1>{Constants.INTRO_TEXT}</h1>
            <Link
                className='primaryButton'
                activeClass="active"
                to="QuizWrapper"
                smooth={true}
                duration={350} >{Constants.INTRO_BUTTON_TEXT}</Link>
        </div>
    );
}

export default Landing;
