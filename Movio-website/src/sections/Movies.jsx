import React from 'react'
import DisplayAllMovie from '../components/DisplayAllMovie';
import Title from '../components/Title';
const Movies = () => {
  return (
    <div className='pt-18 sm:pt-20 sm:pb-20'>
      <Title title={'All Movie'}/>
      <DisplayAllMovie />
    </div>
  )
}

export default Movies;