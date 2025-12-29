const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface Prescription {
  _id: string;
  patientData: {
    name: string;
    age: string;
    gender: string;
    diagnosis: string;
    date: string;
  };
  medicines: {
    id: number;
    name: string;
    dose: string;
  }[];
  note: string;
}

export const getPrescriptions = (): Promise<Prescription[]> =>
  fetch(`${API_BASE}/prescriptions`).then(res => res.json());

export const getPrescription = (id: string): Promise<Prescription> =>
  fetch(`${API_BASE}/prescriptions/${id}`).then(res => res.json());

export const createPrescription = (data: Omit<Prescription, '_id'>): Promise<Prescription> =>
  fetch(`${API_BASE}/prescriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updatePrescription = (id: string, data: Omit<Prescription, '_id'>): Promise<Prescription> =>
  fetch(`${API_BASE}/prescriptions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deletePrescription = (id: string): Promise<void> =>
  fetch(`${API_BASE}/prescriptions/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) throw new Error('Failed to delete');
  });