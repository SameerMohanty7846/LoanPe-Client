import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoanDetailsPage = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleApplyClick = (loanId) => {
    navigate(`/user/loans/application/${loanId}`);
  };

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await axios.get(`http://localhost:7777/loanpe/loans/${id}`);
        setLoan(response.data.data); // your API returns data inside data.data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch loan details.");
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
        <CardHeader className="p-4">
          <CardTitle className="text-2xl font-semibold">{loan.productName}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
          <p><strong>Duration:</strong> {loan.duration} months</p>
          <p><strong>Description:</strong> {loan.description}</p>
          <p><strong>Eligibility:</strong> {loan.eligibilityCriteria}</p>
          <p><strong>Status:</strong> {loan.isActive ? "Active" : "Inactive"}</p>
          <p><strong>Created At:</strong> {new Date(loan.createdAt).toLocaleDateString()}</p>
          <p><strong>Updated At:</strong> {new Date(loan.updatedAt).toLocaleDateString()}</p>
          <div className="mt-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleApplyClick(loan._id)} // attach redirect
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanDetailsPage;
