{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 AppleColorEmoji;\f2\fnil\fcharset128 HiraginoSans-W3;
}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11840\viewh8400\viewkind0
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
## 
\f1 \uc0\u55357 \u56513 
\f0  Project Structure\
\
Before implementing the features, establish the following directory structure:\
\
```\
src/\

\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  feature-module/\
\uc0\u9474    \u9492 \u9472 \u9472  components/\
\uc0\u9474        \u9492 \u9472 \u9472  ai/\
\uc0\u9474            
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  shift-handoff/\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  ShiftHandoffSummary.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  SBARGenerator.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  PatientHandoffCard.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  HandoffTimeline.tsx\
\uc0\u9474            
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  voice-documentation/\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  VoiceRecorder.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  TranscriptionEditor.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  NoteFormatter.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  MedicalTermsHighlighter.tsx\
\uc0\u9474            
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  drug-interaction/\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  DrugInteractionChecker.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  InteractionAlert.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  MedicationReviewPanel.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  SeverityBadge.tsx\
\uc0\u9474            
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  patient-summary/\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  PatientHistorySummarizer.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  DiagnosisTimeline.tsx\
\uc0\u9474            \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  TreatmentHighlights.tsx\
\uc0\u9474            \u9474    \u9492 \u9472 \u9472  TrendAnalysisChart.tsx\
\uc0\u9474            \u9492 \u9472 \u9472  ai-assistant/\
\uc0\u9474                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  AIAssistantButton.tsx\
\uc0\u9474                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  AIAssistantPopup.tsx\
\uc0\u9474                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  AssistantChatInterface.tsx\
\uc0\u9474                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  QuickActionCards.tsx\
\uc0\u9474                \u9492 \u9472 \u9472  NavigationHelper.tsx\

\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  core/\
\uc0\u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  redux/\
\uc0\u9474    \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  shiftHandoffSlice.ts\
\uc0\u9474    \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  voiceDocSlice.ts\
\uc0\u9474    \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  drugInteractionSlice.ts\
\uc0\u9474    \u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  patientSummarySlice.ts\
\uc0\u9474    \u9474    \u9492 \u9472 \u9472  aiAssistantSlice.ts\
\uc0\u9474    
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  api/\
\uc0\u9474    \u9474    \u9492 \u9472 \u9472  mock/\
\uc0\u9474    \u9474        
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  shiftHandoffMockApi.ts\
\uc0\u9474    \u9474        
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  voiceDocMockApi.ts\
\uc0\u9474    \u9474        
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  drugInteractionMockApi.ts\
\uc0\u9474    \u9474        
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  patientSummaryMockApi.ts\
\uc0\u9474    \u9474        \u9492 \u9472 \u9472  aiAssistantMockApi.ts\
\uc0\u9474    \u9492 \u9472 \u9472  hooks/\
\uc0\u9474        
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  useVoiceRecognition.ts\
\uc0\u9474        
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  useDrugInteraction.ts\
\uc0\u9474        \u9492 \u9472 \u9472  useAIAssistant.ts\
\uc0\u9492 \u9472 \u9472  style/\
    \uc0\u9492 \u9472 \u9472  scss/\
        \uc0\u9492 \u9472 \u9472  components/\
            \uc0\u9492 \u9472 \u9472  ai/\
                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  _shift-handoff.scss\
                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  _voice-documentation.scss\
                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  _drug-interaction.scss\
                
\f2 \'84\'a5
\f0 \uc0\u9472 \u9472  _patient-summary.scss\
                \uc0\u9492 \u9472 \u9472  _ai-assistant.scss\
\
## Feature 9: Voice Documentation Assistant\
\
### Problem Statement\
\
Physicians spend 2+ hours daily on documentation, reducing patient face time. Manual typing is slow and error-prone. Medical terminology requires specialized input methods. Current systems don't support hands-free documentation during patient encounters.\
\
### AI Solution\
\
Real-time speech-to-text system with medical terminology recognition, automatic structuring into SOAP notes, ICD-10 code suggestions, and intelligent field population. Supports continuous dictation with pause/resume and post-dictation editing.\
\
### Technical Requirements\
\
| Component | Description |\
|-----------|-------------|\
| **React Components** | `VoiceRecorder.tsx`, `TranscriptionEditor.tsx`, `NoteFormatter.tsx`, `MedicalTermsHighlighter.tsx` |\
| **Redux Slice** | `voiceDocSlice.ts` (recording state, transcription, SOAP structure) |\
| **API Endpoints** | `POST /api/voice/transcribe`, `POST /api/voice/structure`, `GET /api/voice/suggestions` |\
| **AI Integration** | Whisper API for transcription, GPT-4 for structuring, medical NER model |\
\
### Mock API Engine\
\
```typescript\
// src/core/api/mock/voiceDocMockApi.ts\
import \{ v4 as uuidv4 \} from 'uuid';\
\
export interface TranscriptionResult \{\
  id: string;\
  text: string;\
  confidence: number;\
  medicalTerms: \{\
    term: string;\
    type: 'diagnosis' | 'medication' | 'procedure' | 'symptom' | 'anatomy';\
    position: \{ start: number; end: number \};\
    icdCode?: string;\
    cptCode?: string;\
  \}[];\
  duration: number;\
\}\
\
export interface SOAPNote \{\
  subjective: string;\
  objective: string;\
  assessment: string;\
  plan: string;\
  icdCodes: \{ code: string; description: string; confidence: number \}[];\
  cptCodes: \{ code: string; description: string \}[];\
\}\
\
export interface VoiceSession \{\
  sessionId: string;\
  patientId: string;\
  startTime: string;\
  transcriptions: TranscriptionResult[];\
  structuredNote: SOAPNote | null;\
  status: 'recording' | 'processing' | 'completed' | 'error';\
\}\
\
// Medical term database for highlighting\
const MEDICAL_TERMS_DB = \{\
  diagnoses: [\
    \{ term: 'hypertension', icd: 'I10', type: 'diagnosis' \},\
    \{ term: 'type 2 diabetes', icd: 'E11.9', type: 'diagnosis' \},\
    \{ term: 'pneumonia', icd: 'J18.9', type: 'diagnosis' \},\
    \{ term: 'congestive heart failure', icd: 'I50.9', type: 'diagnosis' \},\
    \{ term: 'COPD', icd: 'J44.9', type: 'diagnosis' \},\
    \{ term: 'atrial fibrillation', icd: 'I48.91', type: 'diagnosis' \},\
    \{ term: 'chronic kidney disease', icd: 'N18.9', type: 'diagnosis' \}\
  ],\
  medications: [\
    \{ term: 'metformin', type: 'medication' \},\
    \{ term: 'lisinopril', type: 'medication' \},\
    \{ term: 'atorvastatin', type: 'medication' \},\
    \{ term: 'metoprolol', type: 'medication' \},\
    \{ term: 'omeprazole', type: 'medication' \},\
    \{ term: 'amlodipine', type: 'medication' \}\
  ],\
  symptoms: [\
    \{ term: 'chest pain', type: 'symptom' \},\
    \{ term: 'shortness of breath', type: 'symptom' \},\
    \{ term: 'fatigue', type: 'symptom' \},\
    \{ term: 'headache', type: 'symptom' \},\
    \{ term: 'nausea', type: 'symptom' \},\
    \{ term: 'dizziness', type: 'symptom' \}\
  ]\
\};\
\
// Simulated transcription responses\
const MOCK_TRANSCRIPTIONS = [\
  \{\
    text: "Patient is a 65-year-old male presenting with complaints of chest pain and shortness of breath for the past two days. He has a history of hypertension and type 2 diabetes. Currently taking metformin 500 milligrams twice daily and lisinopril 10 milligrams daily.",\
    duration: 15\
  \},\
  \{\
    text: "On physical examination, blood pressure is 145 over 92, heart rate 88, respiratory rate 18, oxygen saturation 94% on room air. Lungs have bilateral crackles at the bases. Heart sounds regular with no murmurs. Mild lower extremity edema noted bilaterally.",\
    duration: 18\
  \},\
  \{\
    text: "Assessment: Likely acute exacerbation of congestive heart failure. Differential includes pneumonia given the bilateral crackles. Plan: Obtain chest x-ray, BNP, and basic metabolic panel. Start IV Lasix 40 milligrams. Consider cardiology consult if no improvement.",\
    duration: 14\
  \}\
];\
\
// Find medical terms in text\
const findMedicalTerms = (text: string): TranscriptionResult['medicalTerms'] => \{\
  const terms: TranscriptionResult['medicalTerms'] = [];\
  const lowerText = text.toLowerCase();\
  \
  Object.values(MEDICAL_TERMS_DB).flat().forEach(item => \{\
    const index = lowerText.indexOf(item.term.toLowerCase());\
    if (index !== -1) \{\
      terms.push(\{\
        term: item.term,\
        type: item.type as any,\
        position: \{ start: index, end: index + item.term.length \},\
        icdCode: 'icd' in item ? item.icd : undefined\
      \});\
    \}\
  \});\
  \
  return terms;\
\};\
\
// Generate SOAP note from transcriptions\
const generateSOAPNote = (transcriptions: TranscriptionResult[]): SOAPNote => \{\
  const fullText = transcriptions.map(t => t.text).join(' ');\
  \
  return \{\
    subjective: "65-year-old male with chief complaint of chest pain and shortness of breath x 2 days. History of HTN and T2DM. Current medications: Metformin 500mg BID, Lisinopril 10mg daily. Patient reports symptoms worsening with exertion, improving with rest. Denies fever, cough, or recent illness.",\
    objective: "VS: BP 145/92, HR 88, RR 18, SpO2 94% RA\\nGeneral: Alert, oriented, mild respiratory distress\\nLungs: Bilateral basilar crackles\\nCardiac: RRR, no murmurs/gallops\\nExtremities: 1+ bilateral LE edema\\nNeuro: Grossly intact",\
    assessment: "1. Acute on chronic systolic heart failure exacerbation (I50.9)\\n2. Hypertension, uncontrolled (I10)\\n3. Type 2 diabetes mellitus (E11.9)",\
    plan: "1. IV Furosemide 40mg x1, then reassess\\n2. Chest X-ray PA/Lateral\\n3. Labs: BMP, BNP, CBC\\n4. Cardiology consult if no improvement in 24h\\n5. Daily weights, I/O monitoring\\n6. Sodium restriction <2g/day",\
    icdCodes: [\
      \{ code: 'I50.9', description: 'Heart failure, unspecified', confidence: 0.95 \},\
      \{ code: 'I10', description: 'Essential hypertension', confidence: 0.90 \},\
      \{ code: 'E11.9', description: 'Type 2 diabetes without complications', confidence: 0.88 \}\
    ],\
    cptCodes: [\
      \{ code: '99223', description: 'Initial hospital care, high complexity' \},\
      \{ code: '71046', description: 'Chest X-ray, 2 views' \}\
    ]\
  \};\
\};\
\
export const voiceDocMockApi = \{\
  startSession: async (patientId: string): Promise => \{\
    await new Promise(resolve => setTimeout(resolve, 300));\
    return \{\
      sessionId: uuidv4(),\
      patientId,\
      startTime: new Date().toISOString(),\
      transcriptions: [],\
      structuredNote: null,\
      status: 'recording'\
    \};\
  \},\
\
  transcribeAudio: async (sessionId: string, audioBlob: Blob): Promise => \{\
    // Simulate processing time\
    await new Promise(resolve => setTimeout(resolve, 1500));\
    \
    // Return mock transcription (in real implementation, send to Whisper API)\
    const mockIndex = Math.floor(Math.random() * MOCK_TRANSCRIPTIONS.length);\
    const mock = MOCK_TRANSCRIPTIONS[mockIndex];\
    \
    return \{\
      id: uuidv4(),\
      text: mock.text,\
      confidence: 0.92 + Math.random() * 0.07,\
      medicalTerms: findMedicalTerms(mock.text),\
      duration: mock.duration\
    \};\
  \},\
\
  structureNote: async (transcriptions: TranscriptionResult[]): Promise => \{\
    await new Promise(resolve => setTimeout(resolve, 2000));\
    return generateSOAPNote(transcriptions);\
  \},\
\
  getSuggestions: async (text: string): Promise => \{\
    await new Promise(resolve => setTimeout(resolve, 500));\
    return \{\
      corrections: [\
        \{ original: 'metaformin', suggested: 'metformin', type: 'spelling' \},\
        \{ original: 'lisinapril', suggested: 'lisinopril', type: 'spelling' \}\
      ],\
      completions: [\
        'Consider adding ACE inhibitor',\
        'Recommend echocardiogram if not done recently',\
        'Follow up in 2 weeks'\
      ]\
    \};\
  \},\
\
  saveNote: async (sessionId: string, note: SOAPNote): Promise => \{\
    await new Promise(resolve => setTimeout(resolve, 500));\
    return \{\
      success: true,\
      noteId: uuidv4()\
    \};\
  \}\
\};\
```\
\
### Redux Slice\
\
```typescript\
// src/core/redux/voiceDocSlice.ts\
import \{ createSlice, createAsyncThunk, PayloadAction \} from '@reduxjs/toolkit';\
import \{ \
  voiceDocMockApi, \
  VoiceSession, \
  TranscriptionResult, \
  SOAPNote \
\} from '../api/mock/voiceDocMockApi';\
\
interface VoiceDocState \{\
  currentSession: VoiceSession | null;\
  isRecording: boolean;\
  isProcessing: boolean;\
  isPaused: boolean;\
  transcriptions: TranscriptionResult[];\
  structuredNote: SOAPNote | null;\
  editedNote: SOAPNote | null;\
  recordingDuration: number;\
  audioLevel: number;\
  error: string | null;\
  suggestions: \{\
    corrections: \{ original: string; suggested: string; type: string \}[];\
    completions: string[];\
  \} | null;\
\}\
\
const initialState: VoiceDocState = \{\
  currentSession: null,\
  isRecording: false,\
  isProcessing: false,\
  isPaused: false,\
  transcriptions: [],\
  structuredNote: null,\
  editedNote: null,\
  recordingDuration: 0,\
  audioLevel: 0,\
  error: null,\
  suggestions: null\
\};\
\
export const startVoiceSession = createAsyncThunk(\
  'voiceDoc/startSession',\
  async (patientId: string) => \{\
    return await voiceDocMockApi.startSession(patientId);\
  \}\
);\
\
export const transcribeAudio = createAsyncThunk(\
  'voiceDoc/transcribe',\
  async (\{ sessionId, audioBlob \}: \{ sessionId: string; audioBlob: Blob \}) => \{\
    return await voiceDocMockApi.transcribeAudio(sessionId, audioBlob);\
  \}\
);\
\
export const structureNote = createAsyncThunk(\
  'voiceDoc/structure',\
  async (transcriptions: TranscriptionResult[]) => \{\
    return await voiceDocMockApi.structureNote(transcriptions);\
  \}\
);\
\
export const saveNote = createAsyncThunk(\
  'voiceDoc/save',\
  async (\{ sessionId, note \}: \{ sessionId: string; note: SOAPNote \}) => \{\
    return await voiceDocMockApi.saveNote(sessionId, note);\
  \}\
);\
\
const voiceDocSlice = createSlice(\{\
  name: 'voiceDoc',\
  initialState,\
  reducers: \{\
    setRecording: (state, action: PayloadAction) => \{\
      state.isRecording = action.payload;\
    \},\
    setPaused: (state, action: PayloadAction) => \{\
      state.isPaused = action.payload;\
    \},\
    updateAudioLevel: (state, action: PayloadAction) => \{\
      state.audioLevel = action.payload;\
    \},\
    updateDuration: (state, action: PayloadAction) => \{\
      state.recordingDuration = action.payload;\
    \},\
    updateEditedNote: (state, action: PayloadAction<Partial>) => \{\
      if (state.editedNote) \{\
        state.editedNote = \{ ...state.editedNote, ...action.payload \};\
      \}\
    \},\
    clearSession: (state) => \{\
      state.currentSession = null;\
      state.transcriptions = [];\
      state.structuredNote = null;\
      state.editedNote = null;\
      state.recordingDuration = 0;\
      state.isRecording = false;\
      state.isPaused = false;\
    \},\
    addManualTranscription: (state, action: PayloadAction) => \{\
      const newTranscription: TranscriptionResult = \{\
        id: Date.now().toString(),\
        text: action.payload,\
        confidence: 1.0,\
        medicalTerms: [],\
        duration: 0\
      \};\
      state.transcriptions.push(newTranscription);\
    \}\
  \},\
  extraReducers: (builder) => \{\
    builder\
      .addCase(startVoiceSession.fulfilled, (state, action) => \{\
        state.currentSession = action.payload;\
        state.transcriptions = [];\
        state.structuredNote = null;\
        state.editedNote = null;\
      \})\
      .addCase(transcribeAudio.pending, (state) => \{\
        state.isProcessing = true;\
      \})\
      .addCase(transcribeAudio.fulfilled, (state, action) => \{\
        state.isProcessing = false;\
        state.transcriptions.push(action.payload);\
      \})\
      .addCase(transcribeAudio.rejected, (state, action) => \{\
        state.isProcessing = false;\
        state.error = action.error.message || 'Transcription failed';\
      \})\
      .addCase(structureNote.pending, (state) => \{\
        state.isProcessing = true;\
      \})\
      .addCase(structureNote.fulfilled, (state, action) => \{\
        state.isProcessing = false;\
        state.structuredNote = action.payload;\
        state.editedNote = action.payload;\
      \})\
      .addCase(saveNote.fulfilled, (state) => \{\
        state.currentSession = null;\
      \});\
  \}\
\});\
\
export const \{ \
  setRecording, \
  setPaused, \
  updateAudioLevel, \
  updateDuration,\
  updateEditedNote,\
  clearSession,\
  addManualTranscription \
\} = voiceDocSlice.actions;\
\
export default voiceDocSlice.reducer;\
```\
\
### Voice Recognition Hook\
\
```typescript\
// src/core/hooks/useVoiceRecognition.ts\
import \{ useState, useEffect, useRef, useCallback \} from 'react';\
\
interface UseVoiceRecognitionOptions \{\
  onResult?: (transcript: string) => void;\
  onError?: (error: string) => void;\
  continuous?: boolean;\
  interimResults?: boolean;\
\}\
\
interface UseVoiceRecognitionReturn \{\
  isListening: boolean;\
  isSupported: boolean;\
  transcript: string;\
  interimTranscript: string;\
  startListening: () => void;\
  stopListening: () => void;\
  resetTranscript: () => void;\
  audioLevel: number;\
\}\
\
export const useVoiceRecognition = (\
  options: UseVoiceRecognitionOptions = \{\}\
): UseVoiceRecognitionReturn => \{\
  const \{ onResult, onError, continuous = true, interimResults = true \} = options;\
  \
  const [isListening, setIsListening] = useState(false);\
  const [transcript, setTranscript] = useState('');\
  const [interimTranscript, setInterimTranscript] = useState('');\
  const [audioLevel, setAudioLevel] = useState(0);\
  \
  const recognitionRef = useRef(null);\
  const audioContextRef = useRef(null);\
  const analyserRef = useRef(null);\
  const animationRef = useRef(null);\
\
  const isSupported = typeof window !== 'undefined' && \
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);\
\
  // Initialize speech recognition\
  useEffect(() => \{\
    if (!isSupported) return;\
\
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;\
    recognitionRef.current = new SpeechRecognition();\
    recognitionRef.current.continuous = continuous;\
    recognitionRef.current.interimResults = interimResults;\
    recognitionRef.current.lang = 'en-US';\
\
    recognitionRef.current.onresult = (event) => \{\
      let finalTranscript = '';\
      let interimText = '';\
\
      for (let i = event.resultIndex; i < event.results.length; i++) \{\
        const result = event.results[i];\
        if (result.isFinal) \{\
          finalTranscript += result[0].transcript;\
        \} else \{\
          interimText += result[0].transcript;\
        \}\
      \}\
\
      if (finalTranscript) \{\
        setTranscript(prev => prev + ' ' + finalTranscript);\
        onResult?.(finalTranscript);\
      \}\
      setInterimTranscript(interimText);\
    \};\
\
    recognitionRef.current.onerror = (event) => \{\
      onError?.(event.error);\
      setIsListening(false);\
    \};\
\
    recognitionRef.current.onend = () => \{\
      if (isListening && continuous) \{\
        recognitionRef.current?.start();\
      \}\
    \};\
\
    return () => \{\
      recognitionRef.current?.stop();\
      if (animationRef.current) \{\
        cancelAnimationFrame(animationRef.current);\
      \}\
    \};\
  \}, [isSupported, continuous, interimResults, onResult, onError, isListening]);\
