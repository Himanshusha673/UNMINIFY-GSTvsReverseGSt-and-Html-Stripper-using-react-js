import React, { useState } from 'react';
import './JavaScriptUnminifier.css'
import beautify from 'js-beautify';



// Assuming you have CSS styles that you want to reuse



const JavaScriptUnminifier = () => {
  const [minifiedCode, setMinifiedCode] = useState('');
  const [unMinifiedCode, setUnminifiedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 

  const unminifyCode = () => {
    console.log('inside method');

    try {
      let sourceText = minifiedCode;
      console.log(sourceText);

      
      // or, with options
      const unMinifiedCode = beautify.js(minifiedCode, {
        indent_size: 2, // adjust indentation as needed
      });
      console.log(unMinifiedCode); 
      setUnminifiedCode(unMinifiedCode);


    } catch (error) {
      console.log(error);
      setErrorMessage('Error unminifying JavaScript');
      setUnminifiedCode('');
    }
  };

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = unMinifiedCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <div className="javascript-unminifier">
      <div className='textfield'>
        <textarea
          value={minifiedCode}
          onChange={(e) => setMinifiedCode(e.target.value)}
          placeholder="Paste minified JavaScript here..."
        ></textarea>
      </div>
     
      <div id='submitButton'>
        <button onClick={unminifyCode} className="button-63">Unminify JavaScript</button>
        <button onClick={copyToClipboard} className="button-63">Copy to Clipboard</button>
      </div>
      
      <div id="outputContainer" className={unMinifiedCode ? 'active' : ''}>
        <h2>Unminified JavaScript</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className='textfield'>
          <textarea value={unMinifiedCode} readOnly></textarea>
        </div>
      </div>

      {/* <div>
        <button onClick={() => setShowUnminified(!showUnminified)} className="button-63">
          {showUnminified ? "Show Minified" : "Show Unminified"}
        </button>
      </div> */}

      {/* {showUnminified && (
        <pre>{`
// Your minified JavaScript code goes here
          `}</pre>
      )} */}
    </div>
  );
};

export default JavaScriptUnminifier;
