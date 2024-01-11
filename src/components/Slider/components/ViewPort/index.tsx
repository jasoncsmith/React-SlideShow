import { observer } from 'mobx-react'
import cn from 'classnames'

import { useSliderStoreContext } from '../../contexts'
import SlideImage from '../Image'

import './index.scss'

const ViewPort = () => {
  const { isAnimatingRight, isAnimatingLeft, prevIndex, index, nextIndex, slides } = useSliderStoreContext()

  return (
    <div className="slider__viewport">
      <div
        className={cn({
          slider__viewport__slides: true,
          'slider__viewport__slides--is-animating-left': isAnimatingLeft,
          'slider__viewport__slides--is-animating-right': isAnimatingRight,
        })}
      >
        <SlideImage {...slides[prevIndex]?.image} />
        <SlideImage {...slides[index]?.image} />
        <SlideImage {...slides[nextIndex]?.image} />
      </div>
    </div>
  )
}

export default observer(ViewPort)
