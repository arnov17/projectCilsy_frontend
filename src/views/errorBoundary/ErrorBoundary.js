import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    // componentDidCatch(error, errorInfo) {
    //   // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    // }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div>
            <h1>Something went wrong.</h1>
            <h2>Maybe, You Should Sign in or Sign Up First</h2>
          </div>
        )
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary