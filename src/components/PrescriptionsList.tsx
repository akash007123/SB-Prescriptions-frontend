import React from 'react';
import { Prescription } from '../services/api';
import Button from './Button';

interface PrescriptionsListProps {
  prescriptions: Prescription[];
  onLoad: (prescription: Prescription) => void;
  onDelete: (id: string) => void;
  onPrint: (prescription: Prescription) => void;
  onPreview: (prescription: Prescription) => void;
}

export default function PrescriptionsList({ prescriptions, onLoad, onDelete, onPrint, onPreview }: PrescriptionsListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Saved Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p className="text-gray-500">No prescriptions saved yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Diagnosis</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{prescription.patientData.name}</td>
                <td className="border border-gray-300 px-4 py-2">{prescription.patientData.age}</td>
                <td className="border border-gray-300 px-4 py-2">{prescription.patientData.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{prescription.patientData.diagnosis}</td>
                <td className="border border-gray-300 px-4 py-2">{prescription.patientData.date}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    <Button onClick={() => onPreview(prescription)} variant="primary">
                      Preview
                    </Button>
                    <Button onClick={() => onLoad(prescription)} variant="primary">
                      View
                    </Button>
                    <Button onClick={() => onDelete(prescription._id)} variant="ghost" className="text-red-600">
                      Delete
                    </Button>
                    <Button onClick={() => onPrint(prescription)} variant="ghost">
                      Print
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}