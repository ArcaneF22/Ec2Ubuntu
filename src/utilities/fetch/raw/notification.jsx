import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import useInterval from 'use-interval'
import * as Set from '../../constants';

//NOTIFICATION
var createNotification = 0;
const Token =   JSON.parse( localStorage.getItem('Token') );

export const RawNotification = ({ loadingNotification, itemNotification, countNotification }) => {

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                STAT: "ALL",
            }; 

    async function fetchNotification() {
        loadingNotification(true)
      try {
        const response = await axios.post(Set.Fetch['notification'], Auth);
          itemNotification(response.data);
          loadingNotification(false)
          countNotification(createNotification)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchNotification();
      }, [createNotification]);

}

//NOTIFICATION PENDING
export const RawNotificationPending = ({ loadingNotification, itemNotification }) => {


    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                STAT: "PENDING",
            }; 

    async function fetchNotification() {
        loadingNotification(true)
      try {
        const response = await axios.post(Set.Fetch['notification'], Auth);
        itemNotification(response.data);
        loadingNotification(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    useLayoutEffect(() => {
        fetchNotification();
      }, [createNotification]);

}

//NOTIFICATION COUNT
export const RawNotificationCount = ({ countNotification }) => {
    const [timer, setTimer] = useState(0);

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
            }; 

    async function fetchcountNotification() {
      try {
        const response = await axios.post(Set.Fetch['notification_count'], Auth);
        countNotification(response.data);
        if(createNotification != response.data){
          createNotification = response.data
          console.log(response.data+" Notification updated...")
          if(response.data === "Err"){
            window.location.href = "/";
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useInterval(() => {
      setTimer(seconds => seconds + 1);
    }, 5000);

    useLayoutEffect(() => {
        fetchcountNotification();
      }, [timer]);

}