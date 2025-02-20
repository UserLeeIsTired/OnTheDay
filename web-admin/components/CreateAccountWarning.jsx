const CreateAccountWarning = ({ companyDomain, username, showPopUp, onConfirmed }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-40">
      <div className="bg-[#1c1c21] p-8 rounded-xl w-[50%]">
        <p className="text-center text-gray-400 text-2xl font-mono">Create account</p>
        <div className="px-[50px]">
          <p className="text-gray-400 text-lg font-mono my-10">Are you sure that you want to create account with the following credential?</p>
          <p className="text-gray-400 text-lg font-mono">Company domain: {companyDomain}</p>
          <p className="text-gray-400 text-lg font-mono">Username: {username}</p>
          <p className="text-gray-400 text-lg font-mono mt-10">It is final and no longer can be changed</p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountWarning;