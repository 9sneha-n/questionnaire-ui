import Landing from "../components/Landing/Landing";
import Quiz from "../components/Quiz/Quiz";
import Submit from "../components/Submit/Submit";
import { useState } from 'react';

function QuizHome() {
  const [submitReady, setSubmitReady] = useState(false);
  return (
    <div>
      <Landing />
      <Quiz setSubmitReady={setSubmitReady} />
      <Submit submitReady={submitReady} />
    </div>
  );
}

export default QuizHome;
