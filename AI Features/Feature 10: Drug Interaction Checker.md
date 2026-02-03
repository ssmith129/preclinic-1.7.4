
## Feature 10: Drug Interaction Checker

### Problem Statement

Physicians and nurses manually review medication lists for potential interactions, which is time-consuming and error-prone. Critical drug-drug and drug-condition interactions may be missed, leading to adverse events. Current systems lack real-time alerts during the prescribing workflow.

### AI Solution

Real-time drug interaction checking system that analyzes new prescriptions against the patient's current medication list, allergies, and conditions. Provides severity-coded alerts with clinical recommendations and alternative medication suggestions.

### Technical Requirements

| Component | Description |
|-----------|-------------|
| **React Components** | `DrugInteractionChecker.tsx`, `InteractionAlert.tsx`, `MedicationReviewPanel.tsx`, `SeverityBadge.tsx` |
| **Redux Slice** | `drugInteractionSlice.ts` (medications, interactions, alerts) |
| **API Endpoints** | `POST /api/drugs/check-interaction`, `GET /api/drugs/alternatives`, `GET /api/patient/:id/medications` |
| **AI Integration** | Drug interaction database, NLP for contraindication analysis |

### Mock API Engine

```typescript
// src/core/api/mock/drugInteractionMockApi.ts
import { v4 as uuidv4 } from 'uuid';

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  prescriber: string;
  status: 'active' | 'discontinued' | 'pending';
}

export interface DrugInteraction {
  id: string;
  drug1: { name: string; id: string };
  drug2: { name: string; id: string };
  severity: 'contraindicated' | 'severe' | 'moderate' | 'minor';
  mechanism: string;
  clinicalEffect: string;
  recommendation: string;
  documentation: 'excellent' | 'good' | 'fair';
  alternatives: { name: string; rationale: string }[];
}

export interface AllergyInteraction {
  id: string;
  drug: { name: string; id: string };
  allergen: string;
  reactionType: string;
  severity: 'severe' | 'moderate' | 'mild';
  crossReactivity: boolean;
  recommendation: string;
}

export interface ConditionInteraction {
  id: string;
  drug: { name: string; id: string };
  condition: string;
  severity: 'contraindicated' | 'severe' | 'moderate' | 'minor';
  clinicalConcern: string;
  recommendation: string;
}

export interface InteractionCheckResult {
  checkId: string;
  timestamp: string;
  newMedication: Medication;
  drugInteractions: DrugInteraction[];
  allergyInteractions: AllergyInteraction[];
  conditionInteractions: ConditionInteraction[];
  overallRisk: 'high' | 'moderate' | 'low' | 'none';
  canProceed: boolean;
  requiresOverride: boolean;
}

// Mock drug interaction database
const INTERACTION_DATABASE: Record>> = {
  'warfarin': {
    'aspirin': {
      severity: 'severe',
      mechanism: 'Additive anticoagulant effects and increased risk of GI bleeding',
      clinicalEffect: 'Significantly increased risk of major bleeding, including intracranial hemorrhage',
      recommendation: 'Avoid combination if possible. If necessary, use lowest effective aspirin dose and monitor INR closely.',
      documentation: 'excellent',
      alternatives: [
        { name: 'Acetaminophen', rationale: 'For pain relief without antiplatelet effects' }
      ]
    },
    'ibuprofen': {
      severity: 'severe',
      mechanism: 'NSAIDs inhibit platelet function and may displace warfarin from protein binding',
      clinicalEffect: 'Increased risk of GI bleeding and elevated INR',
      recommendation: 'Avoid NSAIDs. Use acetaminophen for pain. If NSAID required, use shortest duration and monitor INR.',
      documentation: 'excellent',
      alternatives: [
        { name: 'Acetaminophen', rationale: 'Safer alternative for pain management' },
        { name: 'Topical NSAIDs', rationale: 'Lower systemic absorption' }
      ]
    },
    'metronidazole': {
      severity: 'moderate',
      mechanism: 'Metronidazole inhibits CYP2C9-mediated warfarin metabolism',
      clinicalEffect: 'Increased warfarin effect and risk of bleeding',
      recommendation: 'Monitor INR closely. May need to reduce warfarin dose by 25-50%.',
      documentation: 'good',
      alternatives: []
    }
  },
  'lisinopril': {
    'potassium': {
      severity: 'moderate',
      mechanism: 'ACE inhibitors reduce aldosterone, decreasing potassium excretion',
      clinicalEffect: 'Risk of hyperkalemia, especially in renal impairment',
      recommendation: 'Monitor serum potassium regularly. Avoid potassium supplements unless documented hypokalemia.',
      documentation: 'excellent',
      alternatives: []
    },
    'spironolactone': {
      severity: 'moderate',
      mechanism: 'Both drugs increase serum potassium through different mechanisms',
      clinicalEffect: 'Significantly increased risk of hyperkalemia',
      recommendation: 'Monitor potassium closely, especially in elderly or renal impairment. Start spironolactone at low dose.',
      documentation: 'excellent',
      alternatives: [
        { name: 'Furosemide', rationale: 'Loop diuretic without potassium-sparing effect' }
      ]
    }
  },
  'metformin': {
    'contrast': {
      severity: 'severe',
      mechanism: 'IV contrast can cause acute kidney injury, increasing metformin accumulation',
      clinicalEffect: 'Risk of lactic acidosis',
      recommendation: 'Hold metformin before contrast administration. Resume 48 hours after if renal function stable.',
      documentation: 'excellent',
      alternatives: []
    }
  },
  'simvastatin': {
    'amiodarone': {
      severity: 'severe',
      mechanism: 'Amiodarone inhibits CYP3A4, increasing simvastatin levels',
      clinicalEffect: 'Increased risk of myopathy and rhabdomyolysis',
      recommendation: 'Do not exceed simvastatin 20mg daily with amiodarone. Consider alternative statin.',
      documentation: 'excellent',
      alternatives: [
        { name: 'Pravastatin', rationale: 'Not metabolized by CYP3A4' },
        { name: 'Rosuvastatin', rationale: 'Minimal CYP3A4 metabolism' }
      ]
    },
    'clarithromycin': {
      severity: 'contraindicated',
      mechanism: 'Strong CYP3A4 inhibition dramatically increases statin levels',
      clinicalEffect: 'High risk of rhabdomyolysis',
      recommendation: 'Contraindicated. Hold statin during clarithromycin course or use azithromycin instead.',
      documentation: 'excellent',
      alternatives: [
        { name: 'Azithromycin', rationale: 'Does not inhibit CYP3A4' }
      ]
    }
  }
};

// Mock allergy database
const ALLERGY_DATABASE: Record = {
  'penicillin': {
    crossReactive: ['amoxicillin', 'ampicillin', 'piperacillin'],
    reactionType: 'Anaphylaxis risk'
  },
  'sulfa': {
    crossReactive: ['sulfamethoxazole', 'sulfasalazine', 'celecoxib'],
    reactionType: 'Hypersensitivity reaction'
  },
  'nsaid': {
    crossReactive: ['ibuprofen', 'naproxen', 'aspirin', 'ketorolac'],
    reactionType: 'Bronchospasm, urticaria'
  }
};

export const drugInteractionMockApi = {
  checkInteraction: async (
    newMedication: Partial,
    currentMedications: Medication[],
    allergies: string[],
    conditions: string[]
  ): Promise => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newMed: Medication = {
      id: uuidv4(),
      name: newMedication.name || '',
      genericName: newMedication.genericName || newMedication.name || '',
      dosage: newMedication.dosage || '',
      frequency: newMedication.frequency || '',
      route: newMedication.route || 'PO',
      startDate: new Date().toISOString(),
      prescriber: 'Current User',
      status: 'pending'
    };

    const drugInteractions: DrugInteraction[] = [];
    const allergyInteractions: AllergyInteraction[] = [];
    const conditionInteractions: ConditionInteraction[] = [];

    // Check drug-drug interactions
    const newDrugLower = newMed.genericName.toLowerCase();
    currentMedications.forEach(med => {
      const currentDrugLower = med.genericName.toLowerCase();
      
      // Check both directions
      const interaction = 
        INTERACTION_DATABASE[newDrugLower]?.[currentDrugLower] ||
        INTERACTION_DATABASE[currentDrugLower]?.[newDrugLower];
      
      if (interaction) {
        drugInteractions.push({
          id: uuidv4(),
          drug1: { name: newMed.name, id: newMed.id },
          drug2: { name: med.name, id: med.id },
          ...interaction
        });
      }
    });

    // Check allergy interactions
    allergies.forEach(allergy => {
      const allergyLower = allergy.toLowerCase();
      const allergyInfo = ALLERGY_DATABASE[allergyLower];
      
      if (allergyInfo?.crossReactive.some(drug => 
        newDrugLower.includes(drug) || drug.includes(newDrugLower)
      )) {
        allergyInteractions.push({
          id: uuidv4(),
          drug: { name: newMed.name, id: newMed.id },
          allergen: allergy,
          reactionType: allergyInfo.reactionType,
          severity: 'severe',
          crossReactivity: true,
          recommendation: `Patient has documented ${allergy} allergy. This medication may cause cross-reactivity.`
        });
      }
    });

    // Check condition contraindications
    if (conditions.includes('chronic kidney disease') && 
        ['metformin', 'nsaid', 'ibuprofen', 'naproxen'].some(d => newDrugLower.includes(d))) {
      conditionInteractions.push({
        id: uuidv4(),
        drug: { name: newMed.name, id: newMed.id },
        condition: 'Chronic Kidney Disease',
        severity: newDrugLower.includes('metformin') ? 'contraindicated' : 'severe',
        clinicalConcern: 'May worsen renal function or accumulate in kidney disease',
        recommendation: 'Assess renal function. Consider dose adjustment or alternative medication.'
      });
    }

    // Determine overall risk
    let overallRisk: InteractionCheckResult['overallRisk'] = 'none';
    let requiresOverride = false;

    if (drugInteractions.some(i => i.severity === 'contraindicated') ||
        allergyInteractions.some(i => i.severity === 'severe') ||
        conditionInteractions.some(i => i.severity === 'contraindicated')) {
      overallRisk = 'high';
      requiresOverride = true;
    } else if (drugInteractions.some(i => i.severity === 'severe') ||
               conditionInteractions.some(i => i.severity === 'severe')) {
      overallRisk = 'moderate';
      requiresOverride = true;
    } else if (drugInteractions.some(i => i.severity === 'moderate') ||
               conditionInteractions.some(i => i.severity === 'moderate')) {
      overallRisk = 'moderate';
    } else if (drugInteractions.length > 0 || 
               allergyInteractions.length > 0 || 
               conditionInteractions.length > 0) {
      overallRisk = 'low';
    }

    return {
      checkId: uuidv4(),
      timestamp: new Date().toISOString(),
      newMedication: newMed,
      drugInteractions,
      allergyInteractions,
      conditionInteractions,
      overallRisk,
      canProceed: overallRisk !== 'high',
      requiresOverride
    };
  },

  getAlternatives: async (
    medication: string,
    indication: string
  ): Promise => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock alternatives based on drug class
    const alternatives: Record = {
      'statin': [
        { name: 'Pravastatin', rationale: 'Minimal drug interactions, not CYP3A4 metabolized', interactions: 2 },
        { name: 'Rosuvastatin', rationale: 'Potent LDL reduction with fewer interactions', interactions: 3 }
      ],
      'nsaid': [
        { name: 'Acetaminophen', rationale: 'No antiplatelet effect, renal-safe', interactions: 1 },
        { name: 'Topical Diclofenac', rationale: 'Localized effect with minimal systemic absorption', interactions: 1 }
      ],
      'antibiotic': [
        { name: 'Azithromycin', rationale: 'Fewer drug interactions than macrolide alternatives', interactions: 2 }
      ]
    };

    return alternatives[indication] || [];
  },

  getPatientMedications: async (patientId: string): Promise => {
    await new Promise(resolve => setTimeout(resolve, 400));

    return {
      medications: [
        {
          id: '1',
          name: 'Warfarin',
          genericName: 'warfarin',
          dosage: '5mg',
          frequency: 'Once daily',
          route: 'PO',
          startDate: '2024-01-15',
          prescriber: 'Dr. Smith',
          status: 'active'
        },
        {
          id: '2',
          name: 'Lisinopril',
          genericName: 'lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          route: 'PO',
          startDate: '2023-06-01',
          prescriber: 'Dr. Johnson',
          status: 'active'
        },
        {
          id: '3',
          name: 'Metformin',
          genericName: 'metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          route: 'PO',
          startDate: '2023-03-20',
          prescriber: 'Dr. Williams',
          status: 'active'
        },
        {
          id: '4',
          name: 'Simvastatin',
          genericName: 'simvastatin',
          dosage: '40mg',
          frequency: 'Once daily at bedtime',
          route: 'PO',
          startDate: '2022-11-10',
          prescriber: 'Dr. Smith',
          status: 'active'
        }
      ],
      allergies: ['Penicillin', 'Sulfa'],
      conditions: ['Hypertension', 'Type 2 Diabetes', 'Hyperlipidemia', 'Atrial Fibrillation']
    };
  }
};
```

