import React from 'react';
import Title from '../components/Title';
import DisplaySeries from '../components/DisplaySeries';

const Series = () => {
  return (
    <div className='pt-18 sm:pt-20 sm:pb-20 px-4 sm:px-10'>
      <title>Series</title>
      <Title title={'Popular Series'} />
      <DisplaySeries />
    </div>
  );
};

export default Series;