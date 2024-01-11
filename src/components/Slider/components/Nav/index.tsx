import { observer } from 'mobx-react'

import { useSliderStoreContext } from '../../contexts'
import './index.scss'

const Nav = () => {
  const { goToPrevious, goToNext } = useSliderStoreContext()

  return (
    <nav className="slider__nav">
      <button type="button" className="slider__nav__btn slider__nav__btn--prev" onClick={goToPrevious}>
        Previous
      </button>

      <button type="button" className="slider__nav__btn slider__nav__btn--next" onClick={goToNext}>
        Next
      </button>
    </nav>
  )
}
export default observer(Nav)
