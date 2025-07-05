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
    console.error('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="text-center text-white p-8">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-xl font-semibold mb-2">Coding in Progress</h2>
            <p className="text-gray-400 text-sm">3D visualization temporarily unavailable</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
