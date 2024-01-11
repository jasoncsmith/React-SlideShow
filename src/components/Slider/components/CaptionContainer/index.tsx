import { ReactNode } from 'react'
import { observer } from 'mobx-react'
import cn from 'classnames'

import { useSliderStoreContext } from '../../contexts'

import './index.scss'

interface CaptionContainerProps {
  children: ReactNode
}

const CaptionContainer = ({ children }: CaptionContainerProps) => {
  const { isCaptionHiding, isCaptionHidden, isCaptionShowing } = useSliderStoreContext()

  return (
    <div
      className={cn({
        'slider__caption-display': true,
        'slider__caption-display--is-hidden': isCaptionHidden,
        'slider__caption-display--is-hiding': isCaptionHiding,
        'slider__caption-display--is-showing': isCaptionShowing,
      })}
    >
      {children}

      <div className="caption-display__links"></div>
    </div>
  )
}

export default observer(CaptionContainer)
