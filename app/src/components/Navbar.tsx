'use client'

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <a href="/en" className="font-bold text-3xl">Financr</a>

        <div className="flex space-x-8">
          <button className="block md:hidden bg-black font-bold text-white px-4 py-2 rounded-full hover:bg-gray-800 self-start">
            Request a quote
          </button>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex space-x-4 lg:space-x-8">
          <a href="#" className="text-gray-600 hover:text-black">About us</a>
          <a href="/en/services" className="text-gray-600 hover:text-black">Services</a>
          <a href="/en/use-cases" className="text-gray-600 hover:text-black">Use Cases</a>
          <a href="/en/plans" className="text-gray-600 hover:text-black">Pricing</a>
          <a href="#" className="text-gray-600 hover:text-black">Blog</a>
        </div>

        <button className="hidden md:block bg-black font-bold text-white px-4 py-2 rounded-full hover:bg-gray-800">
          Request a quote
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-8 text-lg flex flex-col space-y-6">
          <a href="#" className="text-gray-600 hover:text-black">About us</a>
          <a href="#" className="text-gray-600 hover:text-black">Services</a>
          <a href="#" className="text-gray-600 hover:text-black">Use Cases</a>
          <a href="#" className="text-gray-600 hover:text-black">Pricing</a>
          <a href="#" className="text-gray-600 hover:text-black">Blog</a>
        </div>
      )}
    </nav>
  );
}