import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, Progress } from 'antd';
import type { RootState, AppDispatch } from '../../../core/redux/store';
import { updateClinicalAlerts, setAlertsConnected, fetchClinicalAlerts } from '../../../core/redux/aiSlice';
import { alertWebSocket } from '../../../core/ai/mockApi';
import type { PredictiveAlert, RiskLevel } from '../../../core/ai/types';
import ImageWithBasePath from '../../../core/imageWithBasePath';

interface ClinicalAlertWidgetProps {
  maxAlerts?: number;
  compact?: boolean;
}

const ClinicalAlertWidget: React.FC<ClinicalAlertWidgetProps> = ({
  maxAlerts = 5,
  compact = false
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { alerts, connected, lastUpdated } = useSelector((state: RootState) => state.ai.clinicalAlerts);

  // Connect to mock WebSocket for real-time alerts
  useEffect(() => {
    const disconnect = alertWebSocket.connect((newAlerts) => {
      dispatch(updateClinicalAlerts(newAlerts));
      dispatch(setAlertsConnected(true));
    });

    dispatch(setAlertsConnected(true));

    return () => {
      disconnect();
      dispatch(setAlertsConnected(false));
    };
  }, [dispatch]);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchClinicalAlerts());
  }, [dispatch]);

  const getRiskColor = (level: RiskLevel): string => ({
    critical: '#F44336',
    high: '#FF9800',
    moderate: '#FFC107',
    low: '#4CAF50'
  }[level]);

  const getRiskBgClass = (level: RiskLevel): string => ({
    critical: 'bg-danger',
    high: 'bg-warning',
    moderate: 'bg-warning-light',
    low: 'bg-success'
  }[level]);

  const getAlertTypeClass = (level: RiskLevel): 'error' | 'warning' | 'info' | 'success' => ({
    critical: 'error' as const,
    high: 'warning' as const,
    moderate: 'info' as const,
    low: 'success' as const
  }[level]);

  const filteredAlerts = alerts
    .filter(a => a.riskLevel !== 'low')
    .slice(0, maxAlerts);

  const handleDismiss = (alertId: string) => {
    const updatedAlerts = alerts.filter(a => a.id !== alertId);
    dispatch(updateClinicalAlerts(updatedAlerts));
  };

  const handleAcknowledge = (alert: PredictiveAlert) => {
    // In a real app, this would mark the alert as acknowledged
    console.log('Acknowledged alert:', alert.id);
  };

  if (compact) {
    return (
      <div className="clinical-alerts-compact">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="fw-bold small">
            <i className="ti ti-alert-triangle text-danger me-1" />
            Active Alerts
          </span>
          <span className={`badge ${connected ? 'bg-success' : 'bg-secondary'}`}>
            {connected ? 'Live' : 'Offline'}
          </span>
        </div>
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-2 text-muted small">
            <i className="ti ti-check-circle text-success me-1" />
            No critical alerts
          </div>
        ) : (
          <div className="alert-list-compact">
            {filteredAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="d-flex align-items-center py-1 border-bottom"
              >
                <span
                  className="rounded-circle me-2"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: getRiskColor(alert.riskLevel)
                  }}
                />
                <span className="small flex-grow-1 text-truncate">{alert.patientName}</span>
                <span className="badge bg-light text-dark small">{alert.timeframe}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="clinical-alerts-widget">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <i className="ti ti-alert-triangle-filled text-danger me-2 fs-5" />
          <span className="fw-bold">Predictive Clinical Alerts</span>
        </div>
        <div className="d-flex align-items-center">
          <span className={`status-indicator me-2 ${connected ? 'connected' : 'disconnected'}`}>
            <span
              className="rounded-circle d-inline-block me-1"
              style={{
                width: 8,
                height: 8,
                backgroundColor: connected ? '#4CAF50' : '#9e9e9e',
                animation: connected ? 'pulse 2s infinite' : 'none'
              }}
            />
            {connected ? 'Live' : 'Reconnecting...'}
          </span>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-4">
          <i className="ti ti-shield-check text-success fs-1 mb-2 d-block" />
          <p className="text-muted mb-0">No high-priority alerts at this time</p>
          <small className="text-muted">AI is continuously monitoring patient data</small>
        </div>
      ) : (
        <div className="alert-timeline">
          {filteredAlerts.map((alert, idx) => (
            <div
              key={alert.id}
              className={`alert-item mb-3 p-3 rounded border-start border-4`}
              style={{ borderColor: getRiskColor(alert.riskLevel) }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center">
                  <div className="avatar avatar-sm me-2">
                    <ImageWithBasePath
                      src={`assets/img/users/${alert.patientImage}`}
                      alt={alert.patientName}
                      className="rounded-circle"
                    />
                  </div>
                  <div>
                    <strong className="d-block">{alert.patientName}</strong>
                    <span className={`badge ${getRiskBgClass(alert.riskLevel)} text-white small`}>
                      {alert.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
                <Tooltip title={`${alert.confidence}% confidence`}>
                  <Progress
                    type="circle"
                    percent={alert.confidence}
                    size={40}
                    strokeColor={getRiskColor(alert.riskLevel)}
                    format={(percent) => `${percent}%`}
                  />
                </Tooltip>
              </div>

              <div className="alert-content">
                <p className="mb-2">
                  <strong>Predicted:</strong> {alert.predictedEvent}
                  <span className="text-muted ms-1">within {alert.timeframe}</span>
                </p>

                <div className="mb-2">
                  <strong className="small text-muted">Contributing Factors:</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {alert.contributingFactors.map((factor, i) => (
                      <span key={i} className="badge bg-light text-dark small">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="recommended-actions">
                  <strong className="small text-muted">Recommended Actions:</strong>
                  <ul className="mb-0 ps-3 mt-1 small">
                    {alert.recommendedActions.slice(0, 3).map((action, i) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAcknowledge(alert)}
                  >
                    <i className="ti ti-check me-1" />
                    Acknowledge
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleDismiss(alert.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-3 pt-3 border-top">
        <small className="text-muted">
          <i className="ti ti-sparkles me-1" />
          AI predictions based on vital trends, lab results, and historical patterns
        </small>
      </div>
    </div>
  );
};

export default ClinicalAlertWidget;
