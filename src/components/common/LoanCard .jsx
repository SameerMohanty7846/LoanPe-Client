import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoanCard = ({ loan, onApply, onDetails }) => {
  return (
    <Card className="border border-gray-200 shadow-md rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <CardHeader className="flex justify-between items-center p-4 bg-white">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-800">{loan.name}</CardTitle>
          <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${loan.tag === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {loan.tag}
          </span>
        </div>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
          {loan.name.charAt(0)}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-2 rounded-lg text-center">
            <p className="text-xs text-gray-500">Interest Rate</p>
            <p className="text-md font-semibold text-blue-600">{loan.interestRate}</p>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg text-center">
            <p className="text-xs text-gray-500">Loan Term</p>
            <p className="text-md font-semibold text-purple-600">{loan.term}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
          <p className="text-sm text-gray-600 line-clamp-3">{loan.description}</p>
        </div>

        <div className="flex space-x-3 mt-2">
          <Button
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-2 rounded-lg text-sm font-medium"
            onClick={() => onApply(loan)}
          >
            Apply Now
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-700 py-2 rounded-lg text-sm font-medium"
            onClick={() => onDetails(loan)}
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanCard;
