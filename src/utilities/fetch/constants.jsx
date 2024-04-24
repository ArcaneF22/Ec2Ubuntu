import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useInterval from 'use-interval'
import axios from 'axios';
import * as Set from '../constants';

var OnTimerChange = 0
var User = JSON.parse( localStorage.getItem('User') );
var Token = JSON.parse( localStorage.getItem('Token') );


// ==================================== FETCH DATA AFTER COUNTDOWN
export function FetchCountDown() {
            const [count, setCount] = useState(0)
            useInterval(() => {
                setCount(seconds => seconds + 1);
                OnTimerChange = count
              }, 5000);
              return ({ count })
}

// ==================================== FETCH USER PROFILE DATA
export const iProfile = () => {
    const [data, setData] = useState(User)
    var Auth = {
        A: Token['id'],
        B: Token['token'],
        C: Token['gadget']
    }; 
    async function fetchNow() {
        try {
            const response = await axios.post(Set.Fetch['profile'], Auth);
            const Got = {
                    rolename:   response.data["rolename"],
                    nickname:   response.data["nickname"],
                    avatar:     response.data["avatarFull"]
            }
            setData(Got)
            localStorage.setItem('User', JSON.stringify(Got));
            //console.log("Constant Profile loaded! ")
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    useEffect(() => {
        fetchNow()
    }, [OnTimerChange]);
              
    return ({data})
}

// ==================================== FETCH USER AUTHENTICATION DATA
export const iAuthenticate = () => {
    const navigate = useNavigate();
    const [data, setData] = useState("AUTH")
    var Auth = {
        A: Token['id'],
        B: Token['token'],
        C: Token['gadget']
    }; 
    async function fetchNow() {
        try {
            const response = await axios.post(Set.Fetch['authenticate'], Auth);
            //console.log("Authenticated...")
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    useEffect(() => {
        fetchNow()
    }, [OnTimerChange]);
              
    return ({data})
}



// ==================================== FETCH USER PROFILE DATA
export const iApplicationDD = () => {
    const [dataApp, setdataApp] = useState([])
    const Auth = {
        A: Token['id'],
        B: Token['token'],
        C: Token['gadget']
    }; 
    const fetchApps = async () => {
        try {
            const appresponse = await axios.post(Set.DD['applications'], Auth);
            setdataApp(appresponse.data)
            console.log("iApplicationDD Loaded! ")
            console.log(appresponse.data)
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    useEffect(() => {
        fetchApps()
    }, []);
              
    return ({dataApp})
}
