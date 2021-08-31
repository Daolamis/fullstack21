import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { StyledNotification } from './components.styled';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification) {
    return null;
  }

  return (
    <StyledNotification error={notification.isError}>
      {notification.message}
    </StyledNotification>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool
  })
};

export default Notification;