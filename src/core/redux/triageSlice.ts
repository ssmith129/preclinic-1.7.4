import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VitalsData {
  heartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  temperature?: number;
  oxygenSaturation?: number;
  respiratoryRate?: number;
}

export interface AcuityScore {
  priority: 1 | 2 | 3 | 4 | 5;
  confidence: number;
  factors: string[];
  lastUpdated: string;
}

export interface PatientQueueItem {
  patientId: string;
  patientName: string;
  symptoms: string[];
  vitals?: VitalsData;
  waitTime: number;
  checkInTime: string;
  acuityScore?: AcuityScore;
}

interface TriageState {
  acuityScores: Record<string, AcuityScore>;
  patientQueue: PatientQueueItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TriageState = {
  acuityScores: {},
  patientQueue: [],
  isLoading: false,
  error: null,
};

const triageSlice = createSlice({
  name: "triage",
  initialState,
  reducers: {
    updateAcuityScore: (
      state,
      action: PayloadAction<{
        patientId: string;
        priority: 1 | 2 | 3 | 4 | 5;
        confidence: number;
        factors: string[];
      }>
    ) => {
      const { patientId, priority, confidence, factors } = action.payload;
      state.acuityScores[patientId] = {
        priority,
        confidence,
        factors,
        lastUpdated: new Date().toISOString(),
      };
    },
    setPatientQueue: (state, action: PayloadAction<PatientQueueItem[]>) => {
      state.patientQueue = action.payload;
    },
    addPatientToQueue: (state, action: PayloadAction<PatientQueueItem>) => {
      state.patientQueue.push(action.payload);
    },
    removePatientFromQueue: (state, action: PayloadAction<string>) => {
      state.patientQueue = state.patientQueue.filter(
        (patient) => patient.patientId !== action.payload
      );
    },
    updatePatientWaitTime: (
      state,
      action: PayloadAction<{ patientId: string; waitTime: number }>
    ) => {
      const patient = state.patientQueue.find(
        (p) => p.patientId === action.payload.patientId
      );
      if (patient) {
        patient.waitTime = action.payload.waitTime;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAcuityScores: (state) => {
      state.acuityScores = {};
    },
  },
});

export const {
  updateAcuityScore,
  setPatientQueue,
  addPatientToQueue,
  removePatientFromQueue,
  updatePatientWaitTime,
  setLoading,
  setError,
  clearAcuityScores,
} = triageSlice.actions;

export default triageSlice.reducer;