### Redux Slice

```typescript
// src/core/redux/drugInteractionSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  drugInteractionMockApi, 
  Medication, 
  InteractionCheckResult 
} from '../api/mock/drugInteractionMockApi';

interface DrugInteractionState {
  patientMedications: Medication[];
  patientAllergies: string[];
  patientConditions: string[];
  currentCheck: InteractionCheckResult | null;
  isChecking: boolean;
  checkHistory: InteractionCheckResult[];
  overrideReason: string | null;
  error: string | null;
}

const initialState: DrugInteractionState = {
  patientMedications: [],
  patientAllergies: [],
  patientConditions: [],
  currentCheck: null,
  isChecking: false,
  checkHistory: [],
  overrideReason: null,
  error: null
};

export const loadPatientMedications = createAsyncThunk(
  'drugInteraction/loadMedications',
  async (patientId: string) => {
    return await drugInteractionMockApi.getPatientMedications(patientId);
  }
);

export const checkDrugInteraction = createAsyncThunk(
  'drugInteraction/check',
  async (
    { newMedication, currentMedications, allergies, conditions }: {
      newMedication: Partial;
      currentMedications: Medication[];
      allergies: string[];
      conditions: string[];
    }
  ) => {
    return await drugInteractionMockApi.checkInteraction(
      newMedication, 
      currentMedications, 
      allergies, 
      conditions
    );
  }
);

const drugInteractionSlice = createSlice({
  name: 'drugInteraction',
  initialState,
  reducers: {
    clearCurrentCheck: (state) => {
      state.currentCheck = null;
      state.overrideReason = null;
    },
    setOverrideReason: (state, action: PayloadAction) => {
      state.overrideReason = action.payload;
    },
    acknowledgeInteraction: (state, action: PayloadAction) => {
      if (state.currentCheck) {
        state.checkHistory.push(state.currentCheck);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPatientMedications.fulfilled, (state, action) => {
        state.patientMedications = action.payload.medications;
        state.patientAllergies = action.payload.allergies;
        state.patientConditions = action.payload.conditions;
      })
      .addCase(checkDrugInteraction.pending, (state) => {
        state.isChecking = true;
        state.error = null;
      })
      .addCase(checkDrugInteraction.fulfilled, (state, action) => {
        state.isChecking = false;
        state.currentCheck = action.payload;
      })
      .addCase(checkDrugInteraction.rejected, (state, action) => {
        state.isChecking = false;
        state.error = action.error.message || 'Interaction check failed';
      });
  }
});

export const { clearCurrentCheck, setOverrideReason, acknowledgeInteraction } = drugInteractionSlice.actions;
export default drugInteractionSlice.reducer;
```

