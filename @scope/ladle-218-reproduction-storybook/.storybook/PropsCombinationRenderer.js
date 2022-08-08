import React from 'react';

/***
 * Component used by react-storybook-addon-props-combinations to render a single combination
 *
 * react-storybook-addon-props-combinations docs found here:
 * https://github.com/evgenykochetkov/react-storybook-addon-props-combinations
 *
 * Altered default code, which is found here:
 * https://github.com/evgenykochetkov/react-storybook-addon-props-combinations/blob/master/src/CombinationRenderer.js
***/

const PropsCombinationRenderer = ({ Component, props, options }) => {
  const el = React.createElement(Component, props);

  const {
    showSource,
    style,
  } = options;

  function formatObject(obj){
    return JSON.stringify(
      obj,
      (key, value) => typeof value === 'string' ? `'${value}'` : value
    ).replace(/"/g, '');
  }

  // prints all defined props and their values
  const propsDisplay = Object.keys(props)
    .filter(key => props[key] !== undefined && key !== 'id')
    .map(key => `${key}: ${(
      typeof props[key] === 'object' ? formatObject(props[key]) : props[key]
    )}`)
    .join(' | ');

  return (
    <div className='props-combinations fe_u_padding--small' style={style}>
      <div className='props-combinations__demo'>
        {el}
      </div>
      {showSource && (
        <div className='props-combinations__props fe_U-margin--top-xsmall'>{propsDisplay}</div>
      )}
    </div>
  );
};

export default PropsCombinationRenderer;
