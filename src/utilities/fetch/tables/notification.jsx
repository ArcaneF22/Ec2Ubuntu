import React, { useState, useLayoutEffect } from 'react';
import { RawNotification, RawNotificationCount } from '../raw/notification'

export const FetchNotification = () => {

  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counted, setCounted] = useState(0)

  const loadingNotification = (value) => {
      setLoading(value);
  };

  const itemNotification = (value) => {
      setTable(value)
  };

  const countNotification = (value) => {
    setCounted(value)
    };

  useLayoutEffect(() => {

  }, [counted]);
  
  return (
<>
<RawNotificationCount countNotification={countNotification}  />
<RawNotification loadingNotification={loadingNotification} itemNotification={itemNotification} />
{loading ? (
        <div className="ui segment basic">
          <div className="ui active inverted dimmer">
            <div className="ui indeterminate text loader">Loading table...</div>
          </div>
        </div>
      ) : (
      <div className="ui segment ">
        <h3>Notifications List {counted}</h3>
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Details</th>
            <th>Requested By</th>
            <th>Requested To</th>
            <th>Approved by</th>
            <th>Request Date</th>
            <th>Approved Date</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {table.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>{i.type}</td>
              <td>{i.details}</td>
              <td>{i.requestedByRole} ID#{i.requestedBy}: {i.requestedByNickname}</td>
              <td>{i.requestedToRole} ID#{i.requestedTo}: {i.requestedToNickname}</td>
              <td>{i.approvedByRole} ID#{i.approvedBy}: {i.approvedByNickname}</td>
              <td>{i.requestTime}</td>
              <td>{i.approvedTime}</td>
              <td>{i.approvedMessage}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
