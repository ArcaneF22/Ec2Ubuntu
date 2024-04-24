import { useState } from 'react';
import { MyHistory } from '../raw/history'

export const FetchMyHistory = () => {

  const data = MyHistory().data
  const load = MyHistory().load

  return (
<>

{load ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : (
      <div className="ui segment ">
        <h3>My History List</h3>
        <table className='ui unstackable celled long scrolling table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Date Time</th>
            <th>Gadget</th>
            <th>Timezone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>
                <h4 className="ui image header">
                    <img src={i.userImage} className="ui mini rounded image" />
                    <div className="content">
                      {i.userNickname}
                      <div className='sub header'>
                        ID# {i.userID}
                      </div>
                  </div>
                </h4>
              </td>
              <td>{i.userRole}</td>
              <td>{i.datetime}</td>
              <td>{i.gadget}</td>
              <td>{i.timezone}</td>
              <td>{i.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
