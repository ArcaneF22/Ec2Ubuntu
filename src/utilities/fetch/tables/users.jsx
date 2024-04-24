import { useState } from 'react';
import { Users } from '../raw/users'

export const FetchUsers = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = Users().data
  const load = Users().load

  function setStatus(i) {
    if (i.statusLabel == "Active") {
      return  <div className='ui label green basic center aligned fluid'>
                  <i className="check circle outline icon"></i>
                  Active
              </div>;
    } else if (i.statusLabel == "Pending") {
      return  <div className='ui label orange basic center aligned fluid'>
                  <i className="spinner icon"></i>
                  Pending
              </div>;
    } else {
      return  <div className='ui label red basic center aligned fluid'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </div>;
    }
  }
  const editData = (id,nickname,role,email,telegram,username,password,avatar,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "nickname": nickname, 
                    "role": role, 
                    "email": email, 
                    "telegram": telegram, 
                    "username": username, 
                    "password": password, 
                    "avatar": avatar, 
                    "status": status,
                  }
      setClicked(clicked+1)
      selectData(array);
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
        <h3>Users List</h3>
        <p>{JSON.stringify(fetch)}</p>
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nickname</th>
            <th>Role</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Accounts</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>
                <h4 className="ui image header">
                    <img src={i.avatarFull} className="ui mini rounded image" />
                    <div className="content">
                      {i.nickname}
                  </div>
                </h4>
              </td>
              <td>{i.roleName}</td>
              <td>
                {i.email ? ("Email: " + i.email) : null}
                <br />
                {i.telegram ? ("Telegram: " + i.telegram) : null}
              </td>
              <td>{i.username}</td>
              <td>{i.password}</td>
              <td>
                {i.activeAccounts == 0 ? null : i.activeAccounts == 1 ? (i.activeAccounts+" Active Account") : (i.activeAccounts+" Active Accounts")}
                <br />
                {i.pendingAccounts == 0 ? null : i.pendingAccounts == 1 ? ( i.pendingAccounts+" Pending Account") : (i.pendingAccounts+" Pending Accounts")}
                <br />
                {i.disabledAccounts == 0 ? null : i.disabledAccounts == 1 ? ( i.disabledAccounts+" Disabled Account") : (i.disabledAccounts+" Disabled Accounts")}
                </td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui button blue' onClick={()=> editData(i.id,i.nickname,i.roleID,i.email,i.telegram,i.username,i.password,i.avatarID,i.status)}>
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
