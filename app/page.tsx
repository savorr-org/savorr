'use client';
import Image from 'next/image'
import CoverDesktop from '../public/images/Cover.png'
import CoverMobile from '../public/images/Cover-mobile.png'
import { useState } from 'react'

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');

  const handleGetStarted = () => {
    if (/^\d{5}$/.test(zipCode)) {
      localStorage.setItem('zipcode', zipCode);
      // Continue with your logic here, e.g., navigate to the next page
      window.location.href = '/shopping-list';
    } else {
      setZipCodeError('Invalid zip code. Please enter a 5-digit zip code.');
    }
  };

  // change any type
  const handleZipCodeChange = (e: any) => {
    setZipCode(e.currentTarget.value);
    // Clear the error message when the user starts typing
    setZipCodeError('');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="hidden md:block">
          <Image src={CoverDesktop} alt="Cover image (desktop)" className="" />
        </div>
        <div className="md:hidden">
          <Image src={CoverMobile} alt="Cover image (mobile)" className="" />
        </div>
        <div className="absolute z-10 px-3 md:px-0 top-10 md:top-1/3 md:left-20 font-varela">
          <div className="text-center md:text-left md:w-1/2">
            <span className="text-black text-4xl">
              Save your money, and savor your ingredients.
            </span>{' '}
            <br /> <br />
            <span className="text-green text-md">
              Get ready to see the latest deals near you. Type your postal code below to start saving money on the things you need.
            </span>{' '}
            <br /> <br />
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Zip Code"
                className={`border ${zipCodeError ? 'border-red-500' : 'border-green'} p-2 rounded-md`}
                onChange={handleZipCodeChange}
              />
              <button onClick={handleGetStarted} type="submit" className="bg-green text-white p-2 rounded-md">
                Get Started
              </button>
            </div>
            {zipCodeError && <p className="text-red-500">{zipCodeError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
