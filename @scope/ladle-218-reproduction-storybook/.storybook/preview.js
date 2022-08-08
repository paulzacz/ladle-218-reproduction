import '@scope/ladle-218-reproduction/dist/ladle-218-reproduction.css';
import './demo.css';
import { addDecorator, addParameters } from '@storybook/react';
import { setDefaults } from 'react-storybook-addon-props-combinations';
import React from 'react';
import PropsCombinationRenderer from './PropsCombinationRenderer';
import { Root } from '@scope/ladle-218-reproduction';

const DemoWrapper = (storyFn) => <Root>{storyFn()}</Root>;
addDecorator(DemoWrapper);
addParameters({
  a11y: {},
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error); // eslint-disable-line no-console
    console.log(info); // eslint-disable-line no-console
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

addDecorator((story) => <ErrorBoundary>{story()}</ErrorBoundary>);

setDefaults({
  CombinationRenderer: PropsCombinationRenderer,
});
