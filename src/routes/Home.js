import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('dataUsers'));

  const handleStartQuiz = () => {
    localStorage.setItem('quizStart', 'true');
    localStorage.setItem('startTime', Date.now()); // Set waktu mulai ke waktu sekarang
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-[#3010ff] to-[#6473ff] flex justify-center items-center">
      <div className=" relative bg-[#161a2b] text-white flex flex-col justify-center items-center  gap-10  w-[1000px] h-[700px]  rounded-lg py-8 px-10">
        <h1 className="text-5xl font-semibold  bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] bg-clip-text text-transparent">
          Welcome {user.username}
        </h1>
        <div className="text-lg font-medium text-center flex flex-col gap-5">
          <p>
            Selected Quiz Topic:{' '}
            <span className="bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] bg-clip-text text-transparent text-2xl font-bold">
              {' '}
              History
            </span>
          </p>
          <p>
            Total questions to attempt:
            <span className="bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] bg-clip-text text-transparent text-2xl font-bold">
              {' '}
              10
            </span>
          </p>
          <p>
            Total time:
            <span className="bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] bg-clip-text text-transparent text-2xl font-bold">
              {' '}
              1 minutes
            </span>
          </p>
        </div>
        <button
          onClick={() => {
            let path = '/quiz';
            handleStartQuiz(); // Panggil fungsi handleStartQuiz saat tombol diklik
            navigate(path);
          }}
          className="px-6 py-2 text-lg font-medium text-green-100 rounded bg-gradient-to-r from-[#5d0cff] to-[#9b00fa]"
        >
          Start Quiz
        </button>
        <button
          onClick={() => {
            localStorage.setItem('isLoggedIn', false);
            navigate('/login');
          }}
          className="bg-red-500 text-white text-5xl p-3 rounded-xl absolute bottom-10 left-10"
        >
          <IoIosLogOut />
        </button>
      </div>
    </div>
  );
};

export default Home;
