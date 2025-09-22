import React, { useEffect, useState } from "react";
import axios from "axios";

const SkeletonCard = () => (
  <div className="bg-gray-100 rounded-lg p-4 shadow-sm animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 rounded w-32"></div>
    <div className="h-3 bg-gray-200 rounded w-48"></div>
    <div className="h-3 bg-gray-200 rounded w-24"></div>
    <div className="h-3 bg-gray-200 rounded w-20"></div>
    <div className="h-3 bg-gray-200 rounded w-16"></div>
    <div className="h-3 bg-gray-200 rounded w-24"></div>
  </div>
);

const ViewLoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7777/loanpe/loanapplications/allapplications"
        );
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching loan applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Loan Applications
        </h1>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Interest Rate
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Time (Months)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array(8)
                        .fill(0)
                        .map((_, idx) => (
                          <td key={idx} className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                          </td>
                        ))}
                    </tr>
                  ))
                : applications.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center text-gray-500 py-6 text-sm"
                      >
                        No loan applications found.
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {app.applicant?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {app.applicant?.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {app.product?.productName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {app.product?.interestRate}%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          ₹{app.requestedAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {app.time}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {loading
            ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
            : applications.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  No loan applications found.
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white rounded-xl shadow-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {app.applicant?.name}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>Email: {app.applicant?.email}</div>
                      <div>Product: {app.product?.productName}</div>
                      <div>Interest: {app.product?.interestRate}%</div>
                      <div>Amount: ₹{app.requestedAmount.toLocaleString("en-IN")}</div>
                      <div>Time: {app.time} months</div>
                      <div>Created: {new Date(app.createdAt).toLocaleDateString()}</div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default ViewLoanApplications;
