import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import FormLayout from '../common/FormLayout';
import FormField from '../common/FormField';

const LoanApplicationPage = () => {
  const { id } = useParams(); // loan product id
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    amountRequested: '',
    durationInMonths: '',
    emiAmount: '',
    totalPayable: '',
    totalInterest: '',
    applicantNotes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await axios.get(`http://localhost:7777/loanpe/loans/${id}`);
        const loanData = response.data.data;
        setLoan(loanData);
        setFormData(prev => ({
          ...prev,
          durationInMonths: loanData.duration || '',
          emiAmount: loanData.emiAmount || 0,
          totalPayable: loanData.totalPayable || 0,
          totalInterest: loanData.totalInterest || 0
        }));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch loan details.');
        setLoading(false);
      }
    };
    fetchLoan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amountRequested || !formData.durationInMonths) {
      alert('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('http://localhost:7777/loanpe/loanapplications/apply', {
        applicant: 'currentUserId', // replace with actual logged-in user id
        loanProduct: id,
        amountRequested: Number(formData.amountRequested),
        durationInMonths: Number(formData.durationInMonths),
        emiAmount: Number(formData.emiAmount),
        totalPayable: Number(formData.totalPayable),
        totalInterest: Number(formData.totalInterest),
        applicantNotes: formData.applicantNotes
      });
      alert('Loan application submitted successfully!');
      navigate('/user/loans');
    } catch (err) {
      console.log(err);
      alert('Failed to submit loan application.');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <FormLayout
      title={`Apply for: ${loan.productName}`}
      subtitle="Fill the form below to submit your loan application."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Responsive grid: 2 columns on md+ screens, 1 on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Amount Requested"
            id="amountRequested"
            type="number"
            value={formData.amountRequested}
            onChange={handleChange}
            required
            placeholder="Enter the loan amount"
            name="amountRequested"
          />
          <FormField
            label="Duration (Months)"
            id="durationInMonths"
            type="number"
            value={formData.durationInMonths}
            onChange={handleChange}
            required
            placeholder="Enter duration in months"
            name="durationInMonths"
          />
          <FormField
            label="EMI Amount"
            id="emiAmount"
            type="number"
            value={formData.emiAmount}
            onChange={handleChange}
            placeholder="EMI will be calculated"
            name="emiAmount"
          />
          <FormField
            label="Total Payable"
            id="totalPayable"
            type="number"
            value={formData.totalPayable}
            onChange={handleChange}
            placeholder="Total amount to be paid"
            name="totalPayable"
          />
          <FormField
            label="Total Interest"
            id="totalInterest"
            type="number"
            value={formData.totalInterest}
            onChange={handleChange}
            placeholder="Total interest"
            name="totalInterest"
          />
          <FormField
            label="Notes (Optional)"
            id="applicantNotes"
            type="text"
            value={formData.applicantNotes}
            onChange={handleChange}
            placeholder="Any notes for the admin"
            name="applicantNotes"
          />
        </div>

        {/* Submit button outside the grid for full-width */}
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-4"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </FormLayout>
  );
};

export default LoanApplicationPage;
