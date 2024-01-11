import { useState } from 'react'
import cn from 'classnames'

import { ImageProps } from '../Image'

import './index.scss'

interface MenuItemProps {
  isActive: boolean
  onMenuClick: () => void
  image: ImageProps
  client: string
}

const MenuItem = ({ isActive, onMenuClick, image, client }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { alt, name } = image

  return (
    <div
      className={cn({
        menuItem: true,
        'menuItem--selected': isActive,
      })}
    >
      <button
        type="button"
        onClick={onMenuClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {alt}
      </button>

      {isHovered === true ? (
        <div className="menuItem__thumbnail">
          <h5 dangerouslySetInnerHTML={{ __html: client }}></h5>
          <img className="menuItem__img" src={`images/${name}`} alt={alt} title={alt} height={100} />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default MenuItem
