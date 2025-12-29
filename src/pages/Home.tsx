import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import PatientForm, { PatientData } from '../components/PatientForm';
import MedicinesSection from '../components/MedicinesSection';
import PrescriptionPreview from '../components/PrescriptionPreview';
import Button from '../components/Button';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Prescription, createPrescription } from '../services/api';

interface Medicine {
  id: number;
  name: string;
  dose: string;
}

export default function Home() {
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    age: '',
    gender: 'Male',
    diagnosis: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: '', dose: '' },
  ]);
  const [note, setNote] = useState('');
  const prescriptionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.prescription) {
      const prescription: Prescription = location.state.prescription;
      setPatientData(prescription.patientData);
      setMedicines(prescription.medicines);
      setNote(prescription.note);
    }
  }, [location.state]);

  const handlePrint = useReactToPrint({
    contentRef: prescriptionRef,
  });

  const handleDownloadPDF = async () => {
    if (prescriptionRef.current) {
      const canvas = await html2canvas(prescriptionRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('prescription.pdf');
    }
  };

  const handleClearForm = () => {
    setPatientData({
      name: '',
      age: '',
      gender: 'Male',
      diagnosis: '',
      date: new Date().toISOString().split('T')[0],
    });
    setMedicines([{ id: 1, name: '', dose: '' }]);
    setNote('');
  };

  const handleSave = async () => {
    try {
      await createPrescription({ patientData, medicines, note });
      alert('Prescription saved successfully!');
    } catch (error) {
      alert('Failed to save prescription');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <PatientForm onChange={setPatientData} />
            <MedicinesSection onChange={setMedicines} />
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter any additional notes"
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSave} variant="primary">
                Save Prescription
              </Button>
              <Button onClick={handleDownloadPDF}>
                Download PDF
              </Button>
              <Button onClick={handlePrint}>
                Print
              </Button>
              <Button onClick={handleClearForm} variant="ghost" className="text-red-600">
                Clear Form
              </Button>
            </div>
          </div>
          <div>
            <PrescriptionPreview
              ref={prescriptionRef}
              patientData={patientData}
              medicines={medicines}
              note={note}
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to="/prescriptions" className="text-blue-600 hover:underline">
            View Saved Prescriptions
          </Link>
        </div>
      </main>
    </div>
  );
}