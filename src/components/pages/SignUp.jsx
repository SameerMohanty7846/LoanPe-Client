import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomModal from '../common/CustomModal'; // ✅ import your modal

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user'
  });

  // ✅ modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    color: 'green'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7777/loanpe/users/register",
        formData,
        { withCredentials: true }
      );

      console.log("Registration Successfully:", response.data);

      // ✅ show success modal
      setModalData({
        title: 'Account Created',
        message: 'Your account has been created successfully!',
        color: 'green'
      });
      setModalOpen(true);

      // ✅ auto navigate after 2.5s
      setTimeout(() => navigate('/login'), 2500);

    } catch (error) {
      console.error("Registration Failed ", error);

      // ✅ show error modal
      setModalData({
        title: 'Registration Failed',
        message: error.response?.data?.message || 'Something went wrong',
        color: 'red'
      });
      setModalOpen(true);

      // ✅ auto close modal after 2.5s
      setTimeout(() => setModalOpen(false), 2500);
    }
  };

  // ✅ handle modal button press
  const handleContinue = () => {
    if (modalData.color === 'green') navigate('/login');
    else setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-4 flex items-center justify-center overflow-hidden">
      {/* SignUp Card */}
      <div className="flex flex-col md:flex-row w-full h-full md:h-[90vh] md:max-w-4xl bg-white rounded-none md:rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us to get started</p>
          </div>

          <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
            <div className="space-y-5 flex-1 overflow-y-auto pr-2">
              {/* Name Field */}
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone Field */}
              <div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Password Field */}
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password (Min. 8 characters)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="#" className="text-purple-600 hover:underline">Terms</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to={'/login'} className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-400 to-purple-500 relative overflow-hidden">
          <img 
            src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg" 
            alt="Sign up illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ✅ Use the CustomModal */}
      <CustomModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalData.title}
        message={modalData.message}
        color={modalData.color}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default SignUp;
