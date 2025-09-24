import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * A reusable form input component following the app's theme.
 * Props:
 * - label: The label text for the input
 * - id: Unique ID for the input
 * - type: Input type (text, email, password, number, etc.)
 * - placeholder: Placeholder text
 * - value: Input value
 * - onChange: onChange handler
 * - required: (optional) if field is required
 */
const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <Label htmlFor={id} className="text-sm font-semibold text-gray-800">
          {label}
        </Label>
      )}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                   placeholder-gray-400 text-gray-900 transition-all duration-200"
      />
    </div>
  );
};

export default FormField;
