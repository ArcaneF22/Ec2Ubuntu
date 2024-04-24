
import { useLayoutEffect, useState } from 'react';
import useInterval from 'use-interval'


export const NotFoundPage = () => {
    const Auth = localStorage.getItem('Auth')
    const [notfoundTimer, setnotfoundTimer] = useState(0)

    useInterval(() => {
      setnotfoundTimer(seconds => seconds + 1);
    }, 1000);

    if (Auth) {
      return (
        <>
        { notfoundTimer >= 3 ?
            <div className="ui segment full-screen">
              <div className="ui active inverted dimmer">
              <h2 className="ui icon header">
                <i className="times icon red"></i>
                <div className="content">
                  Oops! Are you lost?
                  <div className='ui hidden divider'></div>
                  <div className="sub header">
                    <a href="/home" className="ui button red basic">
                      Return to Home
                    </a>
                  </div>
                </div>
              </h2>
              </div>
              <p></p>
            </div>
            :
            <div className="ui segment full-screen">
              <div className="ui active inverted dimmer">
                <div className="ui text active blue elastic loader">Loading</div>
              </div>
              <p></p>
            </div>
        }
        </>
  
      );
    } else {
      return (

        <>
        { notfoundTimer >= 4 ?
            <div className="ui segment fullBody">
              <div className="ui active inverted dimmer">
              <h2 className="ui icon header">
                <i className="times icon red"></i>
                <div className="content">
                  Oops! Are you lost?
                  <div className='ui hidden divider'></div>
                  <div className="sub header">
                    <a href="/" className="ui button red basic">
                      Return to login
                    </a>
                  </div>
                </div>
              </h2>
              </div>
              <p></p>
            </div>
            :
            <div className="ui segment fullBody">
              <div className="ui active inverted dimmer">
                <div className="ui text large loader">Loading</div>
              </div>
              <p></p>
            </div>
        }
        </>
  
      );
    }


    return (

      <>
      { notfoundTimer >= 4 ?
          <div className="ui segment fullBody">
            <div className="ui active inverted dimmer">
            <h2 className="ui icon header">
              <i className="times icon red"></i>
              <div className="content">
                Oops! Are you lost?
                
                <div className='ui hidden divider'></div>
                <div className="sub header">
                  <a href="/" className="ui button red basic">
                    Return to login
                  </a>
                </div>
              </div>
            </h2>
            </div>
            <p></p>
          </div>
          :
          <div className="ui segment fullBody">
            <div className="ui active inverted dimmer">
              <div className="ui text large loader">Loading</div>
            </div>
            <p></p>
          </div>
      }
      </>

    );
  };
  