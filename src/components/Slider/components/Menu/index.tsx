import { observer } from 'mobx-react'

import MenuItem from '../MenuItem'

import { Project, useSliderStoreContext } from '../../contexts'

import './index.scss'

const Menu = () => {
  const { slides: items, isPlaying, index, goTo } = useSliderStoreContext()

  return (
    <div className="slider__menu">
      {items.map(
        (t: Project, idx: number): JSX.Element => (
          <MenuItem
            key={`mi-${t.id}`}
            isActive={index === idx}
            onMenuClick={() => goTo(idx)}
            image={items[idx].image}
            client={items[idx].client}
          />
        )
      )}

      <div className="slider__menu--play-state">{!!isPlaying ? 'Playing' : 'Paused'}</div>
    </div>
  )
}

export default observer(Menu)
