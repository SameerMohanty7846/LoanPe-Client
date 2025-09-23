// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';

// const Login = () => {
//   const { login } = useContext(AuthContext); // get login function from context
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await login(formData.email, formData.password); // login returns full user object

//       // Navigate based on role directly from user object
//       if (user.role === 'admin') {
//         navigate('/admin/admindashboard');
//       } else {
//         navigate('/user/userdashboard');
//       }

//     } catch (err) {
//       console.error(err);
//       alert('Invalid credentials');
//     } finally {
//       setFormData({ email: '', password: '' });
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
//       {/* Login Card */}
//       <div className="flex flex-col md:flex-row w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-white rounded-none md:rounded-xl shadow-2xl overflow-hidden">
//         {/* Left Side - Form */}
//         <div className="w-full md:w-1/2 p-8 sm:p-12 overflow-y-auto">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//           <p className="text-gray-600 mb-8">Sign in to access your account</p>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                 required
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
//                   Remember me
//                 </label>
//               </div>
//               <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
//             >
//               Sign In
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Right Side - Image */}
//         <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
//           <img
//             src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
//             alt="Login illustration"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CustomModal from '../common/CustomModal';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', color: 'green' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData.email, formData.password);

      setModalData({
        title: 'Login Successful',
        message: `Welcome ${user.name}!`,
        color: 'green',
        role: user.role,
      });
      setModalOpen(true);

      setTimeout(() => {
        if (user.role === 'admin') navigate('/admin/admindashboard');
        else navigate('/user/userdashboard');
      }, 2500);

    } catch (err) {
      console.error(err);
      setModalData({
        title: 'Login Failed',
        message: 'Invalid credentials. Please try again.',
        color: 'red',
      });
      setModalOpen(true);

      setTimeout(() => setModalOpen(false), 2500);
    } finally {
      setFormData({ email: '', password: '' });
    }
  };

  const handleContinue = () => {
    if (modalData.color === 'green') {
      if (modalData.role === 'admin') navigate('/admin/admindashboard');
      else navigate('/user/userdashboard');
    } else {
      setModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-white rounded-none md:rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-12 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Sign in to access your account</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-500">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">Sign up</Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Use the CustomModal */}
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

export default Login;
