import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizHome from './pages/QuizHome';
import ResultsPage from './pages/ResultsPage';
import * as Constants from './utils/constants';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes >
          <Route path={Constants.RESULTS_RUOTE} element={<ResultsPage />} />
          <Route path={Constants.HOME_RUOTE} element={<QuizHome />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
