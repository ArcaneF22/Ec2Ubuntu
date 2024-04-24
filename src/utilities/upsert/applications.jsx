import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImagesApps } from '../fetch/raw/images'
import { Company } from '../fetch/raw/company'
import * as SUI from 'semantic-ui-react'
import * as Set from '../constants';

export const UpsertApplications = ({selectedData,recallData}) => {

  const Token = JSON.parse( localStorage.getItem('Token') );
  const imgDD = ImagesApps().data
  const compDD = Company().data

  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New Data");
  const [cancels, setCancels] =           useState(false);

  const [appID, setappID] =             useState("0");
  const [appName, setappName] =         useState("");
  const [appCompany, setappCompany] =   useState("");
  const [appDetails, setappDetails] =   useState("");
  const [appImage, setappImage] =       useState("");
  const [appStatus, setappStatus] =     useState("0");

  let Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  D: Set.TimeZoned,
                  appID,
                  appName,
                  appCompany,
                  appDetails,
                  appImage,
                  appStatus
              };

    Upsert = Object.fromEntries(
        Object.entries(Upsert).map(([key, value]) => [key, value.toString().trim()])
    );

  const ValidateForm = (e) => {
    e.preventDefault()
    setLoading(true)
      if(appName == "" || appCompany == "" || appDetails == "" || appImage == ""){
        setMessage("Details incomplete!")
      } else {
        SubmitForm()
      }
  }

  const cancel = () => {
    setappID("0")
    setMessage("")
    setButton("Add New Data")
    setCancels(false)
  }

  const clearForm = () => {
    setappID("0")
    setappName("")
    setappCompany("")
    setappDetails("")
    setappImage("")
    setappStatus("0")

    setButton("Add New Data")
    setLoading(false)
    setCancels(false)
  }

  const fromTable = () => {

    setappID(selectedData.id === null || selectedData.id === undefined ? "" : selectedData.id)
    setappName(selectedData.name === null || selectedData.name === undefined ? "" : selectedData.name)
    setappImage(selectedData.image === null || selectedData.image === undefined ? "" : selectedData.image)
    setappCompany(selectedData.company === null || selectedData.company === undefined ? "" : selectedData.company)
    setappDetails(selectedData.details === null || selectedData.details === undefined ? "" : selectedData.details)
    setappStatus(selectedData.status === null || selectedData.status === undefined ? "" : selectedData.status)

    if(selectedData.id == 0 || selectedData.id == null) {
      setButton("Add New Data")
      setappStatus("0")
      setCancels(false)
    } else {
      setButton("Proceed to Update")
      setCancels(true)
    }

  }

const removeTrailSpaces = (str) => {
    return str.trim().replace(/^\s+|\s+$/g, "");
};
  useEffect(() => {
      fromTable()
  }, [selectedData.clicked]);

  const changeStatus = () => {
    if(appStatus=="0" || appStatus=="Active"){
      setappStatus("2")
    } else {
      setappStatus("0")
    }
  }

  async function SubmitForm() {
    console.log(Upsert)
    setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['applications'], Upsert);
      console.log(response.data)

      if(response.data.includes("Duplicate")){
          const number = parseFloat( response.data.match(/[\d.]+/) );
          setappID( number )
          setButton("Proceed to Update")
          setMessage("Duplicate found! Would you like to update existing data? Check application ID#"+ number);
          setCancels(true)
      } else if(response.data.includes("Added")){
          setMessage("New poker application successfully added!");
          recallData(1)
          clearForm()
      } else if(response.data.includes("Updated")){
          setMessage("Poker application successfully updated!");
          recallData(1)
          clearForm()
      } else {
        setMessage("Something went wrong! Please retry");
        clearForm()
      }
      
    } catch (error) {
      setMessage(error);
      console.error("Error fetching data: ", error);
    }
  }

    return (
      <div className="ui segment">
        <h1>Insert / Update Application</h1>
        <div className="ui form">

          <div className='five fields'>
            <div className="field">
              <label>Name</label>
              <input type="text" value={appName} onChange={(e) => setappName( e.currentTarget.value )}/>
            </div>

            <div className="field">
              <label>Image</label>
              <SUI.Dropdown
                    placeholder="Select image"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select image"
                    onChange={(event, { value }) => { setappImage(value); }}
                    value={appImage}
                    options={imgDD.map(i => {
                      return {
                        key: i.id,
                        text: i.name,
                        value: i.id,
                        image: { avatar: true, src: i.pathFull },
                      };
                    })}
                  />
            </div>

            <div className="field">
              <label>Company</label>
              <SUI.Dropdown
                    placeholder="Select company"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select company"
                    onChange={(event, { value }) => { setappCompany(value); }}
                    value={appCompany}
                    options={compDD.map(i => {
                      return {
                        key: i.id,
                        text: i.name,
                        value: i.id,
                        image: { avatar: true, src: i.imageFull },
                      };
                    })}
                  />

            </div>

            <div className="field">
              <label>Details</label>
              <input type="text" value={appDetails} onChange={(e) => setappDetails(e.currentTarget.value)}/>
            </div>

            <div className="field">
            <label>Status</label>
              { appStatus === "0" ? 
                <div className="ui button green fluid center aligned" onClick={changeStatus}>
                  <i className="check circle outline icon"></i>
                  Active
                </div>
              :  
                <div className="ui button red fluid center aligned" onClick={changeStatus}>
                  <i className="times circle outline icon"></i>
                  Inactive
                </div>
              } 
            </div>

          </div>

          <div className="field">
            <div className="ui button purple" onClick={ValidateForm}>
              <i className="plus icon"></i>
              {button}
            </div>

            { cancels ?  <>
              <div className="ui button grey basic" onClick={cancel}>Cancel</div>
              <div className="ui button grey basic" onClick={clearForm}>Clear</div>
            </> :  null }
            <p>{message}</p>
          </div>

        </div>
      </div>
    );
  };
  