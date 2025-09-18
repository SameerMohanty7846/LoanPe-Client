import React from 'react';

const Offers = () => {
  // Example data - you can replace with API data later
  const offers = [
    {
      id: 1,
      title: "Home Loan Offer",
      description: "Get attractive interest rates starting from 8.5% for home loans with flexible tenure options.",
      discount: "Up to 20% off on processing fees",
    },
    {
      id: 2,
      title: "Personal Loan Offer",
      description: "Quick approval on personal loans up to ₹20 Lakhs with minimal documentation.",
      discount: "Flat ₹2000 cashback",
    },
    {
      id: 3,
      title: "Car Loan Special",
      description: "Drive your dream car with low EMI options and zero prepayment charges.",
      discount: "Interest rates as low as 7.9%",
    },
    {
      id: 4,
      title: "Festive Loan Offer",
      description: "Celebrate festivals with easy loan options and special discounts for limited time.",
      discount: "No processing fee",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Exclusive Loan Offers
          </h1>
          <p className="mt-2 text-gray-600">
            Grab the best loan deals curated specially for you.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-100 hover:border-purple-400"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{offer.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block shadow-md">
                  {offer.discount}
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
