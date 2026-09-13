import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#0B0F19', color: '#EDF1F7', minHeight: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', padding: 40, fontFamily: 'Inter, sans-serif'
        }}>
          <h2 style={{ color: '#ff6b6b', marginBottom: 16 }}>Something went wrong</h2>
          <pre style={{ background: '#121A2C', padding: 20, borderRadius: 8, maxWidth: 600, overflow: 'auto', fontSize: 13 }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{
            marginTop: 20, padding: '12px 24px', background: '#7C5CFC', color: '#fff',
            border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600
          }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
