import React, { useState } from 'react';

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(34037802);
  const [tenure, setTenure] = useState(28);
  const [interestRate, setInterestRate] = useState(9.58);

  // Format currency in Indian numbering system (lakhs and crores)
  const formatCurrency = (amount) => {
    if (isNaN(amount) || amount === 0) return '₹0';
    
    // For amounts in crores (>= 1,00,00,000)
    if (amount >= 10000000) {
      const crores = amount / 10000000;
      return `₹${crores.toFixed(2)} Cr`;
    } 
    // For amounts in lakhs (>= 1,00,000)
    else if (amount >= 100000) {
      const lakhs = amount / 100000;
      return `₹${lakhs.toFixed(2)} Lac`;
    }
    // For smaller amounts
    else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  // Calculate EMI
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    if (monthlyRate === 0) return loanAmount / months;
    
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return isFinite(emi) ? emi : 0;
  };

  // Calculate total payment
  const calculateTotalPayment = () => {
    const emi = calculateEMI();
    return emi * tenure * 12;
  };

  // Calculate total interest
  const calculateTotalInterest = () => {
    return calculateTotalPayment() - loanAmount;
  };

  const emi = calculateEMI();
  const totalPayment = calculateTotalPayment();
  const totalInterest = calculateTotalInterest();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
            EMI Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans
          </p>
        </div>
        
        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Input Section */}
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700 font-medium">Loan Amount</label>
                  <span className="text-lg font-bold text-purple-600">{formatCurrency(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="100000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹1 Lac</span>
                  <span>₹10 Cr</span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700 font-medium">Tenure (Years)</label>
                  <span className="text-lg font-bold text-purple-600">{tenure} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700 font-medium">Interest Rate (% p.a.)</label>
                  <span className="text-lg font-bold text-purple-600">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>
            
            {/* Result Section - Fixed contrast issue */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 sm:p-8 flex flex-col justify-center">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Your EMI</h2>
                <div className="text-3xl sm:text-4xl font-bold text-white">{formatCurrency(emi)}</div>
                <p className="text-blue-100">per month</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-black font-medium">Loan Amount</span>
                  <span className="font-bold text-lg text-black">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-black font-medium">Total Interest</span>
                  <span className="font-bold text-lg text-black">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Total Payment</span>
                  <span className="font-bold text-lg text-black">{formatCurrency(totalPayment)}</span>
                </div>
              </div>
              
              <div className="text-center">
                <button className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
                  Apply for Loan
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Information Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How EMI is Calculated</h3>
          <p className="text-gray-600 mb-4">
            EMI stands for Equated Monthly Installment. It is the fixed amount you pay towards your loan every month. 
            The EMI consists of both principal and interest components. The formula used to calculate EMI is:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-800">
            EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
          </div>
          <div className="mt-4 text-sm text-black">
            <p className="mb-1"><strong>Where:</strong></p>
            <p><strong>P</strong> = Loan amount (principal)</p>
            <p><strong>R</strong> = Monthly interest rate (annual rate ÷ 12 ÷ 100)</p>
            <p><strong>N</strong> = Number of monthly installments (tenure in years × 12)</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-purple-600 mb-2">Lower Interest Rates</h4>
            <p className="text-sm text-gray-600">Even a small reduction in interest rate can significantly lower your EMI amount.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-purple-600 mb-2">Shorter Tenure</h4>
            <p className="text-sm text-gray-600">Opting for a shorter loan term reduces total interest paid, though EMI may be higher.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-purple-600 mb-2">Prepayment Options</h4>
            <p className="text-sm text-gray-600">Consider loans that allow prepayment to reduce your interest burden.</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default EmiCalculator;