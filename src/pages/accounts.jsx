import { useLayoutEffect, useState } from 'react';
import { FetchAccounts } from '../utilities/fetch/tables/accounts'
import { UpsertAccounts } from '../utilities/upsert/accounts'

export const AccountsPage = () => {

  const [gotData, setgotData] = useState([]);
  const [recall, setRecall] = useState(0);

  const selectData = (val) => { setgotData(val) };
  const recallData = (val) => { setRecall(val)  };
  
  useLayoutEffect(() => {
    if(recall==1){
      setRecall(0)
    }
  }, [recall]);

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="user secret big icon"></i>
              <div className="content">
              Accounts Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <UpsertAccounts selectedData={gotData} recallData={recallData} />
      {recall === 1 ? (
            <div className="ui segment basic">
              <div className="ui active inverted dimmer">
                <div className="ui indeterminate text loader">Loading table...</div>
              </div>
            </div>
          ) : (
            <FetchAccounts selectData={selectData} />
        )}

    </>
      

    );
  };
  