import React from "react";

/**
 * Error boundary specifically for React Three Fiber <Canvas> components.
 *
 * When React Router unmounts a page containing an R3F Canvas, React's DOM
 * reconciler sometimes tries to `removeChild` on nodes that R3F's internal
 * renderer has already removed. This throws a NotFoundError that crashes the
 * entire app. This boundary catches that error silently and renders nothing,
 * allowing the route transition to complete.
 */
export default class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Silence the removeChild / R3F unmount errors — they are harmless
    const msg = error?.message || "";
    const isCanvasError =
      msg.includes("removeChild") ||
      msg.includes("insertBefore") ||
      msg.includes("Cannot read properties of null");

    if (!isCanvasError) {
      // Re-throw unexpected errors so they surface normally
      throw error;
    }
    // Otherwise swallow — navigation will continue fine
  }

  render() {
    if (this.state.hasError) {
      return null; // Component already unmounting, just render nothing
    }
    return this.props.children;
  }
}
