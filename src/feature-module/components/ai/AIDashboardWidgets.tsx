import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import type { RootState, AppDispatch } from '../../../core/redux/store';
import { loadPersonalizedLayout, recordInteraction, fetchClinicalAlerts } from '../../../core/redux/aiSlice';
import type { UserRole } from '../../../core/ai/types';
import { all_routes } from '../../routes/all_routes';
import ClinicalAlertWidget from './ClinicalAlertWidget';

interface SmartWidgetProps {
  widgetId: string;
  onInteraction?: (widgetId: string, action: string) => void;
  aiRecommended?: boolean;
}

// Smart Widget Component
const SmartWidget: React.FC<SmartWidgetProps> = ({ widgetId, onInteraction, aiRecommended }) => {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => {
    setExpanded(!expanded);
    onInteraction?.(widgetId, expanded ? 'collapse' : 'expand');
  };

  const getWidgetContent = () => {
    switch (widgetId) {
      case 'patientAcuity':
        return <PatientAcuityWidget />;
      case 'patientQueue':
        return <PatientQueueWidget />;
      case 'clinicalAlerts':
        return <ClinicalAlertWidget />;
      case 'aiInsights':
        return <AIInsightsWidget />;
      default:
        return <DefaultWidgetContent widgetId={widgetId} />;
    }
  };

  const widgetTitles: Record<string, string> = {
    patientAcuity: 'Patient Acuity Overview',
    patientQueue: 'Smart Patient Queue',
    clinicalAlerts: 'Predictive Clinical Alerts',
    aiInsights: 'AI Insights',
    appointmentStats: 'Appointment Statistics',
    revenueChart: 'Revenue Overview',
    staffSchedule: 'Staff Schedule',
    resourceUtilization: 'Resource Utilization',
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h5 className="fw-bold mb-0">{widgetTitles[widgetId] || widgetId}</h5>
          {aiRecommended && (
            <span className="badge bg-warning text-dark ms-2 fs-10">
              <i className="ti ti-sparkles me-1" />
              AI Suggested
            </span>
          )}
        </div>
        <button
          className="btn btn-sm btn-outline-secondary border-0"
          onClick={handleToggle}
        >
          <i className={`ti ti-chevron-${expanded ? 'up' : 'down'}`} />
        </button>
      </div>
      {expanded && (
        <div className="card-body">
          {getWidgetContent()}
        </div>
      )}
    </div>
  );
};

// Patient Acuity Widget
const PatientAcuityWidget: React.FC = () => {
  const acuityData = [
    { level: 'Critical', count: 2, color: '#F44336' },
    { level: 'Urgent', count: 5, color: '#FF9800' },
    { level: 'Semi-Urgent', count: 8, color: '#FFC107' },
    { level: 'Standard', count: 15, color: '#4CAF50' },
    { level: 'Non-Urgent', count: 12, color: '#2196F3' },
  ];

  return (
    <div>
      <div className="row mb-3">
        <div className="col-6">
          <div className="text-center p-3 bg-light rounded">
            <h2 className="fw-bold mb-0 text-danger">7</h2>
            <small className="text-muted">High Priority</small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-3 bg-light rounded">
            <h2 className="fw-bold mb-0 text-success">35</h2>
            <small className="text-muted">Standard</small>
          </div>
        </div>
      </div>
      {acuityData.map((item) => (
        <div key={item.level} className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <span
              className="rounded-circle me-2"
              style={{ width: 10, height: 10, backgroundColor: item.color }}
            />
            <span>{item.level}</span>
          </div>
          <span className="badge bg-light text-dark">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

// Patient Queue Widget
const PatientQueueWidget: React.FC = () => {
  const queueData = [
    { name: 'Maria Santos', waitTime: '45 min', priority: 1, condition: 'Chest Pain' },
    { name: 'James Wilson', waitTime: '30 min', priority: 2, condition: 'High Fever' },
    { name: 'Emily Chen', waitTime: '20 min', priority: 3, condition: 'Abdominal Pain' },
    { name: 'Robert Johnson', waitTime: '15 min', priority: 4, condition: 'Follow-up' },
  ];

  const getPriorityBadge = (priority: number) => {
    const colors = ['#F44336', '#FF9800', '#FFC107', '#4CAF50', '#2196F3'];
    const labels = ['Critical', 'Urgent', 'Semi-Urgent', 'Standard', 'Non-Urgent'];
    return (
      <span
        className="badge"
        style={{ backgroundColor: colors[priority - 1], color: '#fff' }}
      >
        {labels[priority - 1]}
      </span>
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-sm mb-0">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Wait Time</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {queueData.map((patient, idx) => (
            <tr key={idx}>
              <td>
                <div>
                  <strong>{patient.name}</strong>
                  <div className="text-muted small">{patient.condition}</div>
                </div>
              </td>
              <td>{patient.waitTime}</td>
              <td>{getPriorityBadge(patient.priority)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// AI Insights Widget
const AIInsightsWidget: React.FC = () => {
  const insights = [
    { icon: 'ti-trending-up', text: 'Patient volume expected to increase 15% this afternoon', type: 'info' },
    { icon: 'ti-alert-circle', text: '3 patients showing early signs of deterioration', type: 'warning' },
    { icon: 'ti-calendar', text: 'Optimal scheduling window: 2:00 PM - 4:00 PM', type: 'success' },
  ];

  return (
    <div>
      {insights.map((insight, idx) => (
        <div
          key={idx}
          className={`d-flex align-items-start p-2 mb-2 rounded bg-soft-${insight.type}`}
        >
          <i className={`ti ${insight.icon} me-2 mt-1 text-${insight.type}`} />
          <span className="small">{insight.text}</span>
        </div>
      ))}
      <div className="text-center mt-3">
        <span className="text-muted small">
          <i className="ti ti-sparkles me-1" />
          AI-generated insights based on current data
        </span>
      </div>
    </div>
  );
};

// Default Widget Content
const DefaultWidgetContent: React.FC<{ widgetId: string }> = ({ widgetId }) => (
  <div className="text-center py-4 text-muted">
    <i className="ti ti-chart-bar fs-1 mb-2 d-block opacity-50" />
    <p className="mb-0">{widgetId} widget content</p>
  </div>
);

// Main AI Dashboard Section Component
interface AIDashboardSectionProps {
  userRole?: UserRole;
  userId?: string;
}

const AIDashboardSection: React.FC<AIDashboardSectionProps> = ({
  userRole = 'admin',
  userId = 'user-1'
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { personalizedLayout, loading } = useSelector((state: RootState) => state.ai.dashboard);

  useEffect(() => {
    dispatch(loadPersonalizedLayout({ userId, role: userRole }));
    dispatch(fetchClinicalAlerts());
  }, [dispatch, userId, userRole]);

  const handleWidgetInteraction = (widgetId: string, action: string) => {
    dispatch(recordInteraction({
      userId,
      widgetId,
      action: action as 'view' | 'click' | 'expand' | 'collapse' | 'dismiss',
      timestamp: Date.now()
    }));
  };

  // AI-enhanced widgets to show
  const aiWidgets = ['patientAcuity', 'clinicalAlerts', 'aiInsights'];
  const suggestedWidgetIds = personalizedLayout?.aiSuggestions.map(s => s.widgetId) || [];

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <h5 className="fw-bold mb-0">AI-Powered Insights</h5>
          </div>
          <Link to={all_routes.appointments} className="btn btn-sm btn-outline-primary">
            View All Insights
          </Link>
        </div>
      </div>
      {aiWidgets.map((widgetId) => (
        <div key={widgetId} className="col-xl-4 col-lg-6 mb-4">
          <SmartWidget
            widgetId={widgetId}
            onInteraction={handleWidgetInteraction}
            aiRecommended={suggestedWidgetIds.includes(widgetId)}
          />
        </div>
      ))}
    </div>
  );
};

export { SmartWidget, AIDashboardSection, PatientAcuityWidget, PatientQueueWidget, AIInsightsWidget };
export default AIDashboardSection;
