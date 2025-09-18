import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoanHistory = () => {
  // Sample data for demonstration
  const [loanData, setLoanData] = useState([
    {
      id: 1,
      loanType: 'Home Loan',
      applicationDate: '2023-05-15',
      amount: '$250,000',
      status: 'Approved',
      reason: 'Purchase new home',
      duration: '30 years',
      interestRate: '4.2%'
    },
    {
      id: 2,
      loanType: 'Auto Loan',
      applicationDate: '2023-07-22',
      amount: '$35,000',
      status: 'Rejected',
      reason: 'Vehicle purchase',
      duration: '5 years',
      interestRate: '6.5%'
    },
    {
      id: 3,
      loanType: 'Personal Loan',
      applicationDate: '2023-09-10',
      amount: '$15,000',
      status: 'Pending',
      reason: 'Debt consolidation',
      duration: '3 years',
      interestRate: '7.8%'
    },
    {
      id: 4,
      loanType: 'Education Loan',
      applicationDate: '2023-02-18',
      amount: '$45,000',
      status: 'Approved',
      reason: 'Graduate studies',
      duration: '10 years',
      interestRate: '5.2%'
    },
    {
      id: 5,
      loanType: 'Business Loan',
      applicationDate: '2023-11-05',
      amount: '$100,000',
      status: 'Under Review',
      reason: 'Startup expansion',
      duration: '7 years',
      interestRate: '8.1%'
    }
  ]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
            Loan History
          </h1>
          <p className="text-gray-600 mb-6">
            View your loan applications and their current status
          </p>
          
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-4 px-2 hidden md:grid">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Type</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</div>
            </div>
            
            <div className="space-y-4">
              {loanData.map((loan) => (
                <div key={loan.id} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-gray-900">{loan.loanType}</div>
                      <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${getStatusClass(loan.status)}`}>
                        {loan.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">Application Date</div>
                        <div className="text-gray-900">{loan.applicationDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Amount</div>
                        <div className="text-gray-900">{loan.amount}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="text-gray-900">{loan.duration}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Interest Rate</div>
                        <div className="text-gray-900">{loan.interestRate}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-500">Reason</div>
                      <div className="text-gray-900 text-sm">{loan.reason}</div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">View Details</button>
                      <button className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                    </div>
                  </div>
                  
                  {/* Desktop View */}
                  <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-center">
                    <div className="text-sm font-medium text-gray-900">{loan.loanType}</div>
                    <div className="text-sm text-gray-500">{loan.applicationDate}</div>
                    <div className="text-sm text-gray-900">{loan.amount}</div>
                    <div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(loan.status)}`}>
                        {loan.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 truncate" title={loan.reason}>{loan.reason}</div>
                    <div className="text-sm text-gray-500">{loan.duration}</div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">View</button>
                      <button className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {loanData.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No loan applications</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by applying for a new loan.</p>
              <div className="mt-6">
                <Link
                  to="/apply"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply for a Loan
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanHistory;