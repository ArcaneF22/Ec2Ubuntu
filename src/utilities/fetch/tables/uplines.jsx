import { useState } from 'react';
import { Uplines } from '../raw/uplines'

export const FetchUplines = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = Uplines().data
  const load = Uplines().load
  
  const editData = (id,clubID,clubIDD,downlineID,uplineID,percentage,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked"       :clicked,
                    "id"            : id, 
                    "clubID"        : clubID, 
                    "clubIDD"       : clubIDD, 
                    "downlineID"    : downlineID, 
                    "uplineID"      : uplineID, 
                    "percentage"    : percentage, 
                    "status"        : status,
                  }
      setClicked(clicked+1)
      selectData(array)
      setTimeout(
        window.scrollTo({ top: 0, behavior: 'smooth' })
      , 1000)
  };

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
        <h3>Uplines List</h3>
        <table className='ui unstackable celled long scrolling table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Club</th>
            <th>Downline</th>
            <th>Upline</th>
            <th>Percentage</th>
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
                    <img src={i.appImage} className="ui mini rounded image" />
                    <div className="content">
                      {i.clubName} (ID#{i.clubIDD})
                      <div className='sub header'>
                        {i.appName}
                      </div>
                  </div>
                </h4>
              </td>
              <td>
                <h4 className="ui image header">
                    <img src={i.downAvatar} className="ui mini rounded image" />
                    <div className="content">
                    ID#{i.downacctID} {i.downacctRole}: (ID#{i.downacctNickname})
                      <div className='sub header'>
                        User: {i.downuserID}: {i.downuserRole} {i.downuserNickname}
                      </div>
                      <div className='sub header'>
                       Status: {i.downacctStatus}
                      </div>
                  </div>
                </h4>
              </td>
              <td>
                <h4 className="ui image header">
                    <img src={i.upAvatar} className="ui mini rounded image" />
                    <div className="content">
                      ID#{i.upacctID} {i.upacctRole}: (ID#{i.upacctNickname})
                      <div className='sub header'>
                        User: {i.upuserID}: {i.upuserRole} {i.upuserNickname}
                      </div>
                      <div className='sub header'>
                       Status: {i.upacctStatus}
                      </div>
                  </div>
                </h4>
              </td>
              <td>{i.percentage}</td>
              <td>{i.statusLabel}</td>
              <td>
                <button className='ui button blue' onClick={()=> editData(i.id,i.clubID,i.clubIDD,i.downacctID,i.upacctID,i.percentage,i.status)}>
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
