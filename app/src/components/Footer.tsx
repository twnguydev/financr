import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail } from 'lucide-react';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="font-bold text-3xl">Financr</div>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Get in touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center mb-2">
                <Phone className="mr-2" /> (123) 456-7890
              </li>
              <li className="flex items-center mb-2">
                <Mail className="mr-2" /> contact@financr.com
              </li>
              <li>123 Financial Ave, Suite 100</li>
              <li>City, State, 12345</li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Retrieve what you need</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Use Cases</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Find us on social media</h3>
            <div className="flex space-x-6">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                <Linkedin size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="font-mono text-sm">&copy; 2024 Financr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}