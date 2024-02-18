import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./routes/Home'));
const Quiz = lazy(() => import('./routes/Quiz'));
const Score = lazy(() => import('./routes/Score'));
const Login = lazy(() => import('./routes/SignIn'));
const SignUp = lazy(() => import('./routes/SignUp'));
const Review = lazy(() => import('./routes/Review'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizStart, setQuizStart] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState();
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn'));
    setQuizStart(localStorage.getItem('quizStart'));
    setAnswers(localStorage.getItem('answers'));
    setScore(localStorage.getItem('score'));
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/quiz"
            element={isLoggedIn && quizStart ? <Quiz /> : <Navigate to="/" />}
          />
          <Route
            path="/score"
            element={isLoggedIn && score ? <Score /> : <Navigate to="/" />}
          />
          <Route
            path="/review"
            element={
              isLoggedIn && answers && score ? <Review /> : <Navigate to="/" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
