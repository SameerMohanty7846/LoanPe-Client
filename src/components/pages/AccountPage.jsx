import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import FormLayout from "../common/FormLayout";
import FormField from "../common/FormField";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../context/AuthContext";
import DocumentUploader from "../common/DocumentUploader"; // import the new uploader

const AccountPage = () => {
  const { user, fetchCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaarNumber: "",
    panNumber: "",
    idProofType: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    upiId: "",
    employmentType: "",
    companyName: "",
    monthlyIncome: "",
    address: "",
  });

  const [files, setFiles] = useState({
    profilePic: null,
    idProofFront: null,
    idProofBack: null,
    incomeProof: null,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        aadhaarNumber: user.aadhaarNumber || "",
        panNumber: user.panNumber || "",
        idProofType: user.idProofType || "",
        bankName: user.bankName || "",
        accountHolderName: user.accountHolderName || "",
        accountNumber: user.accountNumber || "",
        ifscCode: user.ifscCode || "",
        branchName: user.branchName || "",
        upiId: user.upiId || "",
        employmentType: user.employmentType || "",
        companyName: user.companyName || "",
        monthlyIncome: user.monthlyIncome || "",
        address: user.address || "",
      });

      setFiles({
        profilePic: user.profilePic || null,
        idProofFront: user.idProofFront || null,
        idProofBack: user.idProofBack || null,
        incomeProof: user.incomeProof || null,
      });

      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (field, file) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formPayload = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => formPayload.append(key, formData[key]));

      // Append files
      Object.keys(files).forEach((key) => {
        if (files[key] instanceof File) formPayload.append(key, files[key]);
      });

      await axios.put("http://localhost:7777/loanpe/user/update", formPayload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Profile updated successfully!");
      fetchCurrentUser(); // Refresh user in context
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to update profile");
    }

    setSubmitting(false);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <FormLayout
      title="Update Your Profile"
      subtitle="Complete your profile information and upload required documents."
    >
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Info */}
          <FormField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormField label="Email" name="email" value={formData.email} onChange={handleChange} required />
          <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <FormField label="Address" name="address" value={formData.address} onChange={handleChange} />

          {/* KYC */}
          <FormField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
          <FormField label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} />
          <FormField label="ID Proof Type" name="idProofType" value={formData.idProofType} onChange={handleChange} />

          {/* Bank Details */}
          <FormField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
          <FormField label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} />
          <FormField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
          <FormField label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
          <FormField label="Branch Name" name="branchName" value={formData.branchName} onChange={handleChange} />
          <FormField label="UPI ID" name="upiId" value={formData.upiId} onChange={handleChange} />

          {/* Employment */}
          <FormField label="Employment Type" name="employmentType" value={formData.employmentType} onChange={handleChange} />
          <FormField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
          <FormField label="Monthly Income" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} type="number" />

          {/* Document Uploads */}
          <DocumentUploader
            label="Profile Picture"
            name="profilePic"
            file={files.profilePic}
            onFileSelect={(file) => handleFileChange("profilePic", file)}
            allowedTypes={["image/"]}
            maxSize={2 * 1024 * 1024} // 2MB
          />
          <DocumentUploader
            label="ID Proof Front"
            name="idProofFront"
            file={files.idProofFront}
            onFileSelect={(file) => handleFileChange("idProofFront", file)}
            allowedTypes={["image/", "application/pdf"]}
            maxSize={5 * 1024 * 1024} // 5MB
          />
          <DocumentUploader
            label="ID Proof Back"
            name="idProofBack"
            file={files.idProofBack}
            onFileSelect={(file) => handleFileChange("idProofBack", file)}
            allowedTypes={["image/", "application/pdf"]}
            maxSize={5 * 1024 * 1024} // 5MB
          />
          <DocumentUploader
            label="Income Proof"
            name="incomeProof"
            file={files.incomeProof}
            onFileSelect={(file) => handleFileChange("incomeProof", file)}
            allowedTypes={["image/", "application/pdf"]}
            maxSize={5 * 1024 * 1024} // 5MB
          />
        </div>

        <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-4">
          {submitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </FormLayout>
  );
};

export default AccountPage;
