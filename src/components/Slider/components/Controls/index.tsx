import { observer } from 'mobx-react'

import { useSliderStoreContext } from '../../contexts'
import Menu from '../Menu'

import './index.scss'

const Contols = () => {
  const { isCaptionHidden, toggleCaptions } = useSliderStoreContext()

  return (
    <div className="slider__controls">
      <Menu />
      <button type="button" className="btn btn-toggle-captions" onClick={toggleCaptions}>
        {!!isCaptionHidden ? 'Show' : 'Hide'} Captions
      </button>
    </div>
  )
}
export default observer(Contols)
