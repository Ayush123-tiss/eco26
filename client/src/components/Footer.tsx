import React from 'react';
import { Link } from 'wouter';
import { Award, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'EcoProducts', href: '/eco-products' },
    { label: 'Communities', href: '/communities' },
    { label: 'Blog', href: '/blog' },
    { label: 'News', href: '/news' },
  ];

  const supportLinks = [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Support', href: '/support' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Certificates', href: '/certificates' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/ecobingle', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/ecobingle', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/ecobingle', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/ecobingle', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/ecobingle', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-br from-teal-600 to-teal-700 text-white">
      {/* Main Footer Content */}
      <div className="w-full px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Company Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-xs">EB</span>
                </div>
                <h3 className="text-lg font-bold">EcoBingle</h3>
              </div>
              <p className="text-teal-100 text-xs leading-tight">
                Connecting eco-conscious communities worldwide.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2 text-teal-100">
                  <Mail className="w-3 h-3" />
                  <span>hello@ecobingle.com</span>
                </div>
                <div className="flex items-center space-x-2 text-teal-100">
                  <Phone className="w-3 h-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-teal-100">
                  <MapPin className="w-3 h-3" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Quick Links</h4>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-teal-100 hover:text-white transition-colors duration-200 text-xs">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="space-y-1">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-teal-100 hover:text-white transition-colors duration-200 text-xs flex items-center space-x-1">
                        {link.label === 'Certificates' && <Award className="w-3 h-3" />}
                        <span>{link.label}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-teal-500">
        <div className="w-full px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-teal-200 text-xs">
                © {currentYear} EcoBingle. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                <span className="text-teal-200 text-xs mr-1">Follow:</span>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-200 hover:text-white transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Legal Links */}
              <div className="flex space-x-3 text-xs">
                <Link href="/terms">
                  <a className="text-teal-200 hover:text-white transition-colors duration-200">
                    Terms
                  </a>
                </Link>
                <Link href="/privacy">
                  <a className="text-teal-200 hover:text-white transition-colors duration-200">
                    Privacy
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
