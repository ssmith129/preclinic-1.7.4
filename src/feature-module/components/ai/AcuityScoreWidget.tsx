import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Progress, Tag, Tooltip } from 'antd';
import { RootState } from '../../../core/redux/store';

interface AcuityScoreWidgetProps {
  patientId: string;
  showFactors?: boolean;
  compact?: boolean;
}

interface PriorityInfo {
  color: string;
  label: string;
  description: string;
  progressColor: string;
}

const PRIORITY_INFO: Record<number, PriorityInfo> = {
  1: { 
    color: '#F44336', 
    label: 'Critical', 
    description: 'Immediate life-threatening condition',
    progressColor: '#F44336'
  },
  2: { 
    color: '#FF9800', 
    label: 'Urgent', 
    description: 'Potentially life-threatening, requires rapid assessment',
    progressColor: '#FF9800'
  },
  3: { 
    color: '#FFC107', 
    label: 'Semi-Urgent', 
    description: 'Serious condition requiring timely treatment',
    progressColor: '#FFC107'
  },
  4: { 
    color: '#4CAF50', 
    label: 'Standard', 
    description: 'Non-urgent condition, standard wait time acceptable',
    progressColor: '#4CAF50'
  },
  5: { 
    color: '#2196F3', 
    label: 'Non-Urgent', 
    description: 'Minor condition, can wait for extended period',
    progressColor: '#2196F3'
  }
};

export const AcuityScoreWidget: React.FC<AcuityScoreWidgetProps> = ({
  patientId,
  showFactors = true,
  compact = false
}) => {
  const acuityScore = useSelector((state: RootState) => state.triage.acuityScores[patientId]);

  if (!acuityScore) {
    return (
      <Card className="acuity-score-widget acuity-score-widget--loading" size="small">
        <div className="text-center text-muted">
          <i className="ti ti-loader me-2" />
          Calculating acuity score...
        </div>
      </Card>
    );
  }

  const priority = acuityScore.priority;
  const info = PRIORITY_INFO[priority];
  const lastUpdated = new Date(acuityScore.lastUpdated).toLocaleTimeString();

  if (compact) {
    return (
      <Tooltip title={info.description}>
        <div className="acuity-score-widget acuity-score-widget--compact d-inline-flex align-items-center">
          <span 
            className="acuity-score-indicator me-2"
            style={{ backgroundColor: info.color }}
          />
          <span className="acuity-score-label fw-medium">{info.label}</span>
          <span className="acuity-score-confidence ms-2 text-muted fs-12">
            ({acuityScore.confidence}%)
          </span>
        </div>
      </Tooltip>
    );
  }

  return (
    <Card className="acuity-score-widget" size="small">
      <div className="acuity-score-header d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 fw-bold">Acuity Assessment</h6>
        <Tooltip title={`Last updated: ${lastUpdated}`}>
          <Tag color={info.color}>{info.label}</Tag>
        </Tooltip>
      </div>
      
      <div className="acuity-score-body">
        <div className="acuity-confidence mb-3">
          <div className="d-flex justify-content-between mb-1">
            <span className="fs-13 text-muted">AI Confidence</span>
            <span className="fs-13 fw-medium">{acuityScore.confidence}%</span>
          </div>
          <Progress 
            percent={acuityScore.confidence} 
            showInfo={false}
            strokeColor={info.progressColor}
            size="small"
          />
        </div>

        <p className="acuity-description text-muted fs-13 mb-3">
          {info.description}
        </p>

        {showFactors && acuityScore.factors.length > 0 && (
          <div className="acuity-factors">
            <span className="fs-12 text-muted d-block mb-2">Contributing Factors:</span>
            <div className="d-flex flex-wrap gap-1">
              {acuityScore.factors.map((factor, index) => (
                <Tag key={index} className="acuity-factor-tag fs-12">
                  {factor}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AcuityScoreWidget;
