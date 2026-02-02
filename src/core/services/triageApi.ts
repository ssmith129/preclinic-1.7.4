import { VitalsData } from '../redux/triageSlice';

interface TriageAssessmentRequest {
  patientId: string;
  symptoms: string[];
  vitals?: VitalsData;
  waitTime: number;
}

interface TriageAssessmentResponse {
  priority: 1 | 2 | 3 | 4 | 5;
  confidence: number;
  factors: string[];
}

// Symptom severity mapping for NLP-like analysis
const CRITICAL_SYMPTOMS = [
  'chest pain', 'difficulty breathing', 'unconscious', 'severe bleeding',
  'stroke symptoms', 'heart attack', 'anaphylaxis', 'choking', 'seizure',
  'severe trauma', 'cardiac arrest', 'respiratory distress'
];

const URGENT_SYMPTOMS = [
  'high fever', 'severe pain', 'vomiting blood', 'head injury',
  'abdominal pain', 'dehydration', 'fracture', 'burns', 'allergic reaction',
  'severe headache', 'confusion', 'persistent vomiting'
];

const SEMI_URGENT_SYMPTOMS = [
  'moderate pain', 'fever', 'infection signs', 'minor bleeding',
  'dizziness', 'nausea', 'minor injury', 'sprain', 'rash', 'ear pain',
  'urinary symptoms', 'back pain'
];

/**
 * Analyzes vitals to determine severity factors
 */
const analyzeVitals = (vitals: VitalsData): { severity: number; factors: string[] } => {
  const factors: string[] = [];
  let severity = 0;

  if (vitals.heartRate) {
    if (vitals.heartRate > 120 || vitals.heartRate < 50) {
      severity += 2;
      factors.push(`Abnormal heart rate: ${vitals.heartRate} bpm`);
    } else if (vitals.heartRate > 100 || vitals.heartRate < 60) {
      severity += 1;
      factors.push(`Elevated heart rate: ${vitals.heartRate} bpm`);
    }
  }

  if (vitals.bloodPressureSystolic && vitals.bloodPressureDiastolic) {
    if (vitals.bloodPressureSystolic > 180 || vitals.bloodPressureSystolic < 90) {
      severity += 2;
      factors.push(`Critical BP: ${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`);
    } else if (vitals.bloodPressureSystolic > 140 || vitals.bloodPressureSystolic < 100) {
      severity += 1;
      factors.push(`Abnormal BP: ${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`);
    }
  }

  if (vitals.temperature) {
    if (vitals.temperature > 39.5 || vitals.temperature < 35) {
      severity += 2;
      factors.push(`Critical temperature: ${vitals.temperature}°C`);
    } else if (vitals.temperature > 38.5 || vitals.temperature < 36) {
      severity += 1;
      factors.push(`Abnormal temperature: ${vitals.temperature}°C`);
    }
  }

  if (vitals.oxygenSaturation) {
    if (vitals.oxygenSaturation < 90) {
      severity += 3;
      factors.push(`Low oxygen saturation: ${vitals.oxygenSaturation}%`);
    } else if (vitals.oxygenSaturation < 94) {
      severity += 1;
      factors.push(`Reduced oxygen: ${vitals.oxygenSaturation}%`);
    }
  }

  if (vitals.respiratoryRate) {
    if (vitals.respiratoryRate > 25 || vitals.respiratoryRate < 10) {
      severity += 2;
      factors.push(`Abnormal respiratory rate: ${vitals.respiratoryRate}/min`);
    }
  }

  return { severity, factors };
};

/**
 * Analyzes symptoms using simple NLP-like keyword matching
 */
