// HtmlStripper.js
import React, { useState } from 'react';
import './HtmlStripper.css';

const HtmlStripper = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stripAllTags, setStripAllTags] = useState(true);

  const stripHtml = () => {
    try {
      let strippedHtml = htmlInput;
  
      if (stripAllTags) {
        strippedHtml = strippedHtml.replace(/<[^>]*>/g, ''); // Remove all HTML tags
      } else {
        // Remove specific HTML tags
        strippedHtml = strippedHtml.replace(/<script.*?>.*?<\/script>/gi, ''); // Remove <script> tags
        strippedHtml = strippedHtml.replace(/<style.*?>.*?<\/style>/gi, ''); // Remove <style> tags
      }
  
      // Preserve line breaks
      strippedHtml = strippedHtml.replace(/<br\s*\/?>/gi, '\n');
  
      // Replace consecutive line breaks with a single line break
      strippedHtml = strippedHtml.replace(/(\n\s*){2,}/g, '\n');
  
      // Trim whitespace (only leading and trailing spaces)
      strippedHtml = strippedHtml.trim();
  
      setOutput(strippedHtml);
      document.getElementById('outputContainer').classList.add('active');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error stripping HTML');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = output;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };
  return (
    <div className="html-stripper">
    <div className='textfield'>
    <textarea
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
        placeholder="Paste HTML here..."
       
      ></textarea>
    </div>
     
      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={stripAllTags}
            onChange={() => setStripAllTags(!stripAllTags)}
          /> Strip All Tags
        </label>
        <label>
          <input type="checkbox" /> Remove Scripts
        </label>
       
      </div>
      <div id='submitButton'>
  <button onClick={stripHtml} class="button-63">Strip HTML</button>
  <button onClick={copyToClipboard} class="button-63">Copy to Clipboard</button>
</div>
      
      <div id="outputContainer" className={output ? 'active' : ''}>
        <h2>Stripped HTML</h2>
 
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className='textfield'>
        <textarea value={output} readOnly></textarea>
        </div>
      
      </div>
    </div>
  );
};

export default HtmlStripper;
