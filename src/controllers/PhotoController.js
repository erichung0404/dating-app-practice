import React from 'react'; 
import { connect } from 'react-redux'; 

import Photo from '../components/Photo'; 

/**
  * use state to prevent pointers from re-assigned
  * after open/close info page
  */ 
function PhotoController(props) {
  const { 
    curr, 
    prev, 
    next, 
    photos, 
    swipeEnabled, 
    imageStyle, 
    isInfoPageEnabled 
  } = props; 

  return (
    <Photo 
      curr={curr} 
      prev={prev} 
      next={next}
      photos={photos}
      swipeEnabled={swipeEnabled}
      imageStyle={imageStyle}
      isInfoPageEnabled={isInfoPageEnabled}
    />
  )
}

const mapStateToProps = state => ({
  curr: state.photo.curr, 
  prev: state.photo.prev, 
  next: state.photo.next
})

export default connect(mapStateToProps)(PhotoController); 