import { useState, useLayoutEffect  } from 'react';
import { FetchUsers } from '../utilities/fetch/tables/users'
import { UpsertUsers } from '../utilities/upsert/users'


export const UsersPage = () => {

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
              <i className="users big icon"></i>
              <div className="content">
                  Users Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <UpsertUsers selectedData={gotData} recallData={recallData} />
      {recall === 1 ? (
            <div className="ui segment basic">
              <div className="ui active inverted dimmer">
                <div className="ui indeterminate text loader">Loading table...</div>
              </div>
            </div>
          ) : (
            <FetchUsers selectData={selectData} />
        )}

      

      </>

    );
  };
  