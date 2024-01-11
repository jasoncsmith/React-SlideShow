import React, { useState } from 'react'
import { observer } from 'mobx-react'

import SliderContainer from './components/SliderContainer'
import CaptionContainer from './components/CaptionContainer'
import ViewPort from './components/ViewPort'
import Caption from './components/Caption'
import Controls from './components/Controls'
import Nav from './components/Nav'
import SliderStore, { SliderStoreContext } from './contexts'

import './index.scss'

function Slider() {
  const [store] = useState(() => new SliderStore())
  return (
    <SliderStoreContext.Provider value={store}>
      <div className="slider">
        <SliderContainer>
          <ViewPort />
          <Nav />
          <Controls />
        </SliderContainer>

        <CaptionContainer>
          <Caption />
        </CaptionContainer>
      </div>
    </SliderStoreContext.Provider>
  )
}

export default observer(Slider)
