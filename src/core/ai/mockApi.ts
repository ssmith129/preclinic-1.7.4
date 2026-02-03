// Mock API Services for AI Features
// These simulate backend AI endpoints for frontend-only development

import type {
  TriageAssessmentRequest,
  TriageAssessmentResponse,
  TriagePriority,
  PersonalizedLayout,
  UserRole,
  SchedulerRequest,
  SchedulerResponse,
  SlotSuggestion,
  PredictiveAlert,
  MessageAnalysis,
  MessageUrgency,
} from './types';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// Feature 1: Smart Triage Priority Assessment
// ============================================
const CRITICAL_SYMPTOMS = ['chest pain', 'difficulty breathing', 'severe bleeding', 'stroke symptoms', 'unconscious'];
const URGENT_SYMPTOMS = ['high fever', 'severe pain', 'head injury', 'abdominal pain', 'broken bone'];
const SEMI_URGENT_SYMPTOMS = ['moderate pain', 'vomiting', 'dizziness', 'infection signs', 'allergic reaction'];

export async function assessTriagePriority(request: TriageAssessmentRequest): Promise<TriageAssessmentResponse> {
  await delay(300 + Math.random() * 400);
  
  const { symptoms, vitals, waitTime } = request;
  const symptomsLower = symptoms.map(s => s.toLowerCase());
  
  let priority: TriagePriority = 4;
  const factors: string[] = [];
  
  // Check for critical symptoms
  if (symptomsLower.some(s => CRITICAL_SYMPTOMS.some(cs => s.includes(cs)))) {
    priority = 1;
    factors.push('Critical symptoms detected');
  } else if (symptomsLower.some(s => URGENT_SYMPTOMS.some(us => s.includes(us)))) {
    priority = 2;
    factors.push('Urgent symptoms present');
  } else if (symptomsLower.some(s => SEMI_URGENT_SYMPTOMS.some(ss => s.includes(ss)))) {
    priority = 3;
    factors.push('Semi-urgent condition');
  }
  
  // Vitals analysis
  if (vitals) {
    if (vitals.heartRate && (vitals.heartRate > 120 || vitals.heartRate < 50)) {
      priority = Math.min(priority, 2) as TriagePriority;
      factors.push('Abnormal heart rate');
    }
    if (vitals.oxygenSaturation && vitals.oxygenSaturation < 92) {
      priority = 1;
      factors.push('Low oxygen saturation');
    }
    if (vitals.temperature && vitals.temperature > 39.5) {
      priority = Math.min(priority, 2) as TriagePriority;
      factors.push('High fever');
    }
  }
  
  // Wait time escalation
  if (waitTime > 60 && priority > 2) {
    priority = Math.max(1, priority - 1) as TriagePriority;
    factors.push('Extended wait time');
  }
  
  if (factors.length === 0) {
    factors.push('Standard triage assessment');
  }
  
  const confidence = 75 + Math.random() * 20;
  
  return { priority, confidence: Math.round(confidence), factors };
}

// ============================================
// Feature 2: AI Dashboard Personalization
// ============================================
const ROLE_WIDGETS: Record<UserRole, string[]> = {
  admin: ['appointmentStats', 'revenueChart', 'staffSchedule', 'resourceUtilization', 'topDoctors', 'recentTransactions'],
  doctor: ['myAppointments', 'patientQueue', 'pendingPrescriptions', 'labResults', 'scheduleOverview', 'patientAlerts'],
  nurse: ['patientAcuity', 'medicationSchedule', 'vitalAlerts', 'shiftHandoff', 'bedStatus', 'taskList'],
  triage: ['waitingQueue', 'priorityPatients', 'bedAvailability', 'staffStatus', 'incomingPatients', 'alertsWidget']
};

export async function getPersonalizedLayout(userId: string, role: UserRole): Promise<PersonalizedLayout> {
  await delay(200 + Math.random() * 300);
  
  const baseWidgets = ROLE_WIDGETS[role] || ROLE_WIDGETS.admin;
  
  // Simulate AI suggestions based on time of day
  const hour = new Date().getHours();
  const aiSuggestions = [];
  
  if (hour < 12) {
    aiSuggestions.push({ widgetId: baseWidgets[0], priority: 1, reason: 'Morning priority item' });
  }
  if (role === 'nurse' && hour >= 6 && hour <= 8) {
    aiSuggestions.push({ widgetId: 'shiftHandoff', priority: 1, reason: 'Shift change detected' });
  }
  if (role === 'doctor') {
    aiSuggestions.push({ widgetId: 'patientQueue', priority: 2, reason: `${Math.floor(Math.random() * 5 + 3)} patients waiting` });
  }
  
  return {
    userId,
    role,
    widgets: baseWidgets,
    aiSuggestions
  };
}

