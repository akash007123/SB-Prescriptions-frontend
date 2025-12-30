import React from 'react';

export default function Header() {
  return (
    <header className="border-b border-gray-300 pb-3">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-start gap-4">
          
          {/* LEFT: Logo + Clinic Info */}
          <div className="flex gap-4 items-start">
            
            {/* Logo */}
            <div className=" rounded-lg p-2 flex items-center justify-center w-14 h-14">
              <img
                src="/logo.png"
                alt="Clinic Logo"
                className="w-10 h-10 object-contain"
              />
            </div>

            {/* Text Block */}
            <div>
              <h1 className="text-2xl font-bold text-teal-800 leading-tight">
                Bhargava&apos;s Skin, Hair and Nail Clinic
              </h1>

              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                Dr Shashank Bhargava
              </p>

              <p className="text-xs text-gray-700">
                MBBS, MD, FAHRS
              </p>

              <p className="text-xs text-gray-600 mt-1 max-w-xl">
                MPEB Office, Opposite Gate No. 4, Maksi Road, Freeganj, Ujjain
              </p>

              <p className="text-xs italic text-gray-500 mt-0.5">
                Online consultation as per the NMC guidelines.
              </p>
            </div>
          </div>

          {/* RIGHT: Registration & Phone */}
          <div className="text-right text-xs text-gray-700 whitespace-nowrap">
            <p>
              <span className="font-semibold">Reg. No.</span> MP 19579
            </p>
            <p>
              <span className="font-semibold">Ph:</span> 9329198211
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}
