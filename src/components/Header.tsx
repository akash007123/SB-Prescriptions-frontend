import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-50 border-b-2 border-blue-200 py-4 px-4 md:px-6 shadow-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-1">
          Bhargava's Skin, Hair and Nail Clinic
        </h1>
        <h2 className="text-base md:text-lg font-semibold text-blue-800 mb-1">
          Dr Shashank Bhargava
        </h2>
        <p className="text-xs md:text-sm text-blue-700 mb-1">
          MBBS, MD, FAHRS
        </p>
        <p className="text-xs md:text-sm text-blue-700 mb-1 leading-tight">
          MPEB Office, Opposite gate No 4, Maksi Road, Freeganj, UJJAIN
        </p>
        <p className="text-xs md:text-sm text-blue-700 mb-1">
          Reg. No. MP 19579
        </p>
        <p className="text-xs md:text-sm text-blue-700">
          9329198211
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Online consultation as per the NMC guidelines.
        </p>
      </div>
    </header>
  );
}