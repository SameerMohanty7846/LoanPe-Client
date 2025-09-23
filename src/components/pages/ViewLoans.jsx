import React, { useState, useEffect } from "react";
import axios from "axios";
import LoanCard from "../common/LoanCard ";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("http://localhost:7777/loanpe/loans/allloans");
        if (res.data.status === "success") {
          await new Promise((resolve) => setTimeout(resolve, 800)); // optional delay for skeleton
          const mappedLoans = res.data.data.map((loan) => ({
            id: loan._id,
            name: loan.productName,
            interestRate: `${loan.interestRate}%`,
            term: `${loan.duration} months`,
            description: loan.description,
            eligibility: loan.eligibilityCriteria,
            tag: loan.isActive ? "Active" : "Inactive",
          }));
          setLoans(mappedLoans);
        }
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleDetailsClick = (loanId) => {
    navigate(`/user/loans/details/${loanId}`);
  };

  const handleApplyClick = (loanId) => {
    navigate(`/user/loans/application/${loanId}`);
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
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : loans.map((loan) => (
                <LoanCard
                  key={loan.id}
                  loan={loan}
                  onDetails={() => handleDetailsClick(loan.id)}
                  onApply={() => handleApplyClick(loan.id)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ViewLoans;
