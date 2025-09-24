import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

/**
 * A reusable layout wrapper for forms.
 * Props:
 * - title: (optional) title text
 * - subtitle: (optional) subtitle/description
 * - children: form fields or other content
 */
const FormLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-3xl rounded-xl shadow-lg sm:p-6">
        <CardHeader className="text-center mb-6">
          {title && (
            <CardTitle className="text-2xl font-bold text-gray-900">
              {title}
            </CardTitle>
          )}
          {subtitle && (
            <CardDescription className="text-sm text-gray-500">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {/* Responsive grid: 2 columns on md+ screens, 1 column on smaller */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLayout;