\
  // Audio level monitoring\
  const startAudioMonitoring = useCallback(async () => \{\
    try \{\
      const stream = await navigator.mediaDevices.getUserMedia(\{ audio: true \});\
      audioContextRef.current = new AudioContext();\
      analyserRef.current = audioContextRef.current.createAnalyser();\
      const source = audioContextRef.current.createMediaStreamSource(stream);\
      source.connect(analyserRef.current);\
      analyserRef.current.fftSize = 256;\
\
      const updateLevel = () => \{\
        if (!analyserRef.current) return;\
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);\
        analyserRef.current.getByteFrequencyData(dataArray);\
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;\
        setAudioLevel(average / 255);\
        animationRef.current = requestAnimationFrame(updateLevel);\
      \};\
      updateLevel();\
    \} catch (err) \{\
      console.error('Failed to access microphone:', err);\
    \}\
  \}, []);\
\
  const stopAudioMonitoring = useCallback(() => \{\
    if (animationRef.current) \{\
      cancelAnimationFrame(animationRef.current);\
    \}\
    audioContextRef.current?.close();\
    setAudioLevel(0);\
  \}, []);\
\
  const startListening = useCallback(() => \{\
    if (!isSupported || !recognitionRef.current) return;\
    setIsListening(true);\
    recognitionRef.current.start();\
    startAudioMonitoring();\
  \}, [isSupported, startAudioMonitoring]);\
