import React from 'react';

interface PatientHandoffData {
  patientId: string;
  patientName: string;
  condition: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
}

interface PatientHandoffCardProps {
  patient?: PatientHandoffData;
  onClick?: () => void;
}

/**
 * Feature 7: Patient Handoff Card
 * Displays individual patient information for shift handoff
 */
const PatientHandoffCard: React.FC<PatientHandoffCardProps> = ({
  patient,
  onClick,
}) => {
  // TODO: Implement patient handoff card logic
  return (
    <div className="patient-handoff-card" onClick={onClick}>
      <h4>{patient?.patientName || 'Patient Name'}</h4>
      <p>Condition: {patient?.condition || 'N/A'}</p>
      <span className={`priority-badge priority-${patient?.priority || 'low'}`}>
        {patient?.priority || 'low'}
      </span>
      {/* Placeholder for future implementation */}
    </div>
  );
};

export default PatientHandoffCard;
