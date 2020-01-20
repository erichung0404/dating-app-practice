import React from 'react'; 
import { connect } from 'react-redux'; 
 
import Deck from '../components/Deck'; 

import { 
  updateCurr, 
  openInfoScreen, 
  closeInfoScreen
} from '../actions/card'; 

function DeckController(props) {
  const { 
    navigation, 
    profiles, 
    curr, 
    pan, 
    angle, 
    opacity, 
    showInfo, 
    updateCurr, 
    openInfoScreen, 
    closeInfoScreen
  } = props; 

  return (
    <Deck 
      navigation={navigation}
      profiles={profiles}
      curr={curr}
      pan={pan}
      angle={angle}
      opacity={opacity}
      showInfo ={showInfo}
      updateCurr={updateCurr}
      openInfoScreen={openInfoScreen}
      closeInfoScreen={closeInfoScreen}
   />
  ); 
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles, 
  curr: state.card.curr, 
  pan: state.card.pan, 
  angle: state.card.angle, 
  opacity: state.card.opacity, 
  showInfo: state.card.showInfo
})

const mapDispatchToProps = dispatch => ({
  updateCurr: dest => dispatch(updateCurr(dest)), 
  openInfoScreen: animation => dispatch(openInfoScreen(animation)), 
  closeInfoScreen: animation => dispatch(closeInfoScreen(animation))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckController); 