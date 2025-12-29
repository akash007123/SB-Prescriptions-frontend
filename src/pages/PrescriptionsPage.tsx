import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PrescriptionsList from '../components/PrescriptionsList';
import PrescriptionPreview from '../components/PrescriptionPreview';
import Modal from '../components/Modal';
import { useReactToPrint } from 'react-to-print';
import { Prescription, getPrescriptions, deletePrescription } from '../services/api';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [printPrescription, setPrintPrescription] = useState<Prescription | null>(null);
  const [previewPrescription, setPreviewPrescription] = useState<Prescription | null>(null);
  const prescriptionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleActualPrint = useReactToPrint({
    contentRef: prescriptionRef,
  });

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

  const handlePrint = (prescription: Prescription) => {
    setPrintPrescription(prescription);
  };

  const handlePreview = (prescription: Prescription) => {
    setPreviewPrescription(prescription);
  };

  const handleClosePrint = () => {
    setPrintPrescription(null);
  };

  const handleClosePreview = () => {
    setPreviewPrescription(null);
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
          onPrint={handlePrint}
          onPreview={handlePreview}
        />
      </main>
      <Modal open={!!printPrescription} onClose={handleClosePrint}>
        {printPrescription && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Print Prescription</h2>
              <button onClick={handleActualPrint} className="bg-blue-600 text-white px-4 py-2 rounded">
                Print
              </button>
            </div>
            <PrescriptionPreview
              ref={prescriptionRef}
              patientData={printPrescription.patientData}
              medicines={printPrescription.medicines}
              note={printPrescription.note}
            />
          </div>
        )}
      </Modal>
      <Modal open={!!previewPrescription} onClose={handleClosePreview}>
        {previewPrescription && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Preview Prescription</h2>
            <PrescriptionPreview
              patientData={previewPrescription.patientData}
              medicines={previewPrescription.medicines}
              note={previewPrescription.note}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}