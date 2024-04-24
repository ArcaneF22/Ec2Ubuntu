import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Protect } from './protect';
import { Header } from '../components/headerDesktop';
import { GlobalOutside } from '../utilities/context/global'
export const Protected = ({ children }) => {

  const [accessible, setAccessible] = useState(null);

  useEffect(() => {
    Protect.isLoggedIn()
      .then((isLoggedIn) => {
        setAccessible(isLoggedIn);
      })
      .catch(() => setAccessible(false));
  }, []);

  switch (accessible) {
    case true:
      return <>
      <GlobalOutside >
          <Header />
          {children}
      </GlobalOutside>
      </>;
    case false:
      return <Navigate to="/" />;
    case null:
      return <div className="ui segment basic fullBody">
                <div className="ui active inverted dimmer">
                  <div className="ui indeterminate text loader">Loading pages...</div>
                </div>
              </div>;
  }
};