### Main Drug Interaction Checker Component

```tsx
// src/feature-module/components/ai/drug-interaction/DrugInteractionChecker.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Input,
  Button,
  AutoComplete,
  Tag,
  Alert,
  Modal,
  List,
  Collapse,
  Badge,
  Tooltip,
  Form,
  Select,
  Row,
  Col,
  Divider,
  Space
} from 'antd';
import {
  SearchOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  MedicineBoxOutlined,
  AlertOutlined,
  SwapOutlined
} from '@ant-design/icons';
import {
  loadPatientMedications,
  checkDrugInteraction,
  clearCurrentCheck,
  setOverrideReason
} from '../../../../core/redux/drugInteractionSlice';
import { InteractionAlert } from './InteractionAlert';
import { MedicationReviewPanel } from './MedicationReviewPanel';
import { SeverityBadge } from './SeverityBadge';
import type { RootState, AppDispatch } from '../../../../core/redux/store';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

interface DrugInteractionCheckerProps {
  patientId: string;
  onPrescribe?: (medication: any, overrideReason?: string) => void;
}

// Mock drug search suggestions
const DRUG_SUGGESTIONS = [
  { value: 'Aspirin', genericName: 'aspirin', class: 'NSAID/Antiplatelet' },
  { value: 'Ibuprofen', genericName: 'ibuprofen', class: 'NSAID' },
  { value: 'Amiodarone', genericName: 'amiodarone', class: 'Antiarrhythmic' },
  { value: 'Clarithromycin', genericName: 'clarithromycin', class: 'Macrolide Antibiotic' },
  { value: 'Metronidazole', genericName: 'metronidazole', class: 'Antibiotic' },
  { value: 'Potassium Chloride', genericName: 'potassium', class: 'Electrolyte' },
  { value: 'Spironolactone', genericName: 'spironolactone', class: 'Diuretic' },
  { value: 'Amoxicillin', genericName: 'amoxicillin', class: 'Penicillin Antibiotic' }
];

export const DrugInteractionChecker: React.FC = ({
  patientId,
  onPrescribe
}) => {
  const dispatch = useDispatch();
  const {
    patientMedications,
    patientAllergies,
    patientConditions,
    currentCheck,
    isChecking,
    overrideReason
  } = useSelector((state: RootState) => state.drugInteraction);

  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);

  useEffect(() => {
    dispatch(loadPatientMedications(patientId));
  }, [dispatch, patientId]);

  const handleDrugSelect = (value: string, option: any) => {
    const drug = DRUG_SUGGESTIONS.find(d => d.value === value);
    setSelectedDrug(drug || null);
    setSearchValue(value);
  };

  const handleCheckInteraction = async () => {
    if (!selectedDrug) return;

    const formValues = form.getFieldsValue();
    
    dispatch(checkDrugInteraction({
      newMedication: {
        name: selectedDrug.value,
        genericName: selectedDrug.genericName,
        dosage: formValues.dosage,
        frequency: formValues.frequency,
        route: formValues.route
      },
      currentMedications: patientMedications,
      allergies: patientAllergies,
      conditions: patientConditions
    }));
  };

  const handleProceed = () => {
    if (currentCheck?.requiresOverride) {
      setShowOverrideModal(true);
    } else {
      onPrescribe?.(currentCheck?.newMedication);
      dispatch(clearCurrentCheck());
    }
  };

  const handleOverrideConfirm = () => {
    onPrescribe?.(currentCheck?.newMedication, overrideReason || undefined);
    setShowOverrideModal(false);
    dispatch(clearCurrentCheck());
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return ;
      case 'moderate': return ;
      case 'low': return ;
      default: return ;
    }
  };

  return (
    
      
        {/* Left Column - Prescribe New Medication */}
        
          
                
                Prescribe New Medication
              
            }
          >
            {/* Drug Search */}
            
              
                <AutoComplete
                  value={searchValue}
                  options={DRUG_SUGGESTIONS.map(d => ({
                    value: d.value,
                    label: (
                      
                        {d.value}
                        {d.class}
                      
                    )
                  }))}
                  onSelect={handleDrugSelect}
                  onChange={setSearchValue}
                  placeholder="Search medication..."
                  size="large"
                  style={{ width: '100%' }}
                  filterOption={(input, option) =>
                    option?.value.toLowerCase().includes(input.toLowerCase())
                  }
                />
              

              
                
                  
                    
                  
                
                
                  
                    
                      Once daily
                      Twice daily
                      Three times daily
                      Every 6 hours
                      As needed (PRN)
                    
                  
                
                
                  
                    
                      Oral (PO)
                      Intravenous (IV)
                      Intramuscular (IM)
                      Subcutaneous (SC)
                      Topical
                    
                  
                
              

              }
                onClick={handleCheckInteraction}
                loading={isChecking}
                disabled={!selectedDrug}
                block
                size="large"
              >
                Check Interactions
              
            

            {/* Interaction Results */}
            {currentCheck && (
              
                
                
                {/* Overall Risk Banner */}
                <Alert
                  type={
                    currentCheck.overallRisk === 'high' ? 'error' :
                    currentCheck.overallRisk === 'moderate' ? 'warning' :
                    currentCheck.overallRisk === 'low' ? 'info' : 'success'
                  }
                  icon={getRiskIcon(currentCheck.overallRisk)}
                  message={
                    
                      
                        Overall Risk: 
                        {currentCheck.overallRisk.toUpperCase()}
                      
                      
                        {currentCheck.drugInteractions.length > 0 && (
                          
                            {currentCheck.drugInteractions.length} Drug Interaction(s)
                          
                        )}
                        {currentCheck.allergyInteractions.length > 0 && (
                          
                            {currentCheck.allergyInteractions.length} Allergy Alert(s)
                          
                        )}
                        {currentCheck.conditionInteractions.length > 0 && (
                          
                            {currentCheck.conditionInteractions.length} Condition Warning(s)
                          
                        )}
                      
                    
                  }
                  showIcon
                  className="mb-4"
                />

                {/* Detailed Interactions */}
                <Collapse defaultActiveKey={['drugs', 'allergies', 'conditions']}>
                  {/* Drug-Drug Interactions */}
                  {currentCheck.drugInteractions.length > 0 && (
                    
                          
                            
                            Drug-Drug Interactions
                          
                        
                      }
                      key="drugs"
                    >
                      {currentCheck.drugInteractions.map((interaction) => (
                        
                      ))}
                    
                  )}

                  {/* Allergy Alerts */}
                  {currentCheck.allergyInteractions.length > 0 && (
                    
                          
                            
                            Allergy Alerts
                          
                        
                      }
                      key="allergies"
                    >
                      {currentCheck.allergyInteractions.map((interaction) => (
                        
                      ))}
                    
                  )}

                  {/* Condition Contraindications */}
                  {currentCheck.conditionInteractions.length > 0 && (
                    
                          
                            
                            Condition Contraindications
                          
                        
                      }
                      key="conditions"
                    >
                      {currentCheck.conditionInteractions.map((interaction) => (
                        
                      ))}
                    
                  )}
                

                {/* No Interactions Found */}
                {currentCheck.overallRisk === 'none' && (
                  }
                  />
                )}

                {/* Action Buttons */}
                
                  <Button onClick={() => dispatch(clearCurrentCheck())}>
                    Cancel
                  
                  
                    {currentCheck.requiresOverride ? 'Override & Prescribe' : 'Prescribe Medication'}
                  
                
              
            )}
          
        

        {/* Right Column - Patient Medication Review */}
        
          
        
      

      {/* Override Confirmation Modal */}
      
            
            Override Required
          
        }
        open={showOverrideModal}
        onCancel={() => setShowOverrideModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowOverrideModal(false)}>
            Cancel
          ,
          
            Confirm Override
          
        ]}
      >
        
        
        
          
            <TextArea
              rows={4}
              placeholder="Enter clinical reason for override..."
              value={overrideReason || ''}
              onChange={(e) => dispatch(setOverrideReason(e.target.value))}
            />
          
        

        
      
    
  );
};
```

