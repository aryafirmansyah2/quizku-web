import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const storedData = JSON.parse(localStorage.getItem('answers'));

  useEffect(() => {
    axios
      .get('https://mocki.io/v1/266096cb-0efe-4402-b10c-4df4029ac50c')
      .then((res) => {
        setQuestions(res.data.results);
      });
  }, []);

  console.log(storedData[0]);

  return (
    <div className="h-full w-full bg-gradient-to-r from-[#3010ff] to-[#6473ff] flex justify-center items-center py-20">
      <div className=" bg-[#161a2b] text-white flex flex-col justify-start gap-10  w-[1000px] h-full mx-auto rounded-lg py-8 px-10">
        {questions.map((question, number) => (
          <div className="flex flex-col justify-start gap-10">
            <h1 className="text-6xl font-semibold text-left  bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] bg-clip-text text-transparent">
              {number + 1}
              <span className="text-3xl text-gray-400">
                /{questions.length}
              </span>
            </h1>

            <h1 className="text-3xl text-left">{question.question}</h1>

            <div className="flex flex-col gap-5">
              {question.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`flex items-center ps-4 border  ${
                    answer === question.correct_answer &&
                    storedData[number] === question.correct_answer
                      ? 'border-green-400'
                      : answer === question.correct_answer &&
                        storedData[number] !== question.correct_answer
                      ? 'border-green-400'
                      : answer === storedData[number] &&
                        storedData[number] !== question.correct_answer
                      ? 'border-red-500'
                      : 'border-gray-700'
                  } rounded  px-5`}
                >
                  <input
                    id={`bordered-radio-${index}`}
                    type="radio"
                    value=""
                    name={`bordered-radio-${number}`}
                    checked={answer === storedData[number]}
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
          </div>
        ))}
        <div className="w-full  flex justify-center items-center mt-20 mb-10">
          <button
            onClick={() => {
              navigate('/score');
            }}
            className="px-10 py-5 text-2xl font-medium text-green-100 rounded bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] "
          >
            Finish Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
