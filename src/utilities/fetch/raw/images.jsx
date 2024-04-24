import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

const Token = JSON.parse( localStorage.getItem('Token') );

export const Images = () => {
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              TYPE: 'ALL',
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['images'], Auth);
      setdata(response.data);
      setLoad(false)
      console.log("Images items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}

export const ImagesApps = () => {
    const [load, setLoad] = useState(false)
    const [data, setdata] = useState([])
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                TYPE: 'apps',
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['images'], Auth);
        setdata(response.data);
        setLoad(false)
        //console.log("Images items fetched...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        fetching();
      }, []);
  
    return ({load, data})
  }

  
export const ImagesClubs = () => {
    const [load, setLoad] = useState(false)
    const [data, setdata] = useState([])
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                TYPE: 'clubs',
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['images'], Auth);
        setdata(response.data);
        setLoad(false)
        //console.log("Images items fetched...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        fetching();
      }, []);
  
    return ({load, data})
  }


  export const ImagesAvatars = () => {
    const [load, setLoad] = useState(false)
    const [data, setdata] = useState([])
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                TYPE: 'avatar',
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['images'], Auth);
        setdata(response.data);
        setLoad(false)
        //console.log("Images items fetched...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        fetching();
      }, []);
  
    return ({load, data})
  }

  
export const ImagesLogo = () => {
    const [load, setLoad] = useState(false)
    const [data, setdata] = useState([])
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                TYPE: 'logo',
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['images'], Auth);
        setdata(response.data);
        setLoad(false)
        //console.log("Images items fetched...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        fetching();
      }, []);
  
    return ({load, data})
  }