### Interaction Alert Component

```tsx
// src/feature-module/components/ai/drug-interaction/InteractionAlert.tsx
import React from 'react';
import { Card, Tag, Divider, List, Button, Tooltip } from 'antd';
import { 
  SwapOutlined, 
  InfoCircleOutlined,
  BookOutlined 
} from '@ant-design/icons';
import { SeverityBadge } from './SeverityBadge';
import type { 
  DrugInteraction, 
  AllergyInteraction, 
  ConditionInteraction 
} from '../../../../core/api/mock/drugInteractionMockApi';

interface InteractionAlertProps {
  interaction: DrugInteraction | AllergyInteraction | ConditionInteraction;
  type: 'drug' | 'allergy' | 'condition';
}

export const InteractionAlert: React.FC = ({
  interaction,
  type
}) => {
  const renderDrugInteraction = (i: DrugInteraction) => (
    
      
        
          {i.drug1.name}
          
          {i.drug2.name}
        
        
      

      
        
          Mechanism:
          {i.mechanism}
        
        
        
          Clinical Effect:
          {i.clinicalEffect}
        
        
        
          Recommendation:
          {i.recommendation}
        

        
          
            }>
              Documentation: {i.documentation}
            
          
        

        {i.alternatives.length > 0 && (
          <>
            
            
              Safer Alternatives:
              <List
                size="small"
                dataSource={i.alternatives}
                renderItem={(alt) => (
                  
                    {alt.name}
                    {alt.rationale}
                  
                )}
              />
            
          </>
        )}
      
    
  );

  const renderAllergyInteraction = (i: AllergyInteraction) => (
    
      
        
          {i.drug.name}
          ⚠️
          Allergy: {i.allergen}
        
        
      

      
        
          Reaction Type:
          {i.reactionType}
        
        
        {i.crossReactivity && (
          
            Cross-Reactivity Risk
          
        )}
        
        
          Recommendation:
          {i.recommendation}
        
      
    
  );

  const renderConditionInteraction = (i: ConditionInteraction) => (
    
      
        
          {i.drug.name}
          ⚕️
          {i.condition}
        
        
      

      
        
          Clinical Concern:
          {i.clinicalConcern}
        
        
        
          Recommendation:
          {i.recommendation}
        
      
    
  );

  switch (type) {
    case 'drug':
      return renderDrugInteraction(interaction as DrugInteraction);
    case 'allergy':
      return renderAllergyInteraction(interaction as AllergyInteraction);
    case 'condition':
      return renderConditionInteraction(interaction as ConditionInteraction);
    default:
      return null;
  }
};
```

