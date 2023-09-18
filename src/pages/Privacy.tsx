import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>

        <p className="mb-4">
          Welcome to Rediant Store's Privacy Policy. At Rediant Store, we are committed to protecting your privacy and
          ensuring that your personal information is handled with care. This policy outlines how we collect, use, and
          safeguard your data.
        </p>

        <h3 className="text-xl mt-4 mb-2">Information We Collect</h3>
        <p>
          Rediant Store may collect personal information such as your name, email address, phone number, shipping
          address, and payment information. We gather this data through secure forms on our website to provide you with
          our services.
        </p>

        <h3 className="text-xl mt-4 mb-2">How We Use Your Information</h3>
        <p>
          We use your data for purposes such as processing orders, improving our services, and sending you relevant
          marketing communications. Rest assured, we do not share your information with third parties without your
          consent.
        </p>

        <h3 className="text-xl mt-4 mb-2">Data Security</h3>
        <p>
          Your data security is our priority. Rediant Store employs encryption, secure servers, and access controls to
          protect your information from unauthorized access or breaches.
        </p>

        <h3 className="text-xl mt-4 mb-2">Cookies and Tracking</h3>
        <p>
          We use cookies and similar technologies to enhance your browsing experience. You can manage your cookie
          preferences through our website settings.
        </p>

        <h3 className="text-xl mt-4 mb-2">User Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal data. To exercise these rights or ask questions
          about your data, please contact us using the provided information.
        </p>

        <h3 className="text-xl mt-4 mb-2">Changes to the Privacy Policy</h3>
        <p>
          We may update our Privacy Policy to reflect changes in our practices or legal requirements. Please review this
          policy periodically.
        </p>

        <h3 className="text-xl mt-4 mb-2">Contact Us</h3>
        <p>
          If you have questions or concerns about your privacy or this policy, please reach out to us:
        </p>
        <p>
          Email: privacy@rediantstore.com<br />
          Phone: +1-123-456-7890
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
