import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

const DocumentUploader = ({
  label = "Upload File",
  name,
  acceptedTypes = ["image/*"],
  maxSizeMB = 5,
  required = false,
  onFileChange,
  existingFileUrl = null,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(existingFileUrl || null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check file type
    const isValidType = acceptedTypes.some((type) =>
      type.includes("/") ? selectedFile.type === type : selectedFile.type.startsWith(type)
    );
    if (!isValidType) {
      setError(`Invalid file type. Allowed: ${acceptedTypes.join(", ")}`);
      return;
    }

    // Check file size
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setError(`File too large. Max size: ${maxSizeMB}MB`);
      return;
    }

    setError("");
    setFile(selectedFile);

    // Preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    if (onFileChange) onFileChange(name, selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (onFileChange) onFileChange(name, null);
  };

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor={name} className="mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {preview ? (
        <div className="relative mb-2 w-full h-40 md:h-60 border border-gray-200 rounded-lg overflow-hidden">
          {preview && preview.startsWith("data:image") ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              {file?.name}
            </div>
          )}
          <Tooltip content="Remove file">
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2 rounded-full p-1"
              onClick={handleRemove}
            >
              <Trash2 size={16} />
            </Button>
          </Tooltip>
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DocumentUploader;
