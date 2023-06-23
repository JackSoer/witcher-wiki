import React from 'react';
import { Link } from 'react-router-dom';
import './notificationsItem.scss';

const NotificationsItem = ({ notification }) => {
  return (
    <li
      className={
        notification.checked
          ? 'notifications__item notifications__item--checked'
          : 'notifications__item'
      }
    >
      <p className="notifications__item-title">
        {notification.title}
        {notification?.articleId && (
          <Link
            to={`${notification.articleId}`}
            className="notifications__item-link"
          >
            here.
          </Link>
        )}
      </p>
    </li>
  );
};

export default NotificationsItem;
