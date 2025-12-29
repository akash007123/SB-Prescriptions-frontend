import React from 'react';
import { Prescription } from '../services/api';
import Button from './Button';

interface PrescriptionsListProps {
  prescriptions: Prescription[];
  onLoad: (prescription: Prescription) => void;
  onDelete: (id: string) => void;
}

export default function PrescriptionsList({ prescriptions, onLoad, onDelete }: PrescriptionsListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Saved Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p className="text-gray-500">No prescriptions saved yet.</p>
      ) : (
        <ul className="space-y-2">
          {prescriptions.map((prescription) => (
            <li key={prescription._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div>
                <p className="font-medium">{prescription.patientData.name}</p>
                <p className="text-sm text-gray-600">{prescription.patientData.diagnosis}</p>
                <p className="text-sm text-gray-500">{prescription.patientData.date}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => onLoad(prescription)} variant="primary">
                  Load
                </Button>
                <Button onClick={() => onDelete(prescription._id)} variant="ghost" className="text-red-600">
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}