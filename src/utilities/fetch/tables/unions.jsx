import { useState } from 'react';
import { Unions } from '../raw/unions'

export const FetchUnions = () => {

  const data = Unions().data
  const load = Unions().load

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
        <h3>Unions List</h3>
        <table className='ui unstackable celled long scrolling table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Union</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>
                <h4 className="ui image header">
                    <img src={i.imageFull} className="ui mini rounded image" />
                    <div className="content">
                      {i.name}
                      <div className='sub header'>
                        ID# {i.type}
                      </div>
                  </div>
                </h4>
              </td>
              <td>{i.status}</td>
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
