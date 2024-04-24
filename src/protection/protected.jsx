import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Protect } from './protect';
import { HeaderDesktop } from '../components/headerDesktop';
import { HeaderMobile } from '../components/headerMobile';
import { GlobalOutside } from '../utilities/context/global'
import {FetchCountDown, iProfile, iAuthenticate} from '../utilities/fetch/constants';
import * as Set from '../utilities/constants';

import {
  SidebarPusher,
  SidebarPushable,
  Segment,
  Menu,
  Sidebar,
  GridRow,
} from 'semantic-ui-react'

export const Protected = ({ children }) => {
  const navigate = useNavigate();
  const Auth = localStorage.getItem('Auth')
  const userNickname =  iProfile().data["nickname"]
  const userRole =      iProfile().data["rolename"]
  const userAvatar =    iProfile().data["avatar"]
  const authID =        iAuthenticate().data

  FetchCountDown()

  function navigateTo(path){
    if(Auth == 'true'){
      navigate(path)
    } else {
      Protect.logOut()
    }
  }

  const [accessible, setAccessible] = useState(null);
  useEffect(() => {
    Protect.isLoggedIn()
      .then((isLoggedIn) => {
        setAccessible(isLoggedIn);
      })
      .catch(() => setAccessible(false));
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const isLargeScreen = window.innerWidth > 850;
  const [sidebarDimmed, setsidebarDimmed] = useState(false)

  const [sideBar, setsideBar] = useState(isLargeScreen ? true : false)
  const [changeScreen, setchangeScreen] = useState(0)
    
  const showMenu = (value) => { 
                                setsideBar(value); 
                              };

    useEffect(() => {
      setsideBar(isLargeScreen ? true : false)
      setsidebarDimmed(false)
    }, [changeScreen]);

    useEffect(() => {
      const handleResize = () => {
                                    setIsMobile(window.innerWidth <= 850)
                                    setchangeScreen(changeScreen+.01)
                                  };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [changeScreen]);

    useEffect(() => {
      if(isLargeScreen === false && sideBar === true) {
        setsidebarDimmed(true)
      } else {
        setsidebarDimmed(false)
      }
    }, [sideBar]);

    const hideSidebars = () => {
      if(isMobile === true) {
        setsideBar(false)
      } else {
        setsideBar(true)
      }
    }

    
  switch (accessible) {
    case true:
      return <>
      <GlobalOutside >
        

          <Sidebar as={Menu} animation='overlay' className='purplelized' inverted onClick={hideSidebars}
            onHide={() => { hideSidebars() }} vertical visible={sideBar} width='thin'>

            <a className="item ui segment center aligned"  onClick={() => navigateTo('/myprofile')}>
                <h3 className="ui center icon header inverted">
                  <img className="icon medium-avatar unClickable" src={userAvatar} alt="Profile Avatar" />
                  <div className="content header white">
                    {userNickname} 
                    <div className="sub header">
                      {userRole}
                    </div>
                  </div>
                </h3>
            </a>

            <a className="item" onClick={() => navigateTo('/myaccounts')}>
                <div>
                <i className="clock outline icon"></i>
                My Accounts

                </div>
            </a>

            <a className="item" onClick={() => navigateTo('/myuplines')}>
                <div>
                <i className="history icon"></i>
                My Uplines
                </div>
            </a>

            <a className="item" onClick={() => navigateTo('/myclubs')}>
                <div>
                <i className="clock outline icon"></i>
                My Clubs

                </div>
            </a>

            <a className="item" onClick={() => navigateTo('/myhistory')}>
                <div>
                <i className="history icon"></i>
                My History
                </div>
            </a>

            {isLargeScreen ? null :
            <>

          <div className="ui header inverted center aligned">PRIVILEGES</div>

          <a className="item" onClick={() => navigateTo('/applications')}>
            <div>
              <i className="university icon"></i>
              Applications 
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/clubs')}>
            <div>
            <i className="layer group icon"></i>
              Clubs
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/users')}>
            <div>
            <i className="users icon"></i>
              Users
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/accounts')}>
            <div>
              <i className="user secret icon"></i>
              Accounts
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/history')}>
            <div>
            <i className="history icon"></i>
              History
            </div>
          </a>
            </>
            }
            
          </Sidebar>
          {isLargeScreen ? <HeaderDesktop /> : <HeaderMobile showMenu={showMenu} />}
          <SidebarPushable>
          
          <SidebarPusher className='lefted-content segment page-margin basic' dimmed={sidebarDimmed} >
  

                  {children}

          </SidebarPusher>
        </SidebarPushable>
          
      </GlobalOutside>
      </>;
    case false:
      return <Navigate to="/" />;
    case null:
      return <div className="ui segment basic full-screen">
                <div className="ui active inverted dimmer">
                  <div className="ui indeterminate text active blue elastic loader">Loading pages...</div>
                </div>
              </div>;
  }
};
