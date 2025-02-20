import React, { useState, useEffect } from 'react';

const CreateAccountWarning = ({ companyDomain, username, setShowPopUp, submitForm }) => {
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-40">
      <div className="bg-[#1c1c21] p-8 rounded-xl w-[50%]">
        <p className="text-center text-gray-400 text-2xl font-mono">Create account</p>
        <div className="px-[50px]">
          <p className="text-gray-400 text-lg font-mono my-10">Are you sure that you want to create account with the following domain name and username?</p>
          <p className="text-gray-400 text-lg font-mono">Company domain: {companyDomain}</p>
          <p className="text-gray-400 text-lg font-mono">Username: {username}</p>
          <p className="text-red-400 text-lg font-mono mt-10">It is final and can no longer be changed</p>
          <p className="text-red-400 text-lg font-mono">Forgetting the password will result in loss of all progress</p>
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md mr-20 w-[150px] font-mono hover:bg-white hover:text-black" onClick={() => setShowPopUp(false)}>Cancel</button>
          <button className= {` text-white px-4 py-2 rounded-md w-[150px] font-mono ${countdown > 0 ? 'bg-gray-600' :'bg-red-500 hover:bg-white hover:text-black'}`} disabled={countdown > 0} onClick={submitForm}>Continue {countdown > 0 ? `(${countdown})` : ''}</button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountWarning;