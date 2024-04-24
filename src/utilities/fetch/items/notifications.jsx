import React, { useState, useLayoutEffect } from 'react';

import { RawNotificationPending, RawNotificationCount } from '../raw/notification'

export const FetchNotificationPending = () => {

  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counted, setCounted] = useState([]);
  const [clicked, setClicked] = useState(0)

  const loadingNotification = (value) => {
      setLoading(value);
  };

  const itemNotification = (value) => {
      setTable(value)
  };

  const countNotification = (value) => {
    setCounted(value)
};

    useLayoutEffect(() => {
    }, [counted]);
function contentTable(){
    return <div className="ui attached segment fluid">
                        <div className="ui relaxed divided list">
                        {table.map((i, index) => (
                            <div className="item" key={index}>
                                <i className="check circle outline middle aligned icon"></i>
                                <div className="content">
                                    <div className="header ui text small blue">{i.type} </div>
                                    <div className="meta">
                                        <span className="cinema">ID#{i.id}: on {i.requestTime}</span>
                                    </div>
                                    <div className="description">By {i.requestedByRole} {i.requestedBy} {i.requestedByNickname}</div>
                                    <div className="description">To {i.requestedToRole} {i.requestedTo} {i.requestedToNickname}</div>
                                    <div className="extra">
                                        <div className="ui label orange">Status: {i.status}</div>
                                        <div className="ui right floated purple button">
                                            View request
                                            <i className="right chevron icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
            </div>
}

function contentTask() {
    if (counted == 0) {
        return  <>
                    <h3 className="ui top attached header">
                        You have no pending task!
                    </h3>
                </>
    } else if (counted == 1) {
        return  <>
                    <h3 className="ui top attached header">
                       You've got a Pending Task!
                    </h3>
                    {contentTable()}
                </>
    } else if (counted > 1) {
        return  <>
                    <h3 className="ui top attached header">
                        You've got {counted} Pending Tasks!
                    </h3>
                    {contentTable()}
                </>
    } else {
        return  <>
                    <h3 className="ui top attached header">
                        Still counting...
                    </h3>
                </>
    }
  }

  return (
<>

<RawNotificationPending loadingNotification={loadingNotification} itemNotification={itemNotification} />
<RawNotificationCount countNotification={countNotification}  />

{loading ? (
        <div className="ui segment basic">
          <div className="ui active inverted dimmer">
            <div className="ui indeterminate text loader">Loading data...</div>
          </div>
        </div>
      ) : ( <> {contentTask()} </>  )}

</>

  );
}
