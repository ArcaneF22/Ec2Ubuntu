import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const Authenticate = async () => {
    try {
      const authenticate = await axios.post(Set.Fetch['authenticate'], Set.Auth);

      
      if(authenticate.data !='Err'){
      	
        console.log(authenticate.data)
      } else {
      	console.log("Error")
      }

      
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
}


