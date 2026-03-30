import React from 'react'
import Title from '../components/Title';
import DisplayPopularMovie from '../components/DisplayPopularMovie';
const Popular = () => {
  return (
    <div className='pt-18 sm:pt-20 sm:pb-20 px-4 sm:px-10'>
      <Title title={'Popular Movie'}/>
      <DisplayPopularMovie />
    </div>
  )
}

export default Popular;