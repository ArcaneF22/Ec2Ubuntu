
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Protect } from '../protection/protect';
import useInterval from 'use-interval'
import {picture} from '../utilities/settings'
import '../../public/css/login.css'
import image from '../../public/images/icons/poker.png'

export const LoginPage = () => {

  const navigateTo = useNavigate();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [message, setMessage] = useState("");
  const [messageicon, setMessageicon] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logintimer, setLogintimer] = useState(0)
  const [messagebox, setMessagebox] = useState(false);

  useLayoutEffect(() => {
      console.log("Logged out")
      localStorage.setItem('Auth', 'false');
      sessionStorage.clear();
      localStorage.clear();
  }, []);

  useInterval(() => {
    setLogintimer(seconds => seconds + 1);
    if(logintimer > 1){
      setMessagebox(false)
    }
  }, 1000);

  const validate = (e) => {
      e.preventDefault()
      setLogintimer(0)
      setMessagebox(true)
      if(username == "" || username == null){
            setMessage("Username cannot be blank!")
            setMessageicon("key red mini icon")
      } else if(password == "" || password == null){
            setMessage("Password cannot be blank!")
            setMessageicon("key red mini icon")
      } else {
        proceedLogin()
      }
  }

  const proceedLogin = async () => {
    try{
        setMessage("Loading...");
        setMessageicon("notched circle loading icon")
        const response = await fetch(import.meta.env.VITE_GO_LOGIN,{
                                    method: "POST",
                                    headers: { "Accept": "application/json", "Content-type": "application/json" },
                                    body: JSON.stringify({
                                        username,
                                        password,
                                        timezone
                                        })
                                    }).then((response) => {
                                        return response.json()
                                    }).then((response) => {
                                        if(response[0]=="Incomplete"){
                                            setMessage("Incomplete details!")
                                        } else if (response[0]=="None"){
                                            setMessage("Account not found!")
                                        } else {
                                            const feedback = response[0].toString();
                                            const feed = feedback.split("|");

                                            const Token = {
                                              id:         feed[0],
                                              gadget:     feed[3],
                                              token:      feed[4],
                                              timezone: timezone,
                                            }

                                            const User = {
                                              rolename:   feed[2],
                                              nickname:   feed[7],
                                              avatar:     feed[6]
                                            }

                                            console.log("Account found! Logging in...")
                                            setMessage("Account found! Logging in...")

                                            localStorage.setItem('Token', JSON.stringify(Token));
                                            localStorage.setItem('User', JSON.stringify(User));

                                            exitLogin()
                                        }
                                    }).catch((error) => {
                                        console.log(error)
                                    })

    } catch (err){
        console.log(err)
    }
};


  function exitLogin(){
    Protect.logIn()
    navigateTo('/home')
    window.location.reload()
  };


  return (
    <>
<div className='bg-color-login login'>
    <br /> <br /> <br /> <br /> <br />
    <div className="ui two stackable middle aligned center aligned grid">

      <div className="ten wide column n-bot-reduce">
      <br /> <br /> <br /> <br /> <br />
        <img className="ui fluid centered medium image unClickable" src={image} />
      </div>

      <div className="six wide column on-top-reduce">
        <div className="ui large form segment minus-top">

          <h2 className="ui image header">
            <div className="content title-header fontRubik">
                Poker Analytics
            </div>
            
          </h2>
          <div className='ui divider hidden'></div>
          <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
              </div>
            </div>

            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
              </div>
            </div>

            <div className='field'>
              <div className="ui fluid large purple button" onClick={validate}>Login</div>
            </div>
            
        </div>
        {
              messagebox ? 
              <div className="ui icon message mini">
                <i className={messageicon}></i>
                <div className="content">
                  <div className="ui header large left aligned">
                  {message}
                  </div>
                </div>
              </div>
              :
              <>
              <div className="ui icon message mini">
                <i className="sign in alternate grey icon mini"></i>
                <div className="content">
                  <div className="ui header large left aligned">
                  Are you new to us? <a href="/registration"> Register!</a>
                  </div>
                </div>
              </div>
                  <a className='ui button red' href="https://13.211.65.106/pokerapp/relocate.php">Secure</a>
              </>
            }


      </div>
    </div>
    </div>
    </>




  );
};
