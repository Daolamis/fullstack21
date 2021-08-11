const Notification = ({ notification }) => {
    if (!notification) {
        return null;
    }
    const notificationClass = notification.isError ? 'error' : 'info';
    return <div className={notificationClass}>{notification.msg}</div>
}

export default Notification;