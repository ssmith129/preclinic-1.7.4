{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 markdown\
\
# PreClinic Platform\
## AI Features Implementation Guide\
### *Detailed Technical Specifications & Code*\
\
---\
\
**Features Covered:**\
- Feature 7: AI-Powered Shift Handoff\
- Feature 9: Voice Documentation Assistant\
- Feature 10: Drug Interaction Checker\
**Date:** February 2026  \
**Version:** 2.0\
\
---\
\
## \uc0\u55357 \u56513  Project Structure\
\
Before implementing the features, establish the following directory structure:\
\
```\
src/\
\uc0\u9500 \u9472 \u9472  feature-module/\
\uc0\u9474    \u9492 \u9472 \u9472  components/\
\uc0\u9474        \u9492 \u9472 \u9472  ai/\
\uc0\u9474            \u9500 \u9472 \u9472  shift-handoff/\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  ShiftHandoffSummary.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  SBARGenerator.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  PatientHandoffCard.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  HandoffTimeline.tsx\
\uc0\u9474            \u9500 \u9472 \u9472  voice-documentation/\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  VoiceRecorder.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  TranscriptionEditor.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  NoteFormatter.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  MedicalTermsHighlighter.tsx\
\uc0\u9474            \u9500 \u9472 \u9472  drug-interaction/\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  DrugInteractionChecker.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  InteractionAlert.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  MedicationReviewPanel.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  SeverityBadge.tsx\
\uc0\u9474            \u9500 \u9472 \u9472  patient-summary/\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  PatientHistorySummarizer.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  DiagnosisTimeline.tsx\
\uc0\u9474            \u9474    \u9500 \u9472 \u9472  TreatmentHighlights.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  TrendAnalysisChart.tsx\
\uc0\u9474            \u9492 \u9472 \u9472  ai-assistant/\
\uc0\u9474                \u9500 \u9472 \u9472  AIAssistantButton.tsx\
\uc0\u9474                \u9500 \u9472 \u9472  AIAssistantPopup.tsx\
\uc0\u9474                \u9500 \u9472 \u9472  AssistantChatInterface.tsx\
\uc0\u9474                \u9500 \u9472 \u9472  QuickActionCards.tsx\
\uc0\u9474                \u9492 \u9472 \u9472  NavigationHelper.tsx\
\uc0\u9500 \u9472 \u9472  core/\
\uc0\u9474    \u9500 \u9472 \u9472  redux/\
\uc0\u9474    \u9474    \u9500 \u9472 \u9472  shiftHandoffSlice.ts\
\uc0\u9474    \u9474    \u9500 \u9472 \u9472  voiceDocSlice.ts\
\uc0\u9474    \u9474    \u9500 \u9472 \u9472  drugInteractionSlice.ts\
\uc0\u9474    \u9474    \u9500 \u9472 \u9472  patientSummarySlice.ts\
\uc0\u9474    \u9474    \u9492 \u9472 \u9472  aiAssistantSlice.ts\
\uc0\u9474    \u9500 \u9472 \u9472  api/\
\uc0\u9474    \u9474    \u9492 \u9472 \u9472  mock/\
\uc0\u9474    \u9474        \u9500 \u9472 \u9472  shiftHandoffMockApi.ts\
\uc0\u9474    \u9474        \u9500 \u9472 \u9472  voiceDocMockApi.ts\
\uc0\u9474    \u9474        \u9500 \u9472 \u9472  drugInteractionMockApi.ts\
\uc0\u9474    \u9474        \u9500 \u9472 \u9472  patientSummaryMockApi.ts\
\uc0\u9474    \u9474        \u9492 \u9472 \u9472  aiAssistantMockApi.ts\
\uc0\u9474    \u9492 \u9472 \u9472  hooks/\
\uc0\u9474        \u9500 \u9472 \u9472  useVoiceRecognition.ts\
\uc0\u9474        \u9500 \u9472 \u9472  useDrugInteraction.ts\
\uc0\u9474        \u9492 \u9472 \u9472  useAIAssistant.ts\
\uc0\u9492 \u9472 \u9472  style/\
    \uc0\u9492 \u9472 \u9472  scss/\
        \uc0\u9492 \u9472 \u9472  components/\
            \uc0\u9492 \u9472 \u9472  ai/\
                \uc0\u9500 \u9472 \u9472  _shift-handoff.scss\
                \uc0\u9500 \u9472 \u9472  _voice-documentation.scss\
                \uc0\u9500 \u9472 \u9472  _drug-interaction.scss\
                \uc0\u9500 \u9472 \u9472  _patient-summary.scss\
                \uc0\u9492 \u9472 \u9472  _ai-assistant.scss\
\
## Feature 7: AI-Powered Shift Handoff\
\
### Problem Statement\
\
Manual shift handoffs between nursing staff are time-consuming (15-30 minutes per shift) and prone to information gaps. Critical patient details may be missed, leading to delayed interventions or duplicated efforts. There's no standardized format ensuring consistent communication quality.\
\
### AI Solution\
\
Implement an automated SBAR (Situation, Background, Assessment, Recommendation) generation system that:\
- Aggregates patient data from the past 8-12 hours\
- Identifies critical changes and trends using NLP\
- Generates structured handoff summaries\
- Highlights priority patients requiring immediate attention\
- Provides audio playback option for hands-free review\
\
### Technical Requirements\
\
| Component | Description |\
|-----------|-------------|\
| **React Components** | `ShiftHandoffSummary.tsx`, `SBARGenerator.tsx`, `PatientHandoffCard.tsx`, `HandoffTimeline.tsx` |\
| **Redux Slice** | `shiftHandoffSlice.ts` (handoff data, generation status, preferences) |\
| **API Endpoints** | `POST /api/handoff/generate`, `GET /api/handoff/patients/:shiftId`, `PUT /api/handoff/acknowledge` |\
| **AI Integration** | GPT-4 for narrative generation, custom model for priority scoring |\
\
### Mock API Engine\
\
```typescript\
// src/core/api/mock/shiftHandoffMockApi.ts\
import \{ v4 as uuidv4 \} from 'uuid';\
\
export interface PatientHandoff \{\
  patientId: string;\
  patientName: string;\
  room: string;\
  age: number;\
  admissionDate: string;\
  primaryDiagnosis: string;\
  priorityLevel: 'critical' | 'high' | 'moderate' | 'stable';\
  sbar: \{\
    situation: string;\
    background: string;\
    assessment: string;\
    recommendation: string;\
  \};\
  vitalsTrend: \{\
    metric: string;\
    values: number[];\
    timestamps: string[];\
    trend: 'improving' | 'stable' | 'declining';\
  \}[];\
  recentEvents: \{\
    time: string;\
    event: string;\
    severity: 'info' | 'warning' | 'critical';\
  \}[];\
  pendingTasks: string[];\
  medications: \{\
    name: string;\
    dose: string;\
    nextDue: string;\
    notes?: string;\
  \}[];\
\}\
\
export interface ShiftHandoffReport \{\
  reportId: string;\
  generatedAt: string;\
  shiftType: 'day' | 'evening' | 'night';\
  outgoingNurse: \{ id: string; name: string \};\
  incomingNurse: \{ id: string; name: string \};\
  unitName: string;\
  totalPatients: number;\
  criticalPatients: number;\
  patients: PatientHandoff[];\
  summaryNarrative: string;\
  audioUrl?: string;\
\}\
\
// Mock patient data generator\
const generateMockPatientHandoff = (index: number): PatientHandoff => \{\
  const priorities: PatientHandoff['priorityLevel'][] = ['critical', 'high', 'moderate', 'stable'];\
  const diagnoses = [\
    'Pneumonia with respiratory distress',\
    'Post-operative hip replacement - Day 2',\
    'Diabetic ketoacidosis - resolving',\
    'Congestive heart failure exacerbation',\
    'Acute appendicitis - post-appendectomy',\
    'Stroke - left MCA territory',\
    'COPD exacerbation',\
    'Sepsis - improving on antibiotics'\
  ];\
\
  const priority = priorities[Math.min(index, 3)];\
  \
  const sbarTemplates = \{\
    critical: \{\
      situation: `Patient experiencing acute respiratory distress with SpO2 dropping to 88% on 4L NC. RR elevated to 28. Patient appears anxious and using accessory muscles.`,\
      background: `72-year-old male admitted 3 days ago with community-acquired pneumonia. History of COPD, HTN, and type 2 diabetes. Was stable on 2L NC until 2 hours ago.`,\
      assessment: `Likely worsening pneumonia vs. new PE. Current ABG shows respiratory acidosis. Chest X-ray pending. Patient is at high risk for intubation.`,\
      recommendation: `Increase O2 to high-flow NC, stat ABG in 1 hour, prepare for possible BiPAP or intubation. Notify physician immediately if SpO2 drops below 85%.`\
    \},\
    high: \{\
      situation: `Patient reporting increased pain at surgical site (7/10) despite scheduled pain medication. Mild fever of 100.8\'b0F noted this shift.`,\
      background: `58-year-old female, POD 2 from total hip arthroplasty. No known allergies. Was ambulating well yesterday with PT.`,\
      assessment: `Pain increase and low-grade fever concerning for possible surgical site infection. Incision appears slightly erythematous.`,\
      recommendation: `Monitor temp q4h, obtain wound culture if drainage noted, contact orthopedics if fever persists. Continue current pain management protocol.`\
    \},\
    moderate: \{\
      situation: `Patient's blood glucose levels fluctuating between 180-320 mg/dL despite sliding scale insulin adjustments.`,\
      background: `45-year-old male admitted for DKA, now resolved. A1C on admission was 12.4%. New to insulin therapy.`,\
      assessment: `Glycemic control improving but not yet optimal. Patient anxious about self-injection and carb counting.`,\
      recommendation: `Continue current insulin regimen, diabetes educator consult scheduled for tomorrow. Reinforce teaching on injection technique.`\
    \},\
    stable: \{\
      situation: `Patient resting comfortably, vital signs stable throughout shift. Tolerating regular diet, ambulating independently.`,\
      background: `34-year-old female, POD 1 from laparoscopic cholecystectomy. No complications intraoperatively.`,\
      assessment: `Recovering as expected. Pain well-controlled with oral medications. Ready for discharge pending surgeon evaluation.`,\
      recommendation: `Continue current care plan. Anticipate discharge today after surgical team rounds. Ensure discharge instructions reviewed.`\
    \}\
  \};\
\
  return \{\
    patientId: uuidv4(),\
    patientName: `Patient $\{String.fromCharCode(65 + index)\}. $\{['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][index % 8]\}`,\
    room: `$\{Math.floor(200 + index * 2)\}$\{['A', 'B'][index % 2]\}`,\
    age: 35 + Math.floor(Math.random() * 50),\
    admissionDate: new Date(Date.now() - (Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),\
    primaryDiagnosis: diagnoses[index % diagnoses.length],\
    priorityLevel: priority,\
    sbar: sbarTemplates[priority],\
    vitalsTrend: [\
      \{\
        metric: 'Heart Rate',\
        values: Array.from(\{ length: 6 \}, () => 70 + Math.floor(Math.random() * 30)),\
        timestamps: Array.from(\{ length: 6 \}, (_, i) => \
          new Date(Date.now() - (5 - i) * 2 * 60 * 60 * 1000).toISOString()\
        ),\
        trend: ['improving', 'stable', 'declining'][Math.floor(Math.random() * 3)] as any\
      \},\
      \{\
        metric: 'Blood Pressure',\
        values: Array.from(\{ length: 6 \}, () => 110 + Math.floor(Math.random() * 40)),\
        timestamps: Array.from(\{ length: 6 \}, (_, i) => \
          new Date(Date.now() - (5 - i) * 2 * 60 * 60 * 1000).toISOString()\
        ),\
        trend: ['improving', 'stable', 'declining'][Math.floor(Math.random() * 3)] as any\
      \}\
    ],\
    recentEvents: [\
      \{ time: '14:30', event: 'Medication administered - Lisinopril 10mg', severity: 'info' \},\
      \{ time: '12:00', event: 'Patient ambulated 100ft with assistance', severity: 'info' \},\
      ...(priority === 'critical' ? [\{ time: '15:45', event: 'Rapid Response Team called', severity: 'critical' as const \}] : [])\
    ],\
    pendingTasks: [\
      'Evening vitals due at 20:00',\
      'Blood glucose check before dinner',\
      ...(priority !== 'stable' ? ['Physician notification required'] : [])\
    ],\
    medications: [\
      \{ name: 'Metoprolol', dose: '25mg PO', nextDue: '20:00', notes: 'Hold if HR < 60' \},\
      \{ name: 'Insulin Glargine', dose: '20 units SC', nextDue: '21:00' \},\
      \{ name: 'Acetaminophen', dose: '650mg PO', nextDue: 'PRN', notes: 'Q6H for pain' \}\
    ]\
  \};\
\};\
\
// Simulate AI narrative generation\
const generateSummaryNarrative = (patients: PatientHandoff[]): string => \{\
  const critical = patients.filter(p => p.priorityLevel === 'critical').length;\
  const high = patients.filter(p => p.priorityLevel === 'high').length;\
  \
  return `This shift report covers $\{patients.length\} patients on the Medical-Surgical unit. ` +\
    `$\{critical > 0 ? `\uc0\u9888 \u65039  $\{critical\} patient(s) require immediate attention. ` : ''\}` +\
    `$\{high > 0 ? `$\{high\} patient(s) are flagged as high priority. ` : ''\}` +\
    `Key concerns this shift include respiratory status monitoring for Room 200A, ` +\
    `post-operative pain management in Room 202B, and glycemic control for Room 204A. ` +\
    `All scheduled medications have been administered. ` +\
    `No falls or safety incidents occurred during this shift.`;\
\};\
\
// Mock API functions\
export const shiftHandoffMockApi = \{\
  generateHandoffReport: async (params: \{\
    outgoingNurseId: string;\
    incomingNurseId: string;\
    shiftType: 'day' | 'evening' | 'night';\
    unitId: string;\
  \}): Promise => \{\
    // Simulate API delay\
    await new Promise(resolve => setTimeout(resolve, 1500));\
\
    const patientCount = 4 + Math.floor(Math.random() * 4);\
    const patients = Array.from(\{ length: patientCount \}, (_, i) => generateMockPatientHandoff(i));\
    \
    // Sort by priority\
    patients.sort((a, b) => \{\
      const priorityOrder = \{ critical: 0, high: 1, moderate: 2, stable: 3 \};\
      return priorityOrder[a.priorityLevel] - priorityOrder[b.priorityLevel];\
    \});\
\
    return \{\
      reportId: uuidv4(),\
      generatedAt: new Date().toISOString(),\
      shiftType: params.shiftType,\
      outgoingNurse: \{ id: params.outgoingNurseId, name: 'Sarah Mitchell, RN' \},\
      incomingNurse: \{ id: params.incomingNurseId, name: 'James Chen, RN' \},\
      unitName: 'Medical-Surgical Unit 3B',\
      totalPatients: patients.length,\
      criticalPatients: patients.filter(p => p.priorityLevel === 'critical').length,\
      patients,\
      summaryNarrative: generateSummaryNarrative(patients),\
      audioUrl: '/api/audio/handoff-summary.mp3'\
    \};\
  \},\
\
  acknowledgeHandoff: async (reportId: string, nurseId: string): Promise => \{\
    await new Promise(resolve => setTimeout(resolve, 500));\
    return \{\
      success: true,\
      timestamp: new Date().toISOString()\
    \};\
  \},\
\
  getHandoffHistory: async (nurseId: string, days: number = 7): Promise => \{\
    await new Promise(resolve => setTimeout(resolve, 800));\
    return []; // Return empty for mock\
  \}\
\};\
```\
\
### Redux Slice\
\
```typescript\
// src/core/redux/shiftHandoffSlice.ts\
import \{ createSlice, createAsyncThunk, PayloadAction \} from '@reduxjs/toolkit';\
import \{ shiftHandoffMockApi, ShiftHandoffReport, PatientHandoff \} from '../api/mock/shiftHandoffMockApi';\
\
interface ShiftHandoffState \{\
  currentReport: ShiftHandoffReport | null;\
  isGenerating: boolean;\
  isAcknowledged: boolean;\
  selectedPatient: PatientHandoff | null;\
  audioPlaying: boolean;\
  error: string | null;\
  preferences: \{\
    autoPlayAudio: boolean;\
    expandedView: boolean;\
    showVitalsTrends: boolean;\
  \};\
\}\
\
const initialState: ShiftHandoffState = \{\
  currentReport: null,\
  isGenerating: false,\
  isAcknowledged: false,\
  selectedPatient: null,\
  audioPlaying: false,\
  error: null,\
  preferences: \{\
    autoPlayAudio: false,\
    expandedView: true,\
    showVitalsTrends: true\
  \}\
\};\
\
export const generateHandoffReport = createAsyncThunk(\
  'shiftHandoff/generate',\
  async (params: \{\
    outgoingNurseId: string;\
    incomingNurseId: string;\
    shiftType: 'day' | 'evening' | 'night';\
    unitId: string;\
  \}) => \{\
    return await shiftHandoffMockApi.generateHandoffReport(params);\
  \}\
);\
\
export const acknowledgeHandoff = createAsyncThunk(\
  'shiftHandoff/acknowledge',\
  async (params: \{ reportId: string; nurseId: string \}) => \{\
    return await shiftHandoffMockApi.acknowledgeHandoff(params.reportId, params.nurseId);\
  \}\
);\
\
const shiftHandoffSlice = createSlice(\{\
  name: 'shiftHandoff',\
  initialState,\
  reducers: \{\
    selectPatient: (state, action: PayloadAction) => \{\
      state.selectedPatient = action.payload;\
    \},\
    toggleAudio: (state) => \{\
      state.audioPlaying = !state.audioPlaying;\
    \},\
    updatePreferences: (state, action: PayloadAction<Partial>) => \{\
      state.preferences = \{ ...state.preferences, ...action.payload \};\
    \},\
    clearReport: (state) => \{\
      state.currentReport = null;\
      state.isAcknowledged = false;\
      state.selectedPatient = null;\
    \}\
  \},\
  extraReducers: (builder) => \{\
    builder\
      .addCase(generateHandoffReport.pending, (state) => \{\
        state.isGenerating = true;\
        state.error = null;\
      \})\
      .addCase(generateHandoffReport.fulfilled, (state, action) => \{\
        state.isGenerating = false;\
        state.currentReport = action.payload;\
      \})\
      .addCase(generateHandoffReport.rejected, (state, action) => \{\
        state.isGenerating = false;\
        state.error = action.error.message || 'Failed to generate report';\
      \})\
      .addCase(acknowledgeHandoff.fulfilled, (state) => \{\
        state.isAcknowledged = true;\
      \});\
  \}\
\});\
\
export const \{ selectPatient, toggleAudio, updatePreferences, clearReport \} = shiftHandoffSlice.actions;\
export default shiftHandoffSlice.reducer;\
```\
\
### Main Component Implementation\
\
```tsx\
// src/feature-module/components/ai/shift-handoff/ShiftHandoffSummary.tsx\
import React, \{ useEffect, useState \} from 'react';\
import \{ useSelector, useDispatch \} from 'react-redux';\
import \{ \
  Card, \
  Button, \
  Tag, \
  Timeline, \
  Progress, \
  Tooltip, \
  Modal, \
  Spin, \
  Alert,\
  Badge,\
  Tabs,\
  Switch,\
  Statistic,\
  Row,\
  Col\
\} from 'antd';\
import \{\
  SoundOutlined,\
  PauseOutlined,\
  CheckCircleOutlined,\
  ExclamationCircleOutlined,\
  ClockCircleOutlined,\
  UserOutlined,\
  HeartOutlined,\
  MedicineBoxOutlined\
\} from '@ant-design/icons';\
import \{ \
  generateHandoffReport, \
  acknowledgeHandoff, \
  selectPatient, \
  toggleAudio \
\} from '../../../../core/redux/shiftHandoffSlice';\
import \{ PatientHandoffCard \} from './PatientHandoffCard';\
import \{ SBARGenerator \} from './SBARGenerator';\
import \{ HandoffTimeline \} from './HandoffTimeline';\
import type \{ RootState, AppDispatch \} from '../../../../core/redux/store';\
\
const \{ TabPane \} = Tabs;\
\
interface ShiftHandoffSummaryProps \{\
  outgoingNurseId: string;\
  incomingNurseId: string;\
  shiftType: 'day' | 'evening' | 'night';\
  unitId: string;\
\}\
\
const PRIORITY_CONFIG = \{\
  critical: \{ color: '#F44336', icon: , label: 'Critical' \},\
  high: \{ color: '#FF9800', icon: , label: 'High' \},\
  moderate: \{ color: '#FFC107', icon: , label: 'Moderate' \},\
  stable: \{ color: '#4CAF50', icon: , label: 'Stable' \}\
\};\
\
export const ShiftHandoffSummary: React.FC = (\{\
  outgoingNurseId,\
  incomingNurseId,\
  shiftType,\
  unitId\
\}) => \{\
  const dispatch = useDispatch();\
  const \{ \
    currentReport, \
    isGenerating, \
    isAcknowledged, \
    selectedPatient,\
    audioPlaying,\
    preferences,\
    error \
  \} = useSelector((state: RootState) => state.shiftHandoff);\
  \
  const [detailModalVisible, setDetailModalVisible] = useState(false);\
\
  useEffect(() => \{\
    dispatch(generateHandoffReport(\{ outgoingNurseId, incomingNurseId, shiftType, unitId \}));\
  \}, [dispatch, outgoingNurseId, incomingNurseId, shiftType, unitId]);\
\
  const handleAcknowledge = () => \{\
    if (currentReport) \{\
      dispatch(acknowledgeHandoff(\{ reportId: currentReport.reportId, nurseId: incomingNurseId \}));\
    \}\
  \};\
\
  const handlePatientClick = (patient: any) => \{\
    dispatch(selectPatient(patient));\
    setDetailModalVisible(true);\
  \};\
\
  const getShiftLabel = (type: string) => (\{\
    day: '\uc0\u9728 \u65039  Day Shift (7AM - 3PM)',\
    evening: '\uc0\u55356 \u57093  Evening Shift (3PM - 11PM)',\
    night: '\uc0\u55356 \u57113  Night Shift (11PM - 7AM)'\
  \}[type]);\
\
  if (isGenerating) \{\
    return (\
      \
        \
          \
          Generating AI-Powered Shift Handoff Report\
          \
            Analyzing patient data, vital trends, and recent events...\
          \
          \
        \
      \
    );\
  \}\
\
  if (error) \{\
    return (\
      <Alert\
        type="error"\
        message="Failed to Generate Handoff Report"\
        description=\{error\}\
        showIcon\
        action=\{\
          <Button onClick=\{() => dispatch(generateHandoffReport(\{ outgoingNurseId, incomingNurseId, shiftType, unitId \}))\}>\
            Retry\
          \
        \}\
      />\
    );\
  \}\
\
  if (!currentReport) return null;\
\
  return (\
    \
      \{/* Header Section */\}\
      \
        \
          \
            \
              \
                \
              \
              \
                AI-Generated Shift Handoff\
                \
                  \{getShiftLabel(currentReport.shiftType)\} \'95 \{currentReport.unitName\}\
                \
              \
            \
          \
          \
            \
               : \}\
                onClick=\{() => dispatch(toggleAudio())\}\
              >\
                \{audioPlaying ? 'Pause Audio' : 'Play Summary'\}\
              \
              \}\
                onClick=\{handleAcknowledge\}\
                disabled=\{isAcknowledged\}\
              >\
                \{isAcknowledged ? 'Acknowledged \uc0\u10003 ' : 'Acknowledge Handoff'\}\
              \
            \
          \
        \
\
        \{/* Nurse Transfer Info */\}\
        \
          \
            \
              \
                \
                Outgoing: \{currentReport.outgoingNurse.name\}\
              \
            \
            \
              \
            \
            \
              \
                \
                Incoming: \{currentReport.incomingNurse.name\}\
              \
            \
          \
        \
      \
\
      \{/* Statistics Overview */\}\
      \
        \
          \
            \}\
            />\
          \
        \
        \
          \
            \}\
            />\
          \
        \
        \
          \
            <Statistic \
              title="High Priority" \
              value=\{currentReport.patients.filter(p => p.priorityLevel === 'high').length\}\
              valueStyle=\{\{ color: '#FF9800' \}\}\
              prefix=\{\}\
            />\
          \
        \
        \
          \
            <Statistic \
              title="Stable" \
              value=\{currentReport.patients.filter(p => p.priorityLevel === 'stable').length\}\
              valueStyle=\{\{ color: '#4CAF50' \}\}\
              prefix=\{\}\
            />\
          \
        \
      \
\
      \{/* AI Summary Narrative */\}\
      \
        \
          \
            \
          \
          \
            AI Summary\
            \{currentReport.summaryNarrative\}\
          \
        \
      \
\
      \{/* Patient Cards */\}\
      \
        \
          \
            \{currentReport.patients.map((patient) => (\
              \
                <PatientHandoffCard \
                  patient=\{patient\}\
                  onClick=\{() => handlePatientClick(patient)\}\
                  priorityConfig=\{PRIORITY_CONFIG\}\
                />\
              \
            ))\}\
          \
        \
        \
              \
                Critical & High Priority\
              \
            \
          \} \
          key="priority"\
        >\
          \
            \{currentReport.patients\
              .filter(p => p.priorityLevel === 'critical' || p.priorityLevel === 'high')\
              .map((patient) => (\
                \
                  <PatientHandoffCard \
                    patient=\{patient\}\
                    onClick=\{() => handlePatientClick(patient)\}\
                    priorityConfig=\{PRIORITY_CONFIG\}\
                    expanded\
                  />\
                \
              ))\}\
          \
        \
      \
\
      \{/* Patient Detail Modal */\}\
      \
            \
              \{PRIORITY_CONFIG[selectedPatient?.priorityLevel || 'stable'].label\}\
            \
            \{selectedPatient?.patientName\} - Room \{selectedPatient?.room\}\
          \
        \}\
        open=\{detailModalVisible\}\
        onCancel=\{() => setDetailModalVisible(false)\}\
        width=\{800\}\
        footer=\{null\}\
      >\
        \{selectedPatient && (\
          \
        )\}\
      \
    \
  );\
\};\
```\
\
### Patient Handoff Card Component\
\
```tsx\
// src/feature-module/components/ai/shift-handoff/PatientHandoffCard.tsx\
import React from 'react';\
import \{ Card, Tag, Timeline, Progress, Tooltip, List \} from 'antd';\
import \{ \
  HeartOutlined, \
  MedicineBoxOutlined,\
  AlertOutlined,\
  ClockCircleOutlined\
\} from '@ant-design/icons';\
import type \{ PatientHandoff \} from '../../../../core/api/mock/shiftHandoffMockApi';\
\
interface PatientHandoffCardProps \{\
  patient: PatientHandoff;\
  onClick: () => void;\
  priorityConfig: Record;\
  expanded?: boolean;\
\}\
\
export const PatientHandoffCard: React.FC = (\{\
  patient,\
  onClick,\
  priorityConfig,\
  expanded = false\
\}) => \{\
  const config = priorityConfig[patient.priorityLevel];\
  \
  const getTrendIcon = (trend: string) => \{\
    switch (trend) \{\
      case 'improving': return \uc0\u8593 ;\
      case 'declining': return \uc0\u8595 ;\
      default: return \uc0\u8594 ;\
    \}\
  \};\
\
  return (\
    \
      \{/* Header */\}\
      \
        \
          \{patient.patientName\}\
          \
            Room \{patient.room\} \'95 \{patient.age\} y/o\
          \
        \
        \
          \{config.label\}\
        \
      \
\
      \{/* Primary Diagnosis */\}\
      \
        \
        \{patient.primaryDiagnosis\}\
      \
\
      \{/* Quick SBAR Preview */\}\
      \
        \
          S: \{patient.sbar.situation.slice(0, 80)\}...\
        \
      \
\
      \{/* Vitals Trend Indicators */\}\
      \
        \
          \{patient.vitalsTrend.slice(0, 2).map((vital, idx) => (\
            \
              \
                \
                \{vital.metric.slice(0, 2)\} \{getTrendIcon(vital.trend)\}\
              \
            \
          ))\}\
        \
      \
\
      \{/* Pending Tasks Count */\}\
      \
        \
          \
          \{patient.pendingTasks.length\} pending task(s)\
        \
        \
          \
          \{patient.medications.length\} meds\
        \
      \
\
      \{/* Recent Critical Events */\}\
      \{patient.recentEvents.filter(e => e.severity === 'critical').length > 0 && (\
        \
          \
          \
            \{patient.recentEvents.filter(e => e.severity === 'critical')[0].event\}\
          \
        \
      )\}\
\
      \{/* Expanded View */\}\
      \{expanded && (\
        \
          Recent Events\
          \
            \{patient.recentEvents.map((event, idx) => (\
              <Timeline.Item \
                key=\{idx\} \
                color=\{event.severity === 'critical' ? 'red' : event.severity === 'warning' ? 'orange' : 'gray'\}\
              >\
                \{event.time\}\
                \{event.event\}\
              \
            ))\}\
          \
        \
      )\}\
    \
  );\
\};\
```\
\
### SBAR Generator Component\
\
```tsx\
// src/feature-module/components/ai/shift-handoff/SBARGenerator.tsx\
import React from 'react';\
import \{ Card, Tabs, List, Tag, Timeline, Divider \} from 'antd';\
import \{ \
  AlertOutlined, \
  HistoryOutlined, \
  FileSearchOutlined, \
  BulbOutlined,\
  MedicineBoxOutlined,\
  CheckSquareOutlined\
\} from '@ant-design/icons';\
import \{ Line \} from '@ant-design/charts';\
import type \{ PatientHandoff \} from '../../../../core/api/mock/shiftHandoffMockApi';\
\
const \{ TabPane \} = Tabs;\
\
interface SBARGeneratorProps \{\
  patient: PatientHandoff;\
\}\
\
export const SBARGenerator: React.FC = (\{ patient \}) => \{\
  // Prepare vitals chart data\
  const vitalsChartData = patient.vitalsTrend.flatMap(vital => \
    vital.values.map((value, idx) => (\{\
      time: new Date(vital.timestamps[idx]).toLocaleTimeString([], \{ hour: '2-digit', minute: '2-digit' \}),\
      value,\
      metric: vital.metric\
    \}))\
  );\
\
  const chartConfig = \{\
    data: vitalsChartData,\
    xField: 'time',\
    yField: 'value',\
    seriesField: 'metric',\
    smooth: true,\
    height: 200,\
    legend: \{ position: 'top' as const \}\
  \};\
\
  const sbarSections = [\
    \{ \
      key: 'situation', \
      title: 'Situation', \
      icon: ,\
      content: patient.sbar.situation,\
      color: '#F44336'\
    \},\
    \{ \
      key: 'background', \
      title: 'Background', \
      icon: ,\
      content: patient.sbar.background,\
      color: '#2196F3'\
    \},\
    \{ \
      key: 'assessment', \
      title: 'Assessment', \
      icon: ,\
      content: patient.sbar.assessment,\
      color: '#FF9800'\
    \},\
    \{ \
      key: 'recommendation', \
      title: 'Recommendation', \
      icon: ,\
      content: patient.sbar.recommendation,\
      color: '#4CAF50'\
    \}\
  ];\
