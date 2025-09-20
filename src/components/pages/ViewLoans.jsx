import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md animate-pulse overflow-hidden border border-gray-100 p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-gray-100 p-3 rounded-lg h-12"></div>
      <div className="bg-gray-100 p-3 rounded-lg h-12"></div>
    </div>
    <div className="mb-4">
      <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="flex space-x-3">
      <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const ViewLoans = () => {
  const [loans, setLoans] = useState([]); 
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get('http://localhost:7777/loanpe/loans/allloans');
        if (res.data.status === 'success') {
          const mappedLoans = res.data.data.map((loan) => ({
            id: loan._id,
            name: loan.productName,
            interestRate: `${loan.interestRate}%`,
            term: `${loan.duration} months`,
            description: loan.description,
            eligibility: loan.eligibilityCriteria,
            tag: loan.isActive ? 'Active' : 'Inactive'
          }));
          setLoans(mappedLoans);
        }
      } catch (err) {
        console.error('Error fetching loans:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

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
          {loading
            ? // Show skeletons while loading
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : loans.map((loan) => (
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

                  {/* Interest Rate and Term */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Interest Rate</p>
                      <p className="text-lg font-bold text-blue-600">{loan.interestRate}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Loan Term</p>
                      <p className="text-md font-semibold text-purple-600">{loan.term}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Description:</p>
                    <p className="text-sm text-gray-600">{loan.description}</p>
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
              <p className="text-gray-600 mb-2"><strong>Term:</strong> {selectedLoan.term}</p>
              <p className="text-gray-600 mb-4"><strong>Description:</strong> {selectedLoan.description}</p>
              <button 
                onClick={() => { closeModals(); openApplyModal(selectedLoan); }} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg font-medium">
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLoans;