### Severity Badge Component

```tsx
// src/feature-module/components/ai/drug-interaction/SeverityBadge.tsx
import React from 'react';
import { Tag, Tooltip } from 'antd';
import {
  StopOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

interface SeverityBadgeProps {
  severity: 'contraindicated' | 'severe' | 'moderate' | 'minor' | 'mild' | 'low';
}

const SEVERITY_CONFIG = {
  contraindicated: {
    color: '#F44336',
    bgColor: '#ffebee',
    icon: ,
    label: 'CONTRAINDICATED',
    description: 'Should not be used together under any circumstances'
  },
  severe: {
    color: '#E53935',
    bgColor: '#ffcdd2',
    icon: ,
    label: 'SEVERE',
    description: 'May cause life-threatening effects or require intervention'
  },
  moderate: {
    color: '#FF9800',
    bgColor: '#fff3e0',
    icon: ,
    label: 'MODERATE',
    description: 'May cause clinical deterioration; monitoring recommended'
  },
  minor: {
    color: '#FFC107',
    bgColor: '#fffde7',
    icon: ,
    label: 'MINOR',
    description: 'Limited clinical significance; be aware'
  },
  mild: {
    color: '#4CAF50',
    bgColor: '#e8f5e9',
    icon: ,
    label: 'MILD',
    description: 'Minimal clinical significance'
  },
  low: {
    color: '#4CAF50',
    bgColor: '#e8f5e9',
    icon: ,
    label: 'LOW',
    description: 'Minimal clinical significance'
  }
};

export const SeverityBadge: React.FC = ({ severity }) => {
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.minor;

  return (
    
      
        {config.label}
      
    
  );
};
```

