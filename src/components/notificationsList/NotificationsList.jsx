import React from 'react';
import NotificationsItem from '../notificationsItem/NotificationsItem';
import './notificationsList.scss';

const NotificationsList = ({ notifications }) => {
  return (
    <ul className="notifications__list">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationsItem notification={notification} key={index} />
        ))
      ) : (
        <p className="notifications__list-warning">
          You don't have notifications...
        </p>
      )}
    </ul>
  );
};

export default NotificationsList;
