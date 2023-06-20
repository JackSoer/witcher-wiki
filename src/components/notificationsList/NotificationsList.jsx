import { updateDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db } from '../../config/firebase';
import NotificationsItem from '../notificationsItem/NotificationsItem';
import './notificationsList.scss';

const NotificationsList = ({
  notifications,
  setNotifications,
  currentUserId,
}) => {
  const handleClearAll = async () => {
    await updateDoc(doc(db, 'Users', currentUserId), { notifications: [] });
    setNotifications([]);
  };

  return (
    <ul
      className={
        notifications.length > 0
          ? 'notifications__list'
          : 'notifications__list notifications__list--empty'
      }
    >
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationsItem notification={notification} key={index} />
        ))
      ) : (
        <p className="notifications__list-warning">
          You don't have notifications...
        </p>
      )}
      {notifications.length > 0 && (
        <button
          className="notifications__list-clear-btn"
          onClick={handleClearAll}
        >
          Clear all
        </button>
      )}
    </ul>
  );
};

export default NotificationsList;
