import Landing from "../components/Landing/Landing";
import Quiz from "../components/Quiz/Quiz";
import Submit from "../components/Submit/Submit";
import { useState } from 'react';

function QuizHome() {
  const [submitReady, setSubmitReady] = useState(false);
  const [filledQuestionnaire, setFilledQuestionnaire] = useState(null);
  return (
    <div>
      <Landing />
      <Quiz setSubmitReady={setSubmitReady} setFilledQuestionnaire={setFilledQuestionnaire}/>
      <Submit submitReady={submitReady} filledQuestionnaire={filledQuestionnaire} />
    </div>
  );
}

export default QuizHome;
