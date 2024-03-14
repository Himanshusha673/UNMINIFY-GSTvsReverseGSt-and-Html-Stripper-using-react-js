import React, { useState, useEffect, useCallback } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import './ReverseGSTCalculator.css';


const ReverseGSTCalculator = ({ defaultGSTRate }) => {
  const [amountExcludingGST, setAmountExcludingGST] = useState('');
  const [gstRate, setGSTRate] = useState(defaultGSTRate || '18'); // Default GST rate of 18%
  const [amountIncludingGST, setAmountIncludingGST] = useState('');
  const [totalGSTAmount, setTotalGSTAmount] = useState('');
  const [totalCGSTAndSGCTAmount, setTotalSgctAmount] = useState('');

  const calculateGST = useCallback(() => {
    const excluding = parseFloat(amountExcludingGST);
    const rate = parseFloat(gstRate) / 100;
    if(excluding!==''){

    if (!isNaN(excluding) && !isNaN(rate)) {
      console.log('Calculating GST');
      const total = excluding * (1 + rate);
      const gstAmount = total - excluding;
      setAmountIncludingGST(total.toFixed(2));
      setTotalGSTAmount(gstAmount.toFixed(2));
      setTotalSgctAmount((gstAmount / 2).toFixed(2)); // Dividing GST amount by 2 to get SGCT/UTGST
    }else{
      setAmountIncludingGST('');
      setTotalGSTAmount('');
      setTotalSgctAmount('');


    }
  }else{
    setAmountIncludingGST('');
    setTotalGSTAmount('');
    setTotalSgctAmount('');

  }
  }, [amountExcludingGST, gstRate]);

  const calculateReverseGST = useCallback(() => {
    const total = parseFloat(amountIncludingGST);
    const rate = parseFloat(gstRate) / 100;
    if(total!==''){
      if (!isNaN(total) && !isNaN(rate)) {
        console.log('Calculating Reverse GST');
        const excluding = total / (1 + rate);
        const gstAmount = total - excluding;
        setAmountExcludingGST(excluding.toFixed(2));
        setTotalGSTAmount(gstAmount.toFixed(2));
        setTotalSgctAmount((gstAmount / 2).toFixed(2)); 
      } else {
        setAmountExcludingGST('');
        setTotalGSTAmount('');
        setTotalSgctAmount('');
      
      }

    }
    else{
      setAmountExcludingGST('');
      setTotalGSTAmount('');
      setTotalSgctAmount('')

    }

   
  }, [amountIncludingGST, gstRate]);

  useEffect(() => {
    if (amountExcludingGST !== '' && amountIncludingGST === '') {
      console.log('Amount excluding GST changed');
      setAmountIncludingGST('');
      calculateGST();
    } else if (amountIncludingGST !== '' && amountExcludingGST === '') {
      console.log('Amount including GST changed');
      setAmountExcludingGST('');
      calculateReverseGST();
    }else if(amountExcludingGST===''&&amountIncludingGST===''){
      setAmountIncludingGST('');
      setTotalGSTAmount('');
      setTotalSgctAmount('');
    }

  }, [amountExcludingGST, amountIncludingGST, gstRate, calculateGST, calculateReverseGST]);

  const handleAmountIncludingGSTChange = (e) => {
    const value = e.target.value;
    setAmountIncludingGST(value);
    setAmountExcludingGST('');
  };

  const handleAmountExcludingGSTChange = (e) => {
    const value = e.target.value;
    setAmountExcludingGST(value);
    setAmountIncludingGST('');
  };

  const handleGSTRateChange = (e) => {
    setGSTRate(e.target.value);
    setAmountExcludingGST(amountExcludingGST);
    setAmountIncludingGST('');
  
  };

  return (
    <div className="Reverse-calculator">
      <Card>
        <CardContent>
          <div className='singleRow'>
            <label>Amount Excluding GST:</label>
            <input
              type="number"
              value={amountExcludingGST}
              onChange={handleAmountExcludingGSTChange}
            />
            <label>GST :</label>
            <select value={gstRate} onChange={handleGSTRateChange}>
              <option value="0.25">0.25%</option>
              <option value="3">3%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
          <div className='singleRow'>
            <label>Amount Including GST:</label>
            <input
              type="number"
              value={amountIncludingGST}
              onChange={handleAmountIncludingGSTChange}
            />
          </div>
          {totalGSTAmount && (
            <div>
              <p>Total GST Amount - {totalGSTAmount} ₹ </p>
              <p>SGCT/UTGST - {totalCGSTAndSGCTAmount} ₹ </p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className='content'>
      <img src="https://swaritadvisors.com/learning/wp-content/uploads/2020/07/Online-GST-Calculator-Easiest-Way-to-Calculate-GST-Amount.jpg" alt="GST Calculator" />
      <p>A GST calculator is a tool used to calculate the Goods and Services Tax (GST) on a given amount. It helps individuals and businesses accurately determine the GST component of a transaction, making tax calculations easier and more efficient.</p>
    </div>
      </div>


   
  );
}

export default ReverseGSTCalculator;
