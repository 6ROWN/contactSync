import React from 'react';

const Footer:React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Contact App. All Rights Reserved.
        </p>
        <p className="text-sm">
          <a href="/privacy-policy" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="/terms-of-service" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
