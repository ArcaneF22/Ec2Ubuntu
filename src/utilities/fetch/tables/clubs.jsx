import { useState } from 'react';
import { Clubs } from '../raw/clubs'

export const FetchClubs = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = Clubs().data
  const load = Clubs().load

  const editData = (id,idd,name,image,app,details,type,union,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "idd": idd, 
                    "name": name, 
                    "image": image, 
                    "app": app, 
                    "details": details, 
                    "type": type,
                    "union": union,
                    "status": status,
                  }
      setClicked(clicked+1)
      selectData(array);
      setTimeout(
        window.scrollTo({ top: 0, behavior: 'smooth' })
      , 1000)
  };

  function setStatus(i) {
    if (i.statusLabel == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.statusLabel == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i className="spinner icon"></i>
                  Pending
              </button>;
    } else {
      return  <button className='ui button red basic'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </button>;
    }
  }

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
        <h3>Clubs List</h3>
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Club</th>
            <th>Application</th>
            <th>Details</th>
            <th>Type</th>
            <th>Users</th>
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
                      <div className="sub header">
                        ID: {i.idd}
                      </div>
                  </div>
                </h4>
              </td>
              <td>{i.appName}</td>
              <td>{i.details}</td>
              <td>
                <div className="content">
                  <div className="header">
                    {i.type}
                  </div>
                  <div className="description">
                    {i.unionName}
                  </div>
                </div>
              </td>
              <td>{i.users} {i.status}</td>
              <td>{setStatus(i)} </td>
              <td>
                <button className='ui button blue' onClick={()=> editData(i.id,i.idd,i.name,i.imageID,i.appID,i.details,i.type,i.unionID,i.statusLabel)}>
                    <i className="edit outline icon"></i>
                    Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
