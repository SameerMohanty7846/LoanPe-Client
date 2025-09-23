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
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
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
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default FormField;
