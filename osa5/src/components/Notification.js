import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  const className = notification.isError ? 'error' : 'info';
  return (
    <div className={`notification ${className}`}>
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message:PropTypes.string.isRequired,
    isError: PropTypes.bool
  })
}

export default Notification;