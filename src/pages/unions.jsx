import { useLayoutEffect, useState } from 'react';
import { FetchUnions } from '../utilities/fetch/tables/unions'

export const UnionsPage = () => {

  const selectUnion = (newValue) => {
    setgotClub(newValue)
  };

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Unions Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
        <FetchUnions selectUnion={selectUnion} />
    </>

    );
  };
  