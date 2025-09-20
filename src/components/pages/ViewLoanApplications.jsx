import React, { useEffect, useState } from "react";
import axios from "axios";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-28"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-12"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </td>
  </tr>
);

const ViewLoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7777/loanpe/loanapplications/allapplications"
        );
        setApplications(res.data); // your API returns an array
      } catch (err) {
        console.error("Error fetching loan applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Loan Applications
        </h1>

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
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Show 5 skeleton rows while loading
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            ) : applications.length === 0 ? (
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
                  className="border-b hover:bg-gray-100 transition"
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
                  <td className="px-6 py-4 text-sm text-gray-700">{app.time}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        app.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewLoanApplications;