\
  const stopListening = useCallback(() => \{\
    if (!recognitionRef.current) return;\
    setIsListening(false);\
    recognitionRef.current.stop();\
    stopAudioMonitoring();\
  \}, [stopAudioMonitoring]);\
\
  const resetTranscript = useCallback(() => \{\
    setTranscript('');\
    setInterimTranscript('');\
  \}, []);\
\
  return \{\
    isListening,\
    isSupported,\
    transcript,\
    interimTranscript,\
    startListening,\
    stopListening,\
    resetTranscript,\
    audioLevel\
  \};\
\};\
```\
\
### Main Voice Recorder Component\
\
```tsx\
// src/feature-module/components/ai/voice-documentation/VoiceRecorder.tsx\
import React, \{ useState, useEffect, useCallback \} from 'react';\
import \{ useSelector, useDispatch \} from 'react-redux';\
import \{ \
  Card, \
  Button, \
  Progress, \
  Tag, \
  Space, \
  Tooltip, \
  Alert,\
  Modal,\
  Tabs,\
  Row,\
  Col\
\} from 'antd';\
import \{\
  AudioOutlined,\
  PauseCircleOutlined,\
  PlayCircleOutlined,\
  StopOutlined,\
  SaveOutlined,\
  EditOutlined,\
  SoundOutlined,\
  CheckCircleOutlined\
\} from '@ant-design/icons';\
import \{ useVoiceRecognition \} from '../../../../core/hooks/useVoiceRecognition';\
import \{ \
  startVoiceSession,\
  setRecording,\
  setPaused,\
  updateDuration,\
  structureNote,\
  clearSession,\
  addManualTranscription\
\} from '../../../../core/redux/voiceDocSlice';\
import \{ TranscriptionEditor \} from './TranscriptionEditor';\
import \{ NoteFormatter \} from './NoteFormatter';\
import \{ MedicalTermsHighlighter \} from './MedicalTermsHighlighter';\
import type \{ RootState, AppDispatch \} from '../../../../core/redux/store';\
\
const \{ TabPane \} = Tabs;\
\
interface VoiceRecorderProps \{\
  patientId: string;\
  patientName: string;\
  onSave?: (noteId: string) => void;\
\}\
\
export const VoiceRecorder: React.FC = (\{\
  patientId,\
  patientName,\
  onSave\
\}) => \{\
  const dispatch = useDispatch();\
  const \{\
    currentSession,\
    isRecording,\
    isPaused,\
    isProcessing,\
    transcriptions,\
    structuredNote,\
    recordingDuration,\
    error\
  \} = useSelector((state: RootState) => state.voiceDoc);\
\
  const [activeTab, setActiveTab] = useState('record');\
  const [showPreview, setShowPreview] = useState(false);\
\
  const \{\
    isListening,\
    isSupported,\
    transcript,\
    interimTranscript,\
    startListening,\
    stopListening,\
    resetTranscript,\
    audioLevel\
  \} = useVoiceRecognition(\{\
    onResult: (text) => \{\
      if (currentSession) \{\
        dispatch(addManualTranscription(text));\
      \}\
    \},\
    onError: (err) => console.error('Voice recognition error:', err)\
  \});\
\
  // Timer for recording duration\
  useEffect(() => \{\
    let interval: NodeJS.Timeout;\
    if (isRecording && !isPaused) \{\
      interval = setInterval(() => \{\
        dispatch(updateDuration(recordingDuration + 1));\
      \}, 1000);\
    \}\
    return () => clearInterval(interval);\
  \}, [isRecording, isPaused, recordingDuration, dispatch]);\
\
  const handleStartRecording = async () => \{\
    if (!currentSession) \{\
      await dispatch(startVoiceSession(patientId));\
    \}\
    dispatch(setRecording(true));\
    startListening();\
  \};\
\
  const handlePauseRecording = () => \{\
    dispatch(setPaused(!isPaused));\
    if (isPaused) \{\
      startListening();\
    \} else \{\
      stopListening();\
    \}\
  \};\
\
  const handleStopRecording = async () => \{\
    dispatch(setRecording(false));\
    stopListening();\
    \
    if (transcriptions.length > 0) \{\
      await dispatch(structureNote(transcriptions));\
      setActiveTab('review');\
    \}\
  \};\
\
  const handleClear = () => \{\
    dispatch(clearSession());\
    resetTranscript();\
  \};\
\
  const formatDuration = (seconds: number) => \{\
    const mins = Math.floor(seconds / 60);\
    const secs = seconds % 60;\
    return `$\{mins.toString().padStart(2, '0')\}:$\{secs.toString().padStart(2, '0')\}`;\
  \};\
\
  if (!isSupported) \{\
    return (\
      \
    );\
  \}\
\
  return (\
    \
      \
        \{/* Header */\}\
        \
          \
            \
              \
              Voice Documentation\
            \
            Patient: \{patientName\}\
          \
          \
            \{isRecording ? '\uc0\u9679  Recording' : 'Ready'\}\
          \
        \
\
        \
          \{/* Recording Tab */\}\
          \
            \{/* Audio Visualization */\}\
            \
              \
                \
              \
              \
              \
                \{formatDuration(recordingDuration)\}\
              \
              \
              \{/* Audio Level Meter */\}\
              \
            \
\
            \{/* Control Buttons */\}\
            \
              \
                \{!isRecording ? (\
                  \
                    \}\
                      onClick=\{handleStartRecording\}\
                      style=\{\{ width: 64, height: 64 \}\}\
                    />\
                  \
                ) : (\
                  <>\
                    \
                       : \}\
                        onClick=\{handlePauseRecording\}\
                        style=\{\{ width: 56, height: 56 \}\}\
                      />\
                    \
                    \
                      \}\
                        onClick=\{handleStopRecording\}\
                        style=\{\{ width: 64, height: 64 \}\}\
                        loading=\{isProcessing\}\
                      />\
                    \
                  </>\
                )\}\
              \
            \
