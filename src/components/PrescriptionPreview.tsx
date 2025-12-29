import React, { forwardRef } from 'react';
import { PatientData } from './PatientForm';

interface Medicine {
  id: number;
  name: string;
  dose: string;
}

interface PrescriptionPreviewProps {
  patientData: PatientData;
  medicines: Medicine[];
  note?: string;
}

const formatSimpleDate = (date: string | Date): string => {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

const PrescriptionPreview = forwardRef<HTMLDivElement, PrescriptionPreviewProps>(
  ({ patientData, medicines, note }, ref) => {
    return (
      <div
        ref={ref}
        id="prescription"
        className="bg-white print:bg-white p-8 max-w-4xl mx-auto min-h-screen flex flex-col"
      >
        {/* Top Section */}
        <div className="text-center border-b-[7px] border-orange-500 pb-4 mb-6">
          {formatSimpleDate(patientData.date)}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Bhargava's Skin, Hair and Nail Clinic
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-1">
            Dr Shashank Bhargava
          </h2>
          <p className="text-sm text-gray-600 mb-1">MBBS, MD, FAHRS</p>
          <p className="text-sm text-gray-600 mb-1">
            MPEB Office, Opposite gate No 4, Maksi Road, Freeganj, UJJAIN
          </p>
          <p className="text-sm text-gray-600 mb-1">Reg. No. MP 19579</p>
          <p className="text-sm text-gray-600">9329198211</p>
          <p className="text-xs text-gray-500 mt-1">
            Online consultation as per the NMC guidelines.
          </p>
          {/* <p className="text-sm text-gray-600 mt-2">
            Made by Prescription Maker www.digitalprescriptionmaker.com
          </p> */}
        </div>

        {/* Body */}
        <div className="mb-6 flex-grow">
          <div className="grid grid-cols-1">
            <div className="text-lg">{patientData.name}</div>
            <div>
              <strong>Age:</strong> {patientData.age}
            </div>
            <div>
              <strong>Gender:</strong> {patientData.gender}
            </div>
          </div>

          <div>
            <strong>Diagnosis:</strong> &nbsp;<span className="mt-1">{patientData.diagnosis}</span>            
          </div>

          <div className="mt-5">
            <strong>Medicines:</strong>
            <ul className="mt-2 ml-5 space-y-1 list-disc">
              {medicines
                .filter((m) => m.name.trim())
                .map((medicine) => (
                  <li key={medicine.id}>
                    {medicine.name} &nbsp;&nbsp;--&nbsp;&nbsp; {medicine.dose}
                  </li>
                ))}
            </ul>
          </div>

          {note && (
            <div className="mt-4">
              <strong>Notes</strong>
              <p className="mt-1">{note}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end border-t-[7px] border-orange-500 pt-4">
          <div>
            <p className="font-semibold">Dr Shashank Bhargava</p>
            <p className="text-sm">MBBS, MD, FAHRS</p>
            <p className="text-sm">Reg. No. MP 19579</p>
          </div>
        </div>
      </div>
    );
  }
);

export default PrescriptionPreview;