\
  return (\
    \
      \
        \
          \
            \{sbarSections.map((section) => (\
              \
                \
                  \
                    \{section.icon\}\
                  \
                  \
                    \
                      \{section.title\}\
                    \
                    \{section.content\}\
                  \
                \
              \
            ))\}\
          \
        \
\
        \
          \
            12-Hour Vitals Trend\
            \
            \
            \
              \{patient.vitalsTrend.map((vital, idx) => (\
                <Tag \
                  key=\{idx\}\
                  color=\{vital.trend === 'improving' ? 'green' : vital.trend === 'declining' ? 'red' : 'default'\}\
                >\
                  \{vital.metric\}: \{vital.trend\}\
                \
              ))\}\
            \
          \
        \
\
        \
          <List\
            dataSource=\{patient.medications\}\
            renderItem=\{(med) => (\
              \
                \}\
                  title=\{\{med.name\}\}\
                  description=\{\
                    \
                      Dose: \{med.dose\}\
                      Next Due: \{med.nextDue\}\
                      \{med.notes && \uc0\u9888 \u65039  \{med.notes\}\}\
                    \
                  \}\
                />\
              \
            )\}\
          />\
        \
\
        \
          <List\
            dataSource=\{patient.pendingTasks\}\
            renderItem=\{(task, idx) => (\
              \
                \
                \{task\}\
              \
            )\}\
          />\
        \
\
        \
          \
            \{patient.recentEvents.map((event, idx) => (\
              <Timeline.Item \
                key=\{idx\}\
                color=\{event.severity === 'critical' ? 'red' : event.severity === 'warning' ? 'orange' : 'gray'\}\
                label=\{event.time\}\
              >\
                \{event.event\}\
              \
            ))\}\
          \
        \
      \
    \
  );\
\};\
```}