\
            \{/* Live Transcription Preview */\}\
            \
              \
                \
                  \
                  Live Transcription\
                \
                \
                  \{transcriptions.length\} segment(s)\
                \
              \
              \
              \
                \{transcriptions.map((t, idx) => (\
                  \
                    \
                  \
                ))\}\
                \{interimTranscript && (\
                  \{interimTranscript\}...\
                )\}\
                \{transcriptions.length === 0 && !interimTranscript && (\
                  \
                    Start speaking to see transcription...\
                  \
                )\}\
              \
            \
          \
\
          \{/* Review & Edit Tab */\}\
          \
            \{structuredNote && (\
              \
            )\}\
          \
\
          \{/* Formatted Note Tab */\}\
          \
            \{structuredNote && (\
              \
            )\}\
          \
        \
      \
\
      \{/* Quick Actions */\}\
      \
        \
          Clear All\
        \
        \}\
          disabled=\{!structuredNote\}\
          onClick=\{() => setShowPreview(true)\}\
        >\
          Save to Patient Record\
        \
      \
    \
  );\
\};\
```\
\
### Medical Terms Highlighter\
\
```tsx\
// src/feature-module/components/ai/voice-documentation/MedicalTermsHighlighter.tsx\
import React from 'react';\
import \{ Tooltip, Tag \} from 'antd';\
\
interface MedicalTerm \{\
  term: string;\
  type: 'diagnosis' | 'medication' | 'procedure' | 'symptom' | 'anatomy';\
  position: \{ start: number; end: number \};\
  icdCode?: string;\
  cptCode?: string;\
\}\
\
interface MedicalTermsHighlighterProps \{\
  text: string;\
  medicalTerms: MedicalTerm[];\
\}\
\
const TYPE_COLORS = \{\
  diagnosis: \{ bg: '#fff1f0', border: '#ffa39e', text: '#cf1322' \},\
  medication: \{ bg: '#e6f7ff', border: '#91d5ff', text: '#0050b3' \},\
  procedure: \{ bg: '#f6ffed', border: '#b7eb8f', text: '#389e0d' \},\
  symptom: \{ bg: '#fff7e6', border: '#ffd591', text: '#d46b08' \},\
  anatomy: \{ bg: '#f9f0ff', border: '#d3adf7', text: '#531dab' \}\
\};\
\
export const MedicalTermsHighlighter: React.FC = (\{\
  text,\
  medicalTerms\
\}) => \{\
  if (!medicalTerms || medicalTerms.length === 0) \{\
    return \{text\};\
  \}\
\
  // Sort terms by position\
  const sortedTerms = [...medicalTerms].sort((a, b) => a.position.start - b.position.start);\
  \
  const elements: React.ReactNode[] = [];\
  let lastIndex = 0;\
\
  sortedTerms.forEach((term, idx) => \{\
    // Add text before this term\
    if (term.position.start > lastIndex) \{\
      elements.push(\
        \
          \{text.slice(lastIndex, term.position.start)\}\
        \
      );\
    \}\
\
    // Add highlighted term\
    const colors = TYPE_COLORS[term.type];\
    const tooltipContent = (\
      \
        \{term.type.charAt(0).toUpperCase() + term.type.slice(1)\}\
        \{term.icdCode && ICD-10: \{term.icdCode\}\}\
        \{term.cptCode && CPT: \{term.cptCode\}\}\
      \
    );\
\
    elements.push(\
      \
        \
          \{text.slice(term.position.start, term.position.end)\}\
        \
      \
    );\
\
    lastIndex = term.position.end;\
  \});\
\
  // Add remaining text\
  if (lastIndex < text.length) \{\
    elements.push(\
      \{text.slice(lastIndex)\}\
    );\
  \}\
\
  return <>\{elements\}</>;\
\};\
```\
\
### Transcription Editor Component\
\
```tsx\
// src/feature-module/components/ai/voice-documentation/TranscriptionEditor.tsx\
import React, \{ useState \} from 'react';\
import \{ useDispatch \} from 'react-redux';\
import \{ Card, Input, Button, Tag, List, Divider, Row, Col, Alert \} from 'antd';\
import \{ \
  EditOutlined, \
  CheckOutlined, \
  PlusOutlined,\
  DeleteOutlined\
\} from '@ant-design/icons';\
import \{ updateEditedNote, saveNote \} from '../../../../core/redux/voiceDocSlice';\
import type \{ SOAPNote \} from '../../../../core/api/mock/voiceDocMockApi';\
import type \{ AppDispatch \} from '../../../../core/redux/store';\
\
const \{ TextArea \} = Input;\
\
interface TranscriptionEditorProps \{\
  note: SOAPNote;\
  onSave?: (noteId: string) => void;\
\}\
\
export const TranscriptionEditor: React.FC = (\{\
  note,\
  onSave\
\}) => \{\
  const dispatch = useDispatch();\
  const [editMode, setEditMode] = useState(null);\
  const [editedNote, setEditedNote] = useState(note);\
\
  const handleFieldChange = (field: keyof SOAPNote, value: string) => \{\
    const updated = \{ ...editedNote, [field]: value \};\
    setEditedNote(updated);\
    dispatch(updateEditedNote(\{ [field]: value \}));\
  \};\
\
  const soapSections = [\
    \{ key: 'subjective', label: 'Subjective', color: '#F44336', icon: '
\f1 \uc0\u55357 \u56492 
\f0 ' \},\
    \{ key: 'objective', label: 'Objective', color: '#2196F3', icon: '
\f1 \uc0\u55357 \u56589 
\f0 ' \},\
    \{ key: 'assessment', label: 'Assessment', color: '#FF9800', icon: '
\f1 \uc0\u55357 \u56523 
\f0 ' \},\
    \{ key: 'plan', label: 'Plan', color: '#4CAF50', icon: '
\f1 \uc0\u55357 \u56541 
\f0 ' \}\
  ];\
\
  return (\
    \
      \
\
      \{/* SOAP Sections */\}\
      \{soapSections.map((section) => (\
        \
          \
            \
              \{section.icon\} \{section.label\}\
            \
            <Button \
              size="small" \
              type="text"\
              icon=\{editMode === section.key ?  : \}\
              onClick=\{() => setEditMode(editMode === section.key ? null : section.key)\}\
            />\
          \
          \
          \{editMode === section.key ? (\
            <TextArea\
              value=\{editedNote[section.key as keyof SOAPNote] as string\}\
              onChange=\{(e) => handleFieldChange(section.key as keyof SOAPNote, e.target.value)\}\
              autoSize=\{\{ minRows: 3, maxRows: 8 \}\}\
              onBlur=\{() => setEditMode(null)\}\
              autoFocus\
            />\
          ) : (\
            \
              \{editedNote[section.key as keyof SOAPNote] as string\}\
            \
          )\}\
        \
      ))\}\
\
      \
\
      \{/* ICD-10 Codes */\}\
      \
        \
          
\f1 \uc0\u55356 \u57335 \u65039 
\f0  Suggested ICD-10 Codes\
        \
        <List\
          size="small"\
          dataSource=\{note.icdCodes\}\
          renderItem=\{(item) => (\
            \}\
                />\
              ]\}\
            >\
              \
                \{item.code\}\
                \{item.description\}\
                 0.9 ? 'green' : 'orange'\}>\
                  \{Math.round(item.confidence * 100)\}% confident\
                \
              \
            \
          )\}\
        />\
        \} block className="mt-2">\
          Add ICD-10 Code\
        \
      \
