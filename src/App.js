import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizHome from './pages/QuizHome/QuizHome';
import ResultsPage from './pages/ResultsPage/ResultsPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes >
          <Route path="/questionnaire-ui/results" element={<ResultsPage />} />
          <Route path="/questionnaire-ui" element={<QuizHome />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
