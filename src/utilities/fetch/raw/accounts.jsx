import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

const Token = JSON.parse( localStorage.getItem('Token') );

export const Accounts = () => {
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: "ALL",
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['accounts'], Auth);
      setdata(response.data);
      setLoad(false)
      console.log("Accounts items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}

export const MyAccounts = () => {
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: "MY",
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['accounts'], Auth);
      setdata(response.data);
      setLoad(false)
      console.log("My Accounts items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}