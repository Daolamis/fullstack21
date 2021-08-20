

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  const className = notification.isError ? 'error' : 'info';
  return (
    <div className={className}>
      {notification.message}
    </div>
  );
};

export default Notification;