### Medication Review Panel Component

```tsx
// src/feature-module/components/ai/drug-interaction/MedicationReviewPanel.tsx
import React from 'react';
import { Card, List, Tag, Divider, Empty } from 'antd';
import {
  MedicineBoxOutlined,
  AlertOutlined,
  HeartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { Medication } from '../../../../core/api/mock/drugInteractionMockApi';

interface MedicationReviewPanelProps {
  medications: Medication[];
  allergies: string[];
  conditions: string[];
}

export const MedicationReviewPanel: React.FC = ({
  medications,
  allergies,
  conditions
}) => {
  return (
    
      {/* Current Medications */}
      
            
            Current Medications ({medications.length})
          
        }
        className="mb-3"
        size="small"
      >
        {medications.length === 0 ? (
          
        ) : (
          <List
            size="small"
            dataSource={medications}
            renderItem={(med) => (
              
                <List.Item.Meta
                  avatar={
                    <Tag color={med.status === 'active' ? 'green' : 'default'}>
                      {med.status === 'active' ?  : null}
                    
                  }
                  title={{med.name}}
                  description={
                    
                      {med.dosage} • {med.frequency}
                      
                      
                        Prescribed by {med.prescriber}
                      
                    
                  }
                />
              
            )}
          />
        )}
      

      {/* Allergies */}
      
            
            Known Allergies ({allergies.length})
          
        }
        className="mb-3"
        size="small"
      >
        {allergies.length === 0 ? (
          No Known Allergies (NKDA)
        ) : (
          
            {allergies.map((allergy, idx) => (
              
                {allergy}
              
            ))}
          
        )}
      

      {/* Active Conditions */}
      
            
            Active Conditions ({conditions.length})
          
        }
        size="small"
      >
        {conditions.length === 0 ? (
          
        ) : (
          
            {conditions.map((condition, idx) => (
              
                {condition}
              
            ))}
          
        )}
      
    
  );
};
```

### Success Metrics

- ✅ 80% reduction in preventable adverse drug events
- ✅ 95% of significant interactions caught before prescribing
- ✅ 50% reduction in time spent manually reviewing drug interactions
- ✅ 100% audit trail compliance for interaction overrides

---