import React, { Component, ErrorInfo, ReactNode } from 'react';
import { mdiAlertCircle } from '@mdi/js';
import BaseIcon from './BaseIcon';
import { withTranslation, WithTranslation } from 'react-i18next';

// Define the props and state interfaces
interface ErrorBoundaryProps extends WithTranslation {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showStack: boolean;
}

// Class-based ErrorBoundary Component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define state variables
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showStack: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<ErrorBoundaryProps>,
    prevState: Readonly<ErrorBoundaryState>,
    snapshot?: any,
  ) {
    console.log('componentDidUpdate');
  }

  async componentWillUnmount() {
    console.log('componentWillUnmount');
    const response = await fetch('/api/logError', {
      method: 'DELETE',
    });

    const data = await response.json();
    console.log('Error logs cleared:', data);
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Error caught in boundary:', error, errorInfo);

    // Update state with error details
    this.setState({
      errorInfo: errorInfo,
    });

    // Function to log errors to the server
    const logErrorToServer = async () => {
      try {
        const response = await fetch('/api/logError', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: error.message,
            stack: errorInfo.componentStack,
          }),
        });

        const data = await response.json();
        console.log('Error logged:', data);
      } catch (err) {
        console.error('Failed to log error:', err);
      }
    };

    // Function to fetch logged errors (optional)
    const fetchLoggedErrors = async () => {
      try {
        const response = await fetch('/api/logError');
        const data = await response.json();
        console.log('Fetched logs:', data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };

    await logErrorToServer();
    await fetchLoggedErrors();
  }

  toggleStack = () => {
    this.setState((prevState) => ({
      showStack: !prevState.showStack,
    }));
  };

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showStack: false,
    });
  };

  tryAgain = async () => {
    try {
      const response = await fetch('/api/logError', {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log('Error logs cleared:', data);
    } catch (e) {
      console.error('Failed to clear error logs:', e);
    }

    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // Extract error details
      const { error, errorInfo, showStack } = this.state;
      const errorMessage = error?.message || 'An unexpected error occurred';
      const stackTrace =
        errorInfo?.componentStack || error?.stack || 'No stack trace available';

      const { t } = this.props;

      return (
        <div className='flex items-center justify-center min-h-screen bg-pavitra-300'>
          <div className='max-w-lg w-full p-8 bg-white rounded-lg shadow-sm'>
            <div className='flex flex-col items-center text-center space-y-6'>
              <div className='p-3 bg-pavitra-500 rounded-full flex items-center justify-center'>
                <BaseIcon
                  path={mdiAlertCircle}
                  size={32}
                  className='text-pavitra-red'
                />
              </div>

              <div className='space-y-2'>
                <h2 className='text-xl font-semibold text-pavitra-900'>
                  {t('errorBoundary.somethingWentWrong')}
                </h2>
                <p className='text-pavitra-800'>
                  {t('errorBoundary.unexpectedError')}
                </p>
              </div>

              <div className='w-full text-left p-4 bg-pavitra-400 rounded-md overflow-hidden'>
                <p className='font-mono text-sm text-pavitra-red break-words'>
                  {errorMessage}
                </p>

                <div className='mt-4'>
                  <button
                    onClick={this.toggleStack}
                    className='text-xs text-pavitra-800 flex items-center gap-1'
                  >
                    <span>
                      {showStack
                        ? t('errorBoundary.hideStack')
                        : t('errorBoundary.showStack')}
                    </span>
                    <span className='text-xs'>{showStack ? '▲' : '▼'}</span>
                  </button>

                  {showStack && (
                    <pre className='mt-2 p-3 bg-pavitra-500 rounded text-xs font-mono text-pavitra-900 overflow-x-auto max-h-64'>
                      {stackTrace}
                    </pre>
                  )}
                </div>
              </div>

              <div className='space-y-4 w-full'>
                <button
                  className='w-full py-2 px-4 bg-pavitra-blue hover:bg-pavitra-900 text-white rounded-md transition-colors'
                  onClick={this.tryAgain}
                >
                  {t('errorBoundary.tryAgain')}
                </button>

                <button
                  className='w-full py-2 px-4 border border-pavitra-600 text-pavitra-800 hover:bg-pavitra-400 rounded-md transition-colors'
                  onClick={this.resetError}
                >
                  {t('errorBoundary.goBack')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation('common')(ErrorBoundary);