const analyzeSymptoms = (symptoms: string[]): { severity: number; factors: string[] } => {
  const factors: string[] = [];
  let severity = 0;
  const lowerSymptoms = symptoms.map(s => s.toLowerCase());

  for (const symptom of lowerSymptoms) {
    if (CRITICAL_SYMPTOMS.some(cs => symptom.includes(cs))) {
      severity += 4;
      factors.push(`Critical symptom: ${symptom}`);
    } else if (URGENT_SYMPTOMS.some(us => symptom.includes(us))) {
      severity += 2;
      factors.push(`Urgent symptom: ${symptom}`);
    } else if (SEMI_URGENT_SYMPTOMS.some(ss => symptom.includes(ss))) {
      severity += 1;
      factors.push(`Semi-urgent symptom: ${symptom}`);
    }
  }

  return { severity, factors };
};

/**
 * Analyzes wait time impact on priority
 */
const analyzeWaitTime = (waitTime: number): { severity: number; factors: string[] } => {
  const factors: string[] = [];
  let severity = 0;

  if (waitTime > 180) {
    severity += 1;
    factors.push(`Extended wait time: ${Math.floor(waitTime / 60)}h ${waitTime % 60}m`);
  } else if (waitTime > 120) {
    severity += 0.5;
    factors.push(`Long wait time: ${waitTime} minutes`);
  }

  return { severity, factors };
};

/**
 * Calculates priority level from total severity score
 */
const calculatePriority = (totalSeverity: number): 1 | 2 | 3 | 4 | 5 => {
  if (totalSeverity >= 8) return 1; // Critical
  if (totalSeverity >= 5) return 2; // Urgent
  if (totalSeverity >= 3) return 3; // Semi-Urgent
  if (totalSeverity >= 1) return 4; // Standard
  return 5; // Non-Urgent
};

/**
 * Calculates confidence based on data quality
 */
const calculateConfidence = (
  symptoms: string[],
  vitals: VitalsData | undefined
): number => {
  let confidence = 60; // Base confidence

  // More symptoms = more data = higher confidence
  if (symptoms.length >= 3) confidence += 15;
  else if (symptoms.length >= 1) confidence += 8;

  // Vitals data increases confidence
  if (vitals) {
    const vitalsCount = Object.values(vitals).filter(v => v !== undefined).length;
    confidence += vitalsCount * 5;
  }

  return Math.min(confidence, 98); // Cap at 98%
};

/**
 * Mock API function for triage assessment
 * Simulates AI-based severity scoring using symptom analysis and vitals
 */
export const assessTriagePriority = async (
  request: TriageAssessmentRequest
): Promise<TriageAssessmentResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

  const { symptoms, vitals, waitTime } = request;
  const allFactors: string[] = [];
  let totalSeverity = 0;

  // Analyze symptoms
  const symptomAnalysis = analyzeSymptoms(symptoms);
  totalSeverity += symptomAnalysis.severity;
  allFactors.push(...symptomAnalysis.factors);

  // Analyze vitals if available
  if (vitals) {
    const vitalsAnalysis = analyzeVitals(vitals);
    totalSeverity += vitalsAnalysis.severity;
    allFactors.push(...vitalsAnalysis.factors);
  }

  // Analyze wait time
  const waitTimeAnalysis = analyzeWaitTime(waitTime);
  totalSeverity += waitTimeAnalysis.severity;
  allFactors.push(...waitTimeAnalysis.factors);

  const priority = calculatePriority(totalSeverity);
  const confidence = calculateConfidence(symptoms, vitals);

  return {
    priority,
    confidence,
    factors: allFactors.slice(0, 5) // Limit to top 5 factors
  };
};

/**
 * Initialize mock API handler
 * This intercepts fetch calls to /api/triage/* endpoints
 */
export const initializeTriageMockApi = () => {
  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();

    // Handle triage assessment endpoint
    if (url === '/api/triage/assess' && init?.method === 'POST') {
      try {
        const body = JSON.parse(init.body as string) as TriageAssessmentRequest;
        const result = await assessTriagePriority(body);
        
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Assessment failed' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Handle queue endpoint (mock data)
    if (url === '/api/triage/queue' && init?.method === 'GET') {
      return new Response(JSON.stringify({ queue: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Pass through to original fetch for other requests
    return originalFetch(input, init);
  };
};
