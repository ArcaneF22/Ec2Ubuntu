import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

const Token = JSON.parse( localStorage.getItem('Token') );

export const Uplines = () => {
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: 'ALL',
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['uplines'], Auth);
      setdata(response.data);
      setLoad(false)
      console.log("Upline items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}


export const MyUplines = () => {
    const [load, setLoad] = useState(false)
    const [data, setdata] = useState([])
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                FOR: 'MY',
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['uplines'], Auth);
        setdata(response.data);
        setLoad(false)
        console.log("Upline items fetched...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        fetching();
      }, []);
  
    return ({load, data})
  }