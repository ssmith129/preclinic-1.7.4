import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Tooltip, Spin } from 'antd';
import { updateAcuityScore, VitalsData } from '../../../core/redux/triageSlice';
import { RootState } from '../../../core/redux/store';

interface TriagePriorityBadgeProps {
  patientId: string;
  symptoms: string[];
  vitals?: VitalsData;
  waitTime: number;
}

interface PriorityConfig {
  color: string;
  label: string;
  icon: string;
}

const PRIORITY_CONFIG: Record<number, PriorityConfig> = {
  1: { color: '#F44336', label: 'Critical', icon: 'ti-alert-triangle' },
  2: { color: '#FF9800', label: 'Urgent', icon: 'ti-alert-circle' },
  3: { color: '#FFC107', label: 'Semi-Urgent', icon: 'ti-clock' },
  4: { color: '#4CAF50', label: 'Standard', icon: 'ti-check' },
  5: { color: '#2196F3', label: 'Non-Urgent', icon: 'ti-info' }
};

export const TriagePriorityBadge: React.FC<TriagePriorityBadgeProps> = ({
  patientId,
  symptoms,
  vitals,
  waitTime
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const acuityScore = useSelector((state: RootState) => state.triage.acuityScores[patientId]);

  const assessPriority = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/triage/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, symptoms, vitals, waitTime })
      });
      
      if (!response.ok) {
        throw new Error('Failed to assess priority');
      }
      
      const { priority, confidence, factors } = await response.json();
      dispatch(updateAcuityScore({ patientId, priority, confidence, factors }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Assessment failed');
      // Set default priority on error
      dispatch(updateAcuityScore({ 
        patientId, 
        priority: 4, 
        confidence: 0, 
        factors: ['Assessment unavailable'] 
      }));
    } finally {
      setLoading(false);
    }
  }, [patientId, symptoms, vitals, waitTime, dispatch]);

  useEffect(() => {
    assessPriority();
  }, [assessPriority]);

  const config = PRIORITY_CONFIG[acuityScore?.priority || 4];
  const confidenceText = acuityScore?.confidence 
    ? `${acuityScore.confidence}% confidence` 
    : 'Calculating...';
  const tooltipTitle = error 
    ? `Error: ${error}` 
    : `${config.label} - ${confidenceText}`;

  return (
    <Tooltip title={tooltipTitle}>
      <Badge
        className="triage-priority-badge"
        style={{ backgroundColor: config.color }}
      >
        {loading ? (
          <Spin size="small" />
        ) : (
          <>
            <i className={`ti ${config.icon} me-1`} />
            {config.label}
          </>
        )}
      </Badge>
    </Tooltip>
  );
};

export default TriagePriorityBadge;
