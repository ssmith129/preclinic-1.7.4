import React from 'react';
import { Link } from 'react-router';
import { Card, Avatar, Tag, Tooltip } from 'antd';
import { TriagePriorityBadge } from './TriagePriorityBadge';
import { AcuityScoreWidget } from './AcuityScoreWidget';
import { VitalsData } from '../../../core/redux/triageSlice';
import { all_routes } from '../../routes/all_routes';

interface PatientQueueCardProps {
  patientId: string;
  patientName: string;
  patientImage?: string;
  symptoms: string[];
  vitals?: VitalsData;
  waitTime: number;
  checkInTime: string;
  showDetails?: boolean;
  onViewDetails?: (patientId: string) => void;
}

const formatWaitTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
};

const getWaitTimeClass = (minutes: number): string => {
  if (minutes >= 120) return 'wait-time--critical';
  if (minutes >= 60) return 'wait-time--warning';
  return 'wait-time--normal';
};

export const PatientQueueCard: React.FC<PatientQueueCardProps> = ({
  patientId,
  patientName,
  patientImage,
  symptoms,
  vitals,
  waitTime,
  checkInTime,
  showDetails = false,
  onViewDetails
}) => {
  const checkInDate = new Date(checkInTime);
  const formattedCheckIn = checkInDate.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <Card className="patient-queue-card mb-3" size="small">
      <div className="patient-queue-header d-flex align-items-start justify-content-between">
        <div className="patient-info d-flex align-items-center">
          <Avatar 
            src={patientImage} 
            size={48}
            className="me-3"
          >
            {patientName.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Link 
              to={all_routes.patientappointmentdetails}
              className="patient-name fw-bold text-dark d-block"
            >
              {patientName}
            </Link>
            <span className="patient-id text-muted fs-12">ID: {patientId}</span>
          </div>
        </div>
        
        <TriagePriorityBadge
          patientId={patientId}
          symptoms={symptoms}
          vitals={vitals}
          waitTime={waitTime}
        />
      </div>

      <div className="patient-queue-body mt-3">
        <div className="patient-timing d-flex align-items-center gap-3 mb-3">
          <Tooltip title="Check-in time">
            <div className="check-in-time d-flex align-items-center">
              <i className="ti ti-clock me-1 text-muted" />
              <span className="fs-13">{formattedCheckIn}</span>
            </div>
          </Tooltip>
          
          <Tooltip title="Wait time">
            <div className={`wait-time d-flex align-items-center ${getWaitTimeClass(waitTime)}`}>
              <i className="ti ti-hourglass me-1" />
              <span className="fs-13 fw-medium">{formatWaitTime(waitTime)}</span>
            </div>
          </Tooltip>
        </div>

        {symptoms.length > 0 && (
          <div className="patient-symptoms mb-3">
            <span className="fs-12 text-muted d-block mb-2">Presenting Symptoms:</span>
            <div className="d-flex flex-wrap gap-1">
              {symptoms.slice(0, 4).map((symptom, index) => (
                <Tag key={index} className="symptom-tag fs-12">
                  {symptom}
                </Tag>
              ))}
              {symptoms.length > 4 && (
                <Tooltip title={symptoms.slice(4).join(', ')}>
                  <Tag className="symptom-tag symptom-tag--more fs-12">
                    +{symptoms.length - 4} more
                  </Tag>
                </Tooltip>
              )}
            </div>
          </div>
        )}

        {vitals && (
          <div className="patient-vitals">
            <span className="fs-12 text-muted d-block mb-2">Vitals:</span>
            <div className="d-flex flex-wrap gap-2">
              {vitals.heartRate && (
                <span className="vital-item fs-12">
                  <i className="ti ti-heartbeat me-1 text-danger" />
                  {vitals.heartRate} bpm
                </span>
              )}
              {vitals.bloodPressureSystolic && vitals.bloodPressureDiastolic && (
                <span className="vital-item fs-12">
                  <i className="ti ti-activity me-1 text-primary" />
                  {vitals.bloodPressureSystolic}/{vitals.bloodPressureDiastolic}
                </span>
              )}
              {vitals.temperature && (
                <span className="vital-item fs-12">
                  <i className="ti ti-temperature me-1 text-warning" />
                  {vitals.temperature}°C
                </span>
              )}
              {vitals.oxygenSaturation && (
                <span className="vital-item fs-12">
                  <i className="ti ti-lungs me-1 text-info" />
                  {vitals.oxygenSaturation}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {showDetails && (
        <div className="patient-queue-details mt-3 pt-3 border-top">
          <AcuityScoreWidget patientId={patientId} showFactors={true} />
        </div>
      )}

      <div className="patient-queue-actions mt-3 pt-3 border-top d-flex justify-content-end gap-2">
        <button 
          className="btn btn-sm btn-light"
          onClick={() => onViewDetails?.(patientId)}
        >
          <i className="ti ti-eye me-1" />
          View Details
        </button>
        <Link 
          to={all_routes.patientappointmentdetails}
          className="btn btn-sm btn-primary"
        >
          <i className="ti ti-stethoscope me-1" />
          Start Assessment
        </Link>
      </div>
    </Card>
  );
};

export default PatientQueueCard;
