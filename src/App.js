import React, { useState } from 'react';
import JavaScriptUnminifier from './components/JavaScriptUnminifier.js';
import HtmlStripper from './components/htmlStripper.js';
import ReverseGSTCalculator from './components/ReverseGSTCalculator.js';
import './App.css';
import logo from './assets/gstCalc.png';
import Footer from './components/footer/footer.js';

// Tab component
const Tab = ({ label, active, onClick }) => {
  return (
    <button className={active ? "active" : ""} onClick={onClick}>
      {label}
    </button>
  );
};

function App() {
  const tabNames = ["Unminify JS", "HTML Stripper", " GST Calculator"];
  const [activeTab, setActiveTab] = useState(0); // Start from the first tab

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="App">
    
    

    <nav> 
    <div className="tabs">
        <Tab
          label="Unminify JS"
          active={activeTab === 0}
          onClick={() => handleTabClick(0)}
        />
        <Tab
          label="HTML Stripper"
          active={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          label="GST Calculator"
          active={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </div>
    <img src={logo} alt="My Logo" />
        {/* <ul> 
            <li>Home</li> 
            <li>About</li> 
            <li>Services</li> 
            <li>Contact</li> 
        </ul>  */}
    </nav> 

    
      <h1>{tabNames[activeTab]}</h1> {/* Display the name of the selected tab */}
      
      
      <div className="tab-content">
        {activeTab === 0 && <JavaScriptUnminifier />}
        {activeTab === 1 && <HtmlStripper />}
        {activeTab === 2 && <ReverseGSTCalculator />}
      </div>
    <Footer>

    </Footer>




    </div>
    
  );
}

export default App;
