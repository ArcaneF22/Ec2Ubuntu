import React, { useState, useEffect } from 'react';

import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Protected } from './protection/protected';

import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ApplicationsPage } from './pages/applications';
import { ClubsPage } from './pages/clubs';
import { UsersPage } from './pages/users';
import { AccountsPage } from './pages/accounts';
import { UplinesPage } from './pages/uplines';
import { NotificationPage } from './pages/notification';
import { HistoryPage } from './pages/history';
import { ImagesPage } from './pages/images';
import { UnionsPage } from './pages/unions';
import { NotFoundPage } from './pages/notfound';

import { MyProfilePage } from './pages/myprofile';
import { MyAccountsPage } from './pages/myaccounts';
import { MyHistoryPage } from './pages/myhistory';
import { MyUplinesPage } from './pages/myuplines';
import { MyClubsPage } from './pages/myclubs';

function App() {

  const [yesLoggedIn, setyesLoggedIn] = useState(false);

  useEffect(() => {
    const Auth = localStorage.getItem('Auth');
    const AuthBoolean = Auth === 'true';
    setyesLoggedIn(AuthBoolean);
  }, []);


  return (

<>
    <BrowserRouter>
        <Routes >
              <Route path="/"               element={<LoginPage />} />
              <Route path="*"               element={<NotFoundPage />} />
              <Route path="/registration"   element={<RegistrationPage />} />
              {yesLoggedIn  ?
              <>
                <Route path="/home"           element={ <Protected> <HomePage /> </Protected> } />
                <Route path="/applications"   element={ <Protected> <ApplicationsPage /> </Protected> } />
                <Route path="/clubs"          element={ <Protected> <ClubsPage /> </Protected> } />
                <Route path="/users"          element={ <Protected> <UsersPage /> </Protected> } />
                <Route path="/accounts"       element={ <Protected> <AccountsPage /> </Protected> } />
                <Route path="/uplines"        element={ <Protected> <UplinesPage /> </Protected> } />
                <Route path="/notification"   element={ <Protected> <NotificationPage /> </Protected> } />
                <Route path="/history"        element={ <Protected> <HistoryPage /> </Protected> } />
                <Route path="/images"         element={ <Protected> <ImagesPage /> </Protected> } />
                <Route path="/unions"         element={ <Protected> <UnionsPage /> </Protected> } />
                <Route path="/myprofile"      element={ <Protected> <MyProfilePage /> </Protected> } />
                <Route path="/myaccounts"     element={ <Protected> <MyAccountsPage /> </Protected> } />
                <Route path="/myhistory"      element={ <Protected> <MyHistoryPage /> </Protected> } />
                <Route path="/myclubs"        element={ <Protected> <MyClubsPage /> </Protected> } />
                <Route path="/myuplines"      element={ <Protected> <MyUplinesPage /> </Protected> } />
              </>
              : null}

        </Routes>
    </BrowserRouter>
</>
  );
}

export default App;
