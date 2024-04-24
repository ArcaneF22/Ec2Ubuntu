import { FetchMyHistory } from '../utilities/fetch/tables/myhistory'

export const MyHistoryPage = () => {

    return (
      <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="history big icon"></i>
              <div className="content">
                  My History Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <FetchMyHistory />
      </>

    );
  };
  