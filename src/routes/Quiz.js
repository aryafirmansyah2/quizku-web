import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const storedAnswers = localStorage.getItem('answers');
    return storedAnswers ? JSON.parse(storedAnswers) : [];
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedStartTime = localStorage.getItem('startTime');
    const quizStart = localStorage.getItem('quizStart');
    if (storedStartTime && quizStart === 'true') {
      const startTime = parseInt(storedStartTime);
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      return Math.max(60 - elapsedTime, 0); // 60 detik - waktu yang sudah berlalu
    } else {
      return 60; // 60 detik untuk pertama kali
    }
  });
  const [timerOn, setTimerOn] = useState(true);

  useEffect(() => {
    axios
      .get('https://mocki.io/v1/266096cb-0efe-4402-b10c-4df4029ac50c')
      .then((res) => {
        setQuestions(res.data.results);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0 && timerOn) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else if (timeLeft === 0) {
        setTimerOn(false);
        handleSubmit(); // Menjalankan fungsi handleSubmit saat waktu habis
        alert('Waktu Anda telah habis!');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerOn]);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (timerOn) {
      localStorage.setItem('startTime', Date.now()); // Update waktu mulai saat timer dihidupkan kembali
    }
  }, [timerOn]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.length - 1) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let path = '/score';
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        newScore++;
      }
    });
    localStorage.setItem('score', JSON.stringify(newScore * 10));
    localStorage.setItem('quizStart', 'false');
    setTimeLeft(60);
    navigate(path);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-[#3010ff] to-[#6473ff] flex justify-center items-center">
      {questions.length > 0 && (
        <div className=" bg-[#161a2b] text-white flex flex-col justify-start gap-10  w-[1000px] h-[700px] mx-auto rounded-lg py-8 px-10">
          <div className=" flex justify-between items-end">
            <h1 className="text-6xl font-semibold text-left  bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] bg-clip-text text-transparent">
              {currentQuestionIndex + 1}
              <span className="text-3xl text-gray-400">
                /{questions.length}
              </span>
            </h1>
            <div className="text-3xl font-semibold text-white">
              <h1>{formatTime(timeLeft)}</h1>
            </div>
          </div>

          <h1 className="text-3xl text-left">
            {questions[currentQuestionIndex].question}
          </h1>

          <div className="flex flex-col gap-5">
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <div
                key={index}
                className={`flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 px-5`}
              >
                <input
                  id={`bordered-radio-${index}`}
                  type="radio"
                  value=""
                  name={`bordered-radio-${currentQuestionIndex}`}
                  checked={answer === answers[currentQuestionIndex]}
                  onChange={() => handleAnswerSelect(answer)}
                  className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`bordered-radio-${index}`}
                  className="w-full py-4 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300 text-left"
                >
                  {answer}
                </label>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            {currentQuestionIndex === 0 ? (
              <div></div>
            ) : (
              <button
                onClick={handlePreviousQuestion}
                className="px-6 py-2 text-lg font-medium text-green-100 rounded bg-gradient-to-r from-[#5d0cff] to-[#9b00fa]"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
            )}

            {currentQuestionIndex + 1 === questions.length ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-lg font-medium text-green-100 rounded bg-gradient-to-r from-[#5d0cff] to-[#9b00fa]"
                // disabled={currentQuestionIndex === questions.length - 1}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 text-lg font-medium text-green-100 rounded bg-gradient-to-r from-[#5d0cff] to-[#9b00fa]"
                // disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
