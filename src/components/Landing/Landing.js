import './Landing.css'
import { Link } from "react-scroll";

function Landing() {
    return (
        <div className="LandingDiv">
            <h1>Discover where you fall on the introvert-extrovert spectrum.</h1>
            <Link
                activeClass="active"
                to="QuizStart"
                smooth={true}
                duration={500}>
                <button className='primaryButton' >
                    Get Started
                    <span className='downArrow'>&#8595;</span>
                </button>
            </Link>
        </div>
    );
}

export default Landing;