\
      \{/* CPT Codes */\}\
      \
        \
          
\f1 \uc0\u55357 \u56496 
\f0  Suggested CPT Codes\
        \
        \
          \{note.cptCodes.map((cpt, idx) => (\
            \
              \{cpt.code\} - \{cpt.description\}\
            \
          ))\}\
          \
             Add\
          \
        \
      \
    \
  );\
\};\
```\
\
### Note Formatter Component\
\
```tsx\
// src/feature-module/components/ai/voice-documentation/NoteFormatter.tsx\
import React, \{ useRef \} from 'react';\
import \{ Card, Button, Divider, Typography, Space \} from 'antd';\
import \{ \
  PrinterOutlined, \
  CopyOutlined, \
  FileTextOutlined,\
  CheckOutlined\
\} from '@ant-design/icons';\
import type \{ SOAPNote \} from '../../../../core/api/mock/voiceDocMockApi';\
\
const \{ Title, Text, Paragraph \} = Typography;\
\
interface NoteFormatterProps \{\
  note: SOAPNote;\
  patientName: string;\
\}\
\
export const NoteFormatter: React.FC = (\{ note, patientName \}) => \{\
  const printRef = useRef(null);\
  const [copied, setCopied] = React.useState(false);\
\
  const handlePrint = () => \{\
    const printContent = printRef.current?.innerHTML;\
    const printWindow = window.open('', '_blank');\
    if (printWindow && printContent) \{\
      printWindow.document.write(`\
        \
          \
            Clinical Note - $\{patientName\}\
            \
              body \{ font-family: 'Times New Roman', serif; padding: 40px; \}\
              h1 \{ font-size: 18px; border-bottom: 2px solid #000; \}\
              h2 \{ font-size: 14px; color: #333; margin-top: 20px; \}\
              p \{ line-height: 1.6; \}\
              .codes \{ background: #f5f5f5; padding: 10px; margin-top: 20px; \}\
            \
          \
          $\{printContent\}\
        \
      `);\
      printWindow.document.close();\
      printWindow.print();\
    \}\
  \};\
\
  const handleCopy = () => \{\
    const text = `\
CLINICAL NOTE\
Patient: $\{patientName\}\
Date: $\{new Date().toLocaleDateString()\}\
\
SUBJECTIVE:\
$\{note.subjective\}\
\
OBJECTIVE:\
$\{note.objective\}\
\
ASSESSMENT:\
$\{note.assessment\}\
\
PLAN:\
$\{note.plan\}\
\
ICD-10 CODES:\
$\{note.icdCodes.map(c => `$\{c.code\} - $\{c.description\}`).join('\\n')\}\
\
CPT CODES:\
$\{note.cptCodes.map(c => `$\{c.code\} - $\{c.description\}`).join('\\n')\}\
    `.trim();\
\
    navigator.clipboard.writeText(text);\
    setCopied(true);\
    setTimeout(() => setCopied(false), 2000);\
  \};\
\
  return (\
    \
      \{/* Action Buttons */\}\
      \
        \} onClick=\{handlePrint\}>\
          Print\
        \
         : \}\
          onClick=\{handleCopy\}\
        >\
          \{copied ? 'Copied!' : 'Copy to Clipboard'\}\
        \
        \}>\
          Export to EHR\
        \
      \
