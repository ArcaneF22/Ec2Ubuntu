import { useLayoutEffect, useState } from 'react';
import { FetchClubs } from '../utilities/fetch/tables/clubs'
import { UpsertClubs } from '../utilities/upsert/clubs'

export const ClubsPage = () => {

  const [gotData, setgotData] = useState([]);
  const [recall, setRecall] = useState(0);

  const selectData = (newValue) => {
    setgotData(newValue)
  };
  const selectImage = (newValue) => {
    setgotData(newValue)
  };

  const recallData = (re) => {
    setRecall(re)
  };
  
  useLayoutEffect(() => {
    if(recall==1){
      setRecall(0)
    }
  }, [recall]);

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Clubs Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
        <UpsertClubs selectedData={gotData} recallData={recallData} />
        {recall === 1 ? (
            <div className="ui segment basic">
              <div className="ui active inverted dimmer">
                <div className="ui indeterminate text loader">Loading table...</div>
              </div>
            </div>
          ) : (
            <FetchClubs selectData={selectData} />
        )}
        
    </>

    );
  };
  