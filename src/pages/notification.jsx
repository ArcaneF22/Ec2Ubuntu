
import { useLayoutEffect, useState } from 'react';
import { FetchNotification } from '../utilities/fetch/tables/notification'



export const NotificationPage = () => {

    return (
      <div className="expand-centered">
        <h1>Notification Pages</h1>
        
      <FetchNotification />

      </div>
    );
  };
  