import React, { useState } from 'react';

const ViewLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Sample loan data
  const loanTypes = [
    {
      id: 1,
      name: "Personal Loan",
      interestRate: "8.5% - 12%",
      amount: "Up to $50,000",
      term: "1-5 years",
      features: ["No collateral required", "Quick approval", "Flexible repayment"],
      tag: "Low Rate"
    },
    {
      id: 2,
      name: "Home Loan",
      interestRate: "6.2% - 8%",
      amount: "Up to $2M",
      term: "15-30 years",
      features: ["Fixed & adjustable rates", "Low down payment", "Pre-approval available"],
      tag: "Popular"
    },
    {
      id: 3,
      name: "Auto Loan",
      interestRate: "4.5% - 7%",
      amount: "Up to $100,000",
      term: "2-7 years",
      features: ["New & used cars", "Online application", "Gap insurance"],
      tag: "Fast Approval"
    }
    // ... other loans
  ];

  const openApplyModal = (loan) => {
    setSelectedLoan(loan);
    setShowApplyModal(true);
  };

  const openDetailsModal = (loan) => {
    setSelectedLoan(loan);
    setShowDetailsModal(true);
  };

  const closeModals = () => {
    setShowApplyModal(false);
    setShowDetailsModal(false);
    setSelectedLoan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Options</h1>
          <p className="text-gray-600">
            Explore our range of loan products designed to meet your financial needs
          </p>
        </div>

        {/* Loan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanTypes.map((loan) => (
            <div 
              key={loan.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                {/* Loan Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{loan.name}</h3>
                    <span className="text-sm text-purple-600 font-medium">{loan.tag}</span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {loan.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Interest Rate and Amount */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-blue-600">{loan.interestRate}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Max Amount</p>
                    <p className="text-md font-semibold text-purple-600">{loan.amount}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {loan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Term and Processing */}
                <div className="flex justify-between text-sm text-gray-600 mb-6">
                  <div>
                    <p className="text-gray-500">Loan Term</p>
                    <p className="font-medium">{loan.term}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Processing</p>
                    <p className="font-medium">1-3 days</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => openApplyModal(loan)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => openDetailsModal(loan)}
                    className="flex-1 border border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-700 text-center font-medium py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Apply Modal */}
        {showApplyModal && selectedLoan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative">
              <button onClick={closeModals} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                ✕
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply for {selectedLoan.name}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="w-full border rounded-lg p-2 mt-1" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                  <input type="number" className="w-full border rounded-lg p-2 mt-1" placeholder="Enter amount" />
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg font-medium">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedLoan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative">
              <button onClick={closeModals} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                ✕
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedLoan.name} Details</h2>
              <p className="text-gray-600 mb-2"><strong>Interest Rate:</strong> {selectedLoan.interestRate}</p>
              <p className="text-gray-600 mb-2"><strong>Max Amount:</strong> {selectedLoan.amount}</p>
              <p className="text-gray-600 mb-2"><strong>Term:</strong> {selectedLoan.term}</p>
              <div className="mb-4">
                <p className="font-medium text-gray-700">Features:</p>
                <ul className="list-disc ml-6 text-gray-600">
                  {selectedLoan.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => { closeModals(); openApplyModal(selectedLoan); }} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg font-medium">
                Apply Now
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Need Help Choosing?</h2>
          <p className="mb-4 opacity-90">Our loan specialists are ready to help you find the perfect loan option</p>
          <button className="bg-white text-purple-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-all duration-200">
            Contact a Loan Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLoans;
