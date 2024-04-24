import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Protect } from '../protection/protect';
import { Modal_Logout, Modal_SessionExpire } from "../utilities/modals/alerts";
import * as Set from '../utilities/constants';
import { useGlobalOutside  } from '../utilities/context/global';
import {
  SidebarPusher,
  SidebarPushable,
  Checkbox,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

export const HeaderMobile = ({ showMenu }) => {
  const { countNotif } = useGlobalOutside();
  const navigate = useNavigate();
  const Auth = localStorage.getItem('Auth')
  const Profile = JSON.parse(localStorage.getItem('User'))
  const [Logout, setLogout] = useState(false);

  function navigateTo(path){
    if(Auth == 'true'){
      navigate(path)
    } else {
      Protect.logOut()
    }
  }

  function catchNotification(){
    if(countNotif > 0){
      return <div className="ui red circular label">{countNotif}</div>
    }
  }


  function clickMenu(){
    showMenu(true)
  }
  return (
    <>
    <Modal_Logout key="Modal_Logout" open={Logout} onClose={() => { setLogout(false); }} />

    <div className="ui top fixed menu big lefted-menu teal">

    <div className="item" onClick={() => navigateTo('/home')}>
      <img className='unClickable' src={Set.Path['logo'] + "poker.png"} />
    </div>
    <a className='item'  onClick={clickMenu}>
      <i className="bars icon"></i>
    </a>
      <div className="right menu">

          <a className="ui label item big" onClick={() => navigateTo('/notification')}>
          <i className="bell outline icon"></i>
              {catchNotification()}
          </a>
        <a className="item " onClick={() => { setLogout(true); }}>
          <i className="sign out alternate icon"></i>
        </a>
      </div>
    </div>
    </>

  );
};