// ============================================
// Feature 3: Intelligent Appointment Scheduler
// ============================================
const DOCTORS = [
  { id: 'd1', name: 'Dr. Alex Morgan' },
  { id: 'd2', name: 'Dr. Sarah Johnson' },
  { id: 'd3', name: 'Dr. Emily Carter' },
  { id: 'd4', name: 'Dr. David Lee' },
];

export async function getSmartSlotSuggestions(request: SchedulerRequest): Promise<SchedulerResponse> {
  await delay(400 + Math.random() * 500);
  
  const slots: SlotSuggestion[] = [];
  const baseDate = new Date();
  
  // Generate 6 AI-suggested slots
  for (let i = 0; i < 6; i++) {
    const slotDate = new Date(baseDate);
    slotDate.setDate(slotDate.getDate() + Math.floor(i / 2) + 1);
    slotDate.setHours(9 + (i % 4) * 2, i % 2 === 0 ? 0 : 30, 0, 0);
    
    const doctor = DOCTORS[i % DOCTORS.length];
    const score = 5 - (i * 0.5);
    const noShowRisk = 10 + Math.random() * 25;
    
    slots.push({
      datetime: slotDate.toISOString(),
      score: Math.max(1, Math.round(score)),
      factors: {
        providerPreference: 70 + Math.random() * 30,
        patientConvenience: 60 + Math.random() * 40,
        noShowRisk,
        waitTimeOptimal: 75 + Math.random() * 25
      },
      conflicts: i === 3 ? ['Near lunch break'] : [],
      providerId: doctor.id,
      providerName: doctor.name
    });
  }
  
  return {
    slots: slots.sort((a, b) => b.score - a.score),
    patientPreferences: {
      preferredTime: 'Morning',
      historicalNoShowRate: 8 + Math.random() * 12
    }
  };
}

// ============================================
// Feature 4: Clinical Alert Prediction System
// ============================================
const PATIENT_NAMES = [
  { name: 'Maria Santos', image: 'user-01.jpg' },
  { name: 'James Wilson', image: 'user-02.jpg' },
  { name: 'Emily Chen', image: 'user-03.jpg' },
  { name: 'Robert Johnson', image: 'user-04.jpg' },
];

const PREDICTED_EVENTS = [
  'Sepsis risk elevation',
  'Cardiac arrhythmia warning',
  'Respiratory distress prediction',
  'Blood glucose instability',
  'Fall risk increase',
  'Medication interaction alert'
];

const RECOMMENDED_ACTIONS = [
  ['Order blood cultures immediately', 'Start empiric antibiotics', 'Increase monitoring frequency'],
  ['Continuous ECG monitoring', 'Cardiology consult', 'Review current medications'],
  ['Oxygen therapy assessment', 'Respiratory therapy consult', 'ABG analysis'],
  ['Blood glucose monitoring q1h', 'Insulin adjustment review', 'Endocrinology consult'],
  ['Implement fall precautions', 'Bed alarm activation', 'Physical therapy evaluation'],
  ['Pharmacy review', 'Hold conflicting medications', 'Monitor for adverse effects']
];

export async function getClinicalAlerts(): Promise<PredictiveAlert[]> {
  await delay(300 + Math.random() * 400);
  
  const alerts: PredictiveAlert[] = [];
  const numAlerts = 2 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < numAlerts; i++) {
    const eventIndex = Math.floor(Math.random() * PREDICTED_EVENTS.length);
    const patient = PATIENT_NAMES[i % PATIENT_NAMES.length];
    const riskLevels: Array<'critical' | 'high' | 'moderate' | 'low'> = ['critical', 'high', 'moderate', 'low'];
    const riskLevel = riskLevels[Math.min(i, 3)];
    
    alerts.push({
      id: `alert-${Date.now()}-${i}`,
      patientId: `patient-${i + 1}`,
      patientName: patient.name,
      patientImage: patient.image,
      riskLevel,
      predictedEvent: PREDICTED_EVENTS[eventIndex],
      timeframe: `${2 + Math.floor(Math.random() * 4)} hours`,
      confidence: 70 + Math.floor(Math.random() * 25),
      contributingFactors: [
        'Vital sign trends',
        'Lab result patterns',
        'Historical data analysis'
      ].slice(0, 2 + Math.floor(Math.random() * 2)),
      recommendedActions: RECOMMENDED_ACTIONS[eventIndex],
      timestamp: Date.now()
    });
  }
  
  return alerts;
}