\
      \{/* Formatted Note Preview */\}\
      \
        \
          CLINICAL NOTE\
          \
            Patient: \{patientName\} | Date: \{new Date().toLocaleDateString()\} | \
            Time: \{new Date().toLocaleTimeString()\}\
          \
        \
\
        \
\
        \
          SUBJECTIVE\
          \{note.subjective\}\
        \
\
        \
          OBJECTIVE\
          \{note.objective\}\
        \
\
        \
          ASSESSMENT\
          \{note.assessment\}\
        \
\
        \
          PLAN\
          \{note.plan\}\
        \
\
        \
\
        \
          BILLING CODES\
          \
            ICD-10 Codes:\
            \
              \{note.icdCodes.map((code, idx) => (\
                \{code.code\} - \{code.description\}\
              ))\}\
            \
          \
          \
            CPT Codes:\
            \
              \{note.cptCodes.map((code, idx) => (\
                \{code.code\} - \{code.description\}\
              ))\}\
            \
          \
        \
\
        \
\
        \
          \
            Electronically signed by: ________________________\
          \
          \
          \
            Generated with AI assistance | Reviewed and approved by physician\
          \
        \
      \
    \
  );\
\};\
```\
\
### Success Metrics\
\
- 
\f1 \uc0\u9989 
\f0  60% reduction in documentation time (from 2+ hours to <45 min daily)\
- 
\f1 \uc0\u9989 
\f0  95% accuracy in medical terminology transcription\
- 
\f1 \uc0\u9989 
\f0  85% of generated notes require minimal editing\
- 
\f1 \uc0\u9989 
\f0  90% physician satisfaction with voice documentation workflow\
}