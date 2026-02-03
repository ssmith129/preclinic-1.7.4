import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

// Types
export interface PatientHandoff {
  patientId: string;
  patientName: string;
  condition: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
  assignedNurse?: string;
}

export interface SBARReport {
  patientId: string;
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  generatedAt: number;
}

export interface ShiftEvent {
  id: string;
  timestamp: number;
  eventType: string;
  description: string;
  patientId?: string;
}

export interface ShiftHandoffState {
  currentShift: {
    id: string | null;
    startTime: number | null;
    endTime: number | null;
    patients: PatientHandoff[];
    events: ShiftEvent[];
  };
  sbarReports: Record<string, SBARReport>;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ShiftHandoffState = {
  currentShift: {
    id: null,
    startTime: null,
    endTime: null,
    patients: [],
    events: [],
  },
  sbarReports: {},
  loading: false,
  error: null,
};

// Async Thunks
export const generateSBARReport = createAsyncThunk(
  'shiftHandoff/generateSBARReport',
  async (patientId: string) => {
    // TODO: Integrate with shiftHandoffMockApi
    return {
      patientId,
      situation: '',
      background: '',
      assessment: '',
      recommendation: '',
      generatedAt: Date.now(),
    } as SBARReport;
  }
);

export const loadShiftData = createAsyncThunk(
  'shiftHandoff/loadShiftData',
  async (shiftId: string) => {
    // TODO: Integrate with shiftHandoffMockApi
    return {
      id: shiftId,
      startTime: Date.now(),
      endTime: null,
      patients: [] as PatientHandoff[],
      events: [] as ShiftEvent[],
    };
  }
);

// Slice
const shiftHandoffSlice = createSlice({
  name: 'shiftHandoff',
  initialState,
  reducers: {
    setCurrentShift: (
      state,
      action: PayloadAction<{ id: string; startTime: number }>
    ) => {
      state.currentShift.id = action.payload.id;
      state.currentShift.startTime = action.payload.startTime;
    },
    addPatientToHandoff: (state, action: PayloadAction<PatientHandoff>) => {
      state.currentShift.patients.push(action.payload);
    },
    removePatientFromHandoff: (state, action: PayloadAction<string>) => {
      state.currentShift.patients = state.currentShift.patients.filter(
        (p) => p.patientId !== action.payload
      );
    },
    addShiftEvent: (state, action: PayloadAction<ShiftEvent>) => {
      state.currentShift.events.push(action.payload);
    },
    updateSBARReport: (state, action: PayloadAction<SBARReport>) => {
      state.sbarReports[action.payload.patientId] = action.payload;
    },
    clearShiftData: (state) => {
      state.currentShift = initialState.currentShift;
      state.sbarReports = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSBARReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSBARReport.fulfilled, (state, action) => {
        state.loading = false;
        state.sbarReports[action.payload.patientId] = action.payload;
      })
      .addCase(generateSBARReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to generate SBAR report';
      })
      .addCase(loadShiftData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadShiftData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShift = action.payload;
      })
      .addCase(loadShiftData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load shift data';
      });
  },
});

export const {
  setCurrentShift,
  addPatientToHandoff,
  removePatientFromHandoff,
  addShiftEvent,
  updateSBARReport,
  clearShiftData,
} = shiftHandoffSlice.actions;

export default shiftHandoffSlice.reducer;
