"use client"

import React from 'react';
import PatientList from '../../../components/patients/PatientList';

export default function PatientsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-950">Patients</h1>
        <p className="text-gray-600">Manage your patient records and information</p>
      </div>
      <div className="bg-white">
        <PatientList />
      </div>
    </div>
  );
}