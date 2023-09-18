import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>

        <p className="mb-4">
          Welcome to our e-commerce website. These terms and conditions outline the rules and regulations for the use of
          our website. By accessing this website, you accept these terms and conditions in full. Do not continue to use
          our website if you do not accept all of the terms and conditions stated on this page.
        </p>

        <h3 className="text-xl mt-4 mb-2">1. Introduction</h3>
        <p>
          These terms and conditions govern your use of this website; by using this website, you accept these terms and
          conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions,
          you must not use this website.
        </p>

        <h3 className="text-xl mt-4 mb-2">2. Acceptance of Terms</h3>
        <p>
          By using this website, you agree to be bound by these terms of service, all applicable laws and regulations,
          and agree that you are responsible for compliance with any applicable local laws.
        </p>

        {/* Continue adding sections for other topics here */}

        <h3 className="text-xl mt-4 mb-2">3. Website Use</h3>
        <p>
          The content of this website is for your general information and use only. It is subject to change without
          notice.
        </p>

        <p>
          Your use of any information or materials on this website is entirely at your own risk, for which we shall not
          be liable. It shall be your own responsibility to ensure that any products, services, or information available
          through this website meet your specific requirements.
        </p>

        {/* Add more sections as needed */}

        <p className="mt-8">
          Please read these terms and conditions carefully before using our website. Your access to and use of the
          service is conditioned on your acceptance of and compliance with these terms. These terms apply to all visitors,
          users, and others who access or use the service.
        </p>

        <p>If you disagree with any part of these terms, then you may not access the service.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
