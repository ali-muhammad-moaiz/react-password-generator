import { useCallback, useEffect, useState } from 'react'

function App() {
  const [numCharacters, setNumCharacters] = useState(8);
  let [password, setPassword] = useState('');
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);

  const copyPasswordToClipboard = () =>{
    navigator.clipboard.writeText(password);
  }

  const generatePassword = useCallback(() => {
    password = '';

    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if(numAllowed == true)
      characters += '0123456789';

    if(specialCharAllowed == true)
      characters += '!@#$%&*_';

    for (let i = 1; i <= numCharacters; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    setPassword(password);

  }, [numCharacters, numAllowed, specialCharAllowed, password])

  useEffect(generatePassword, [numCharacters, numAllowed, specialCharAllowed, setPassword]);

  return (
    <>
    <div className='flex justify-center items-center h-screen'>
      <div className="border-4 border-indigo-800 mx-auto w-2/4 flex justify-center items-center bg-slate-600">
        <div className="p-4 flex flex-col items-center">
        
          <h1 className="text-slate-50 text-5xl">Password Generator</h1>
          
          <br />
          <br />

          <div>
            <input className='py-3 px-4 text-lg rounded border border-gray-400' type="text" value={password}
            readOnly
            />
          <button className="h-2/4 bg-blue-500 text-white font-bold py-2 mx-4 px-4 rounded"
          onClick={copyPasswordToClipboard}>
            Copy
          </button>
          </div>

          <br />
          
          <div>
            <input type="range" className='mx-2'
              min={8}
              max={25}
              value={numCharacters} 
              onChange={(event) =>{
                setNumCharacters(event.target.value);
              }}
            />
            <label className='pl-1 pr-5 text-slate-50'>Length: {numCharacters}</label>

            <div className="flex items-center me-4">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={() => {
                  setNumAllowed(prevValue => !prevValue);
                }}
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-4">Numbers</label>
              
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={() => {
                  setSpecialCharAllowed(prevValue => !prevValue);
                }}
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special characters</label>
            </div>

          </div>

        </div>
      </div>
      </div>
    </>
  )
}

export default App
