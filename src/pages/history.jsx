import { FetchHistory } from '../utilities/fetch/tables/history'

export const HistoryPage = () => {

    return (

    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="history big icon"></i>
              <div className="content">
               History Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <FetchHistory />
      </>
    );
  };
  