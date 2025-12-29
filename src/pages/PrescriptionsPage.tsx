import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PrescriptionsList from '../components/PrescriptionsList';
import { Prescription, getPrescriptions, deletePrescription } from '../services/api';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPrescriptions().then(setPrescriptions).catch(console.error);
  }, []);

  const handleLoad = (prescription: Prescription) => {
    navigate('/', { state: { prescription } });
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePrescription(id);
      setPrescriptions(prescriptions.filter(p => p._id !== id));
    } catch (error) {
      alert('Failed to delete prescription');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <main className="container mx-auto p-6">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>
        <PrescriptionsList
          prescriptions={prescriptions}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}