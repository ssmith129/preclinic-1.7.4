/**
 * Feature 7: AI-Powered Shift Handoff - Mock API
 * Simulates API calls for shift handoff functionality
 */

import type {
  PatientHandoff,
  SBARReport,
  ShiftEvent,
} from '../../redux/shiftHandoffSlice';

// Simulated delay for API calls
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const mockPatients: PatientHandoff[] = [
  {
    patientId: 'P001',
    patientName: 'John Smith',
    condition: 'Post-operative recovery',
    priority: 'medium',
    notes: 'Vitals stable, continue monitoring',
    assignedNurse: 'Nurse A',
  },
  {
    patientId: 'P002',
    patientName: 'Jane Doe',
    condition: 'Diabetic ketoacidosis',
    priority: 'high',
    notes: 'Blood glucose levels improving',
    assignedNurse: 'Nurse A',
  },
];

const mockEvents: ShiftEvent[] = [
  {
    id: 'E001',
    timestamp: Date.now() - 3600000,
    eventType: 'medication',
    description: 'Administered insulin to P002',
    patientId: 'P002',
  },
  {
    id: 'E002',
    timestamp: Date.now() - 1800000,
    eventType: 'vitals',
    description: 'Recorded vital signs for P001',
    patientId: 'P001',
  },
];

/**
 * Get shift data for handoff
 */
export const getShiftData = async (shiftId: string) => {
  await simulateDelay();
  return {
    id: shiftId,
    startTime: Date.now() - 28800000, // 8 hours ago
    endTime: null,
    patients: mockPatients,
    events: mockEvents,
  };
};

/**
 * Generate AI-powered SBAR report for a patient
 */
export const generateSBAR = async (patientId: string): Promise<SBARReport> => {
  await simulateDelay(1000);
  
  const patient = mockPatients.find((p) => p.patientId === patientId);
  
  return {
    patientId,
    situation: `Patient ${patient?.patientName || 'Unknown'} is currently ${
      patient?.condition || 'under observation'
    }.`,
    background: 'Patient was admitted 2 days ago. Medical history includes...',
    assessment: `Current status: ${patient?.priority || 'stable'}. ${
      patient?.notes || 'No additional notes.'
    }`,
    recommendation:
      'Continue current treatment plan. Monitor vitals every 4 hours.',
    generatedAt: Date.now(),
  };
};

/**
 * Get all patients for current shift
 */
export const getShiftPatients = async (): Promise<PatientHandoff[]> => {
  await simulateDelay();
  return mockPatients;
};

/**
 * Get shift events/timeline
 */
export const getShiftEvents = async (shiftId: string): Promise<ShiftEvent[]> => {
  await simulateDelay();
  return mockEvents;
};

/**
 * Complete shift handoff
 */
export const completeHandoff = async (
  shiftId: string,
  receivingNurseId: string
) => {
  await simulateDelay();
  return {
    success: true,
    handoffId: `HO-${Date.now()}`,
    completedAt: Date.now(),
    receivingNurseId,
  };
};

/**
 * Add event to shift timeline
 */
export const addEventToShift = async (
  shiftId: string,
  event: Omit<ShiftEvent, 'id'>
): Promise<ShiftEvent> => {
  await simulateDelay();
  return {
    ...event,
    id: `E${Date.now()}`,
  };
};
