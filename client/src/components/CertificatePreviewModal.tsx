import React from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Award, Check } from 'lucide-react';

interface CertificatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateType: 'product' | 'blog';
  itemTitle: string;
}

const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({
  isOpen,
  onClose,
  certificateType,
  itemTitle
}) => {
  if (!isOpen) return null;

  const certificateTitle = certificateType === 'product' 
    ? 'Eco Product Contributor' 
    : 'Eco Content Creator';

  const certificateIcon = certificateType === 'product' ? '🛍️' : '📝';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-md w-full p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Certificate Notification</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Congratulations!
          </h3>
          <p className="text-gray-600 mb-4">
            You've successfully {certificateType === 'product' ? 'added a product' : 'published a blog'}: 
          </p>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="font-medium text-gray-900">"{itemTitle}"</p>
          </div>
          
          {/* Email Notification */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center mb-2">
              <Mail className="text-teal-600 mr-2" size={20} />
              <span className="text-sm font-medium text-teal-800">Email Notification</span>
            </div>
            <p className="text-sm text-teal-700">
              An email from <span className="font-medium">certificates@ecobingle.com</span> will be sent 
              to you after verification of your contribution.
            </p>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">
            Certificate Preview:
          </h4>
          
          {/* Simple Certificate Design */}
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
              <p className="text-sm text-teal-600 mb-3">{certificateTitle}</p>
              <div className="bg-white/50 rounded p-3 mb-3">
                <p className="text-xs text-gray-600 mb-1">Awarded for:</p>
                <p className="text-sm font-medium text-gray-800 italic">"{itemTitle}"</p>
              </div>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span>EcoBingle.com</span>
                <span>•</span>
                <span>Verified Contribution</span>
              </div>
              <div className="mt-3 pt-2 border-t border-teal-200">
                <p className="text-xs text-gray-500">
                  Certificate ID: ECO-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
        >
          Got it!
        </button>
      </motion.div>
    </div>
  );
};

export default CertificatePreviewModal;
