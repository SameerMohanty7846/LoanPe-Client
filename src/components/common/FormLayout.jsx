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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-2xl">
        <CardHeader className="text-center">
          {title && (
            <CardTitle className="text-2xl font-bold text-gray-800">
              {title}
            </CardTitle>
          )}
          {subtitle && (
            <CardDescription className="text-sm text-gray-600">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLayout;
