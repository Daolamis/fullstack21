import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './components.styled';

const Togglable = React.forwardRef(({ visibleLabel, hideLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);
  const buttonLabel = !visible ? hideLabel : visibleLabel;

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      <div style={{ display: visible ? '' : 'none' }} >
        {children}
      </div>
      <Button onClick={toggleVisibility}>{buttonLabel}</Button>
    </div >
  );
});
Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  visibleLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
  children: PropTypes.object
};

export default Togglable;