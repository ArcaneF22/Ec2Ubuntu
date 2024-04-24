import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Protect } from '../protection/protect';
import { Modal_Logout, Modal_SessionExpire } from "../utilities/modals/alerts";
import * as Set from '../utilities/constants';
import { useGlobalOutside  } from '../utilities/context/global';
import '../../public/css/login.css'

export const HeaderDesktop = () => {
  const { countNotif } = useGlobalOutside();
  const navigate = useNavigate();
  const Auth = localStorage.getItem('Auth')
  const Profile = JSON.parse(localStorage.getItem('User'))
  const [Logout, setLogout] = useState(false);

  function navigateTo(path){
    if(Auth == 'true'){
      navigate(path)
      scrollToTop()
    } else {
      Protect.logOut()
    }
  }

  function catchNotification(){
    if(countNotif > 0){
      return <div className="ui red circular label">{countNotif}</div>
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [visible, setVisible] = useState(false)

  return (
    <>
    <Modal_Logout key="Modal_Logout" open={Logout} onClose={() => { setLogout(false); }} />

    <div className="ui top fixed menu lefted-menu">
    <div className='ui horizontal divider teal'></div>
    <div className="item">
      <img className='unClickable' src={Set.Path['logo'] + "poker.png"} />
    </div>
        <a className="item" onClick={() => navigateTo('/home')}>
            <div>
              <i className="university icon"></i>
              HOME
            </div>
          </a>

        <a className="item" onClick={() => navigateTo('/applications')}>
            <div>
              <i className="university icon"></i>
              APPLICATIONS
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/clubs')}>
            <div>
            <i className="layer group icon"></i>
              CLUBS
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/users')}>
            <div>
            <i className="users icon"></i>
              USERS
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/accounts')}>
            <div>
              <i className="user secret icon"></i>
              ACCOUNTS
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/uplines')}>
            <div>
              <i className="user secret icon"></i>
              UPLINES
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/history')}>
            <div>
            <i className="history icon"></i>
              HISTORY
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/unions')}>
            <div>
            <i className="group layer icon"></i>
              UNION
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/images')}>
            <div>
            <i className="image icon"></i>
              IMAGES
            </div>
          </a>

      <div className="right menu">

          <a className="item" onClick={() => navigateTo('/notification')}>
          <i className="bell outline icon"></i>
              Notification
              {catchNotification()}
          </a>
        <a className="item " onClick={() => { setLogout(true); }}>
          <i className="sign out alternate icon"></i>
          Log Out
        </a>
      </div>
    </div>

    </>

  );
};