// ============================================
// Feature 5: Smart Message Router Analysis
// ============================================
const RECIPIENTS = [
  { id: 'r1', name: 'Dr. Sarah Johnson', role: 'Attending Physician', avatar: 'doctor-01.jpg' },
  { id: 'r2', name: 'Nurse Emily', role: 'Charge Nurse', avatar: 'user-05.jpg' },
  { id: 'r3', name: 'Dr. Michael Chen', role: 'Specialist', avatar: 'doctor-02.jpg' },
  { id: 'r4', name: 'Admin Staff', role: 'Administration', avatar: 'user-06.jpg' },
];

const URGENT_KEYWORDS = ['urgent', 'emergency', 'critical', 'immediate', 'asap', 'stat'];
const CLINICAL_KEYWORDS = ['patient', 'medication', 'prescription', 'diagnosis', 'treatment', 'lab', 'vitals'];
const ADMIN_KEYWORDS = ['schedule', 'appointment', 'billing', 'insurance', 'records', 'documentation'];

export async function analyzeMessage(content: string): Promise<MessageAnalysis> {
  await delay(200 + Math.random() * 300);
  
  const contentLower = content.toLowerCase();
  const words = contentLower.split(/\s+/);
  
  // Determine urgency
  let urgency: MessageUrgency = 'normal';
  if (URGENT_KEYWORDS.some(k => contentLower.includes(k))) {
    urgency = contentLower.includes('emergency') || contentLower.includes('critical') ? 'critical' : 'high';
  } else if (content.includes('!') || content.includes('?')) {
    urgency = 'normal';
  } else {
    urgency = 'low';
  }
  
  // Determine category
  let category = 'General';
  if (CLINICAL_KEYWORDS.some(k => contentLower.includes(k))) {
    category = 'Clinical';
  } else if (ADMIN_KEYWORDS.some(k => contentLower.includes(k))) {
    category = 'Administrative';
  }
  
  // Suggest recipients based on content
  const suggestedRecipients = RECIPIENTS
    .map(r => ({
      ...r,
      relevance: Math.floor(50 + Math.random() * 50)
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);
  
  // If clinical, prioritize doctors
  if (category === 'Clinical') {
    suggestedRecipients.sort((a, b) => {
      if (a.role.includes('Physician') || a.role.includes('Specialist')) return -1;
      if (b.role.includes('Physician') || b.role.includes('Specialist')) return 1;
      return 0;
    });
  }
  
  // Generate suggested responses
  const suggestedResponses: string[] = [];
  if (category === 'Clinical') {
    suggestedResponses.push(
      'I will review the patient records and get back to you shortly.',
      'Please provide the patient ID for further assessment.',
      'Acknowledged. Initiating clinical protocol.'
    );
  } else if (category === 'Administrative') {
    suggestedResponses.push(
      'I will check the schedule and confirm availability.',
      'The documentation has been processed.',
      'Please allow 24-48 hours for processing.'
    );
  } else {
    suggestedResponses.push(
      'Thank you for reaching out. I will respond shortly.',
      'Received. I will look into this.',
      'Acknowledged. Will follow up soon.'
    );
  }
  
  // Determine sentiment
  const sentiment = urgency === 'critical' || urgency === 'high' ? 'urgent' : 'neutral';
  
  // Extract keywords
  const keywords = words
    .filter(w => w.length > 4)
    .filter(w => [...CLINICAL_KEYWORDS, ...ADMIN_KEYWORDS, ...URGENT_KEYWORDS].some(k => w.includes(k)))
    .slice(0, 5);
  
  return {
    urgency,
    category,
    suggestedRecipients,
    suggestedResponses,
    sentiment,
    keywords
  };
}

// ============================================
// Mock WebSocket for Real-time Alerts
// ============================================
type AlertCallback = (alerts: PredictiveAlert[]) => void;

class MockAlertWebSocket {
  private callback: AlertCallback | null = null;
  private interval: ReturnType<typeof setInterval> | null = null;
  private connected = false;

  connect(onAlerts: AlertCallback) {
    this.callback = onAlerts;
    this.connected = true;
    
    // Initial alerts
    getClinicalAlerts().then(alerts => {
      if (this.callback && this.connected) {
        this.callback(alerts);
      }
    });
    
    // Periodic updates
    this.interval = setInterval(() => {
      if (this.callback && this.connected) {
        getClinicalAlerts().then(alerts => {
          if (this.callback && this.connected) {
            this.callback(alerts);
          }
        });
      }
    }, 30000); // Update every 30 seconds
    
    return () => this.disconnect();
  }

  disconnect() {
    this.connected = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.callback = null;
  }

  isConnected() {
    return this.connected;
  }
}

export const alertWebSocket = new MockAlertWebSocket();
