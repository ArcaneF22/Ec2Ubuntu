import { useLayoutEffect, useState } from 'react';
import { FetchImages } from '../utilities/fetch/tables/images'

export const ImagesPage = () => {

  const selectImage = (newValue) => {
    setgotClub(newValue)
  };

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Images Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
        <FetchImages selectImage={selectImage} />
    </>

    );
  };
  