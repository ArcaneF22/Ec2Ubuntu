
import { isNumeric } from '../utilities/tools'
import { FetchNotificationPending } from '../utilities/fetch/items/notifications'
import { useGlobalOutside  } from '../utilities/context/global';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { GridRow, GridColumn, Grid, Segment, Image } from 'semantic-ui-react'


export const HomePage = () => {

  const { countNotif } = useGlobalOutside();
  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]
  const getUser = JSON.parse(localStorage.getItem('User'))
  const isNum = isNumeric(isToken)


    useLayoutEffect(() => {

    }, []);

  return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="home big icon"></i>
              <div className="content">
                  Welcome back!  
                  <div className="sub header">{getUser["rolename"]}: {getUser["nickname"]}!</div>
              </div>
          </h2>
      </div>

      <div className="ui grid padded">
      <div className="row">
        <div className="four wide computer eight wide mobile six wide tablet column">
          <div className='ui segment message center aligned purple-box'>
                <div className="ui statistic inverted">
                    <div className="value">
                      5,550
                    </div>
                    <div className="label">
                      Users
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column">
            <div className='ui segment message center aligned purple-box'>
                <div className="ui statistic inverted blue">
                    <div className="value">
                      5,550
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column plus-top-bit">
            <div className='ui segment message center aligned purple-box'>
                <div className="ui statistic inverted green">
                    <div className="value">
                      5,550
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column plus-top-bit">
            <div className='ui segment message center aligned purple-box'>
                <div className="ui statistic inverted orange">
                    <div className="value">
                      5,550
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>

      <div className="ui vertical stripe quote segment">
        <div className="ui middle aligned stackable grid container">
          <div className="row">
              <div className="six wide right floated column">
                <h3>Welcome </h3>
              </div>
            </div>
            <div className="eight wide left floated column">
              <FetchNotificationPending />
            </div>
          </div>
        </div>


  

</>

  );
};
