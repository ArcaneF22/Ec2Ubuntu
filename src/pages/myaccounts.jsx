import { FetchMyAccounts } from '../utilities/fetch/tables/myaccounts'

export const MyAccountsPage = () => {

    return (

    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="user secret big icon"></i>
              <div className="content">
                  My Accounts Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <FetchMyAccounts />
      </>
    );
  };
  