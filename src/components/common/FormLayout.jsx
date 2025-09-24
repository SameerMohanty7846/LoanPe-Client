// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";

// /**
//  * A reusable layout wrapper for forms.
//  * Props:
//  * - title: (optional) title text
//  * - subtitle: (optional) subtitle/description
//  * - children: form fields or other content
//  */
// const FormLayout = ({ title, subtitle, children }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 sm:px-4">
//       <Card
//         className="
//           w-full 
//           max-w-md        /* narrow on mobile */
//           sm:max-w-xl     /* tablets */
//           md:max-w-3xl    /* desktops */
//           rounded-xl 
//           shadow-lg 
//           p-4 sm:p-6 md:p-8
//         "
//       >
//         <CardHeader className="text-center mb-6">
//           {title && (
//             <CardTitle className="text-lg sm:text-2xl font-bold text-gray-900">
//               {title}
//             </CardTitle>
//           )}
//           {subtitle && (
//             <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">
//               {subtitle}
//             </CardDescription>
//           )}
//         </CardHeader>
//         <CardContent className="w-full">
//           {/* Children render exactly as passed from the page */}
//           {children}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default FormLayout;


import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const FormLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 sm:px-4">
      <Card className="w-full max-w-md sm:max-w-xl md:max-w-3xl rounded-xl shadow-md p-6 sm:p-8 md:p-10 transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="text-center mb-6">
          {title && (
            <CardTitle className="text-lg sm:text-2xl font-bold text-gray-800">
              {title}
            </CardTitle>
          )}
          {subtitle && (
            <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="w-full space-y-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLayout;
