import React from 'react';
import { Award, Check, Mail } from 'lucide-react';

const CertificatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EcoBingle Certificates</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Earn recognition for your eco-friendly contributions. Complete actions to receive verified certificates.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How Certificates Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Complete Actions</h3>
                <p className="text-sm text-gray-600">
                  Publish blogs, add eco-friendly products, or engage with the community.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Get Verified</h3>
                <p className="text-sm text-gray-600">
                  Our team reviews your contribution for authenticity and quality.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Receive Certificate</h3>
                <p className="text-sm text-gray-600">
                  Get an email from certificates@ecobingle.com with your official certificate.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Share & Display</h3>
                <p className="text-sm text-gray-600">
                  Showcase your certificates on social media or your professional profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Blog Certificate */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Eco Content Creator</h3>
                <p className="text-sm text-gray-600">For publishing eco-friendly blogs</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Share your knowledge and inspire others through blog posts about sustainable living, 
              environmental tips, and eco-friendly practices.
            </p>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Requirements:</span> Publish meaningful eco-content
            </div>
          </div>

          {/* Product Certificate */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Eco Product Contributor</h3>
                <p className="text-sm text-gray-600">For adding sustainable products</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Help build our marketplace by adding verified eco-friendly products that promote 
              sustainable consumption and environmental responsibility.
            </p>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Requirements:</span> Add verified eco-products
            </div>
          </div>
        </div>

        {/* Sample Certificate Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Certificate Preview</h2>
          <p className="text-center text-gray-600 mb-6">Here's what your certificate will look like:</p>
          
          {/* Certificate Design */}
          <div className="max-w-md mx-auto">
            <div className="border-2 border-teal-200 rounded-lg p-6 bg-gradient-to-br from-teal-50 to-green-50 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-teal-300"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-teal-300"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-teal-300"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-teal-300"></div>
              
              <div className="text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h5 className="text-xl font-bold text-teal-800 mb-2">
                  EcoBingle Certificate
                </h5>
                <div className="w-16 h-0.5 bg-teal-400 mx-auto mb-3"></div>
                <p className="text-sm text-teal-600 mb-3">Eco Content Creator</p>
                <div className="bg-white/50 rounded p-3 mb-3">
                  <p className="text-xs text-gray-600 mb-1">Awarded for:</p>
                  <p className="text-sm font-medium text-gray-800 italic">"Sample Blog Title"</p>
                </div>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>EcoBingle.com</span>
                  <span>•</span>
                  <span>Verified Contribution</span>
                </div>
                <div className="mt-3 pt-2 border-t border-teal-200">
                  <p className="text-xs text-gray-500">
                    Certificate ID: ECO-SAMPLE123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mt-8">
          <div className="flex items-center justify-center mb-3">
            <Mail className="text-teal-600 mr-2" size={20} />
            <span className="text-sm font-medium text-teal-800">Certificate Delivery</span>
          </div>
          <p className="text-sm text-teal-700 text-center">
            All certificates are sent via email from <span className="font-medium">certificates@ecobingle.com</span>
            <br />
            Please allow 24-48 hours for verification and delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
