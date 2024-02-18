import React from 'react';
import { useNavigate } from 'react-router-dom';

const Score = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-r from-[#3010ff] to-[#6473ff] flex justify-center items-center">
      <div className=" bg-[#161a2b] text-white flex flex-col justify-center items-center  gap-10  w-[1000px] h-[700px] mx-auto rounded-lg py-8 px-10">
        <h1 className="text-5xl font-bold  ">Your Score 🎉</h1>
        <div className="flex flex-col justify-center items-center gap-14">
          <div className=" w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#5d0cff] to-[#9b00fa] flex justify-center items-center p-1">
            <h1 className="text-9xl font-semibold w-full h-full rounded-full bg-[#161a2b] flex justify-center items-center ">
              {localStorage.getItem('score')}
            </h1>
          </div>
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => {
                localStorage.removeItem('score');
                localStorage.removeItem('answers');
                navigate('/');
              }}
              className="px-6 py-2 text-lg font-medium text-green-100 rounded bg-gradient-to-r from-[#5d0cff] to-[#9b00fa]"
            >
              Restart
            </button>

            <button
              onClick={() => {
                let path = '/review';
                navigate(path);
              }}
              className="px-6 py-2 text-lg font-medium text-green-100 rounded bg-gradient-to-r from-[#5d0cff] to-[#9b00fa]"
            >
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
