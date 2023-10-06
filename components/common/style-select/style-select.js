import React, { useState } from 'react'
import style from './_style-select.module.scss'

const StyleSelect = ({ title, children, onSelect, hasTitle = true }) => {
  // 製作點擊後變色的效果，並且儲存點擊的值，預設為第一個 style-select-item
  const [active, setActive] = useState(null)
  const [selected, setSelected] = useState(
    children[0].props.value || children[0].props.children
  )
  // console.log(children)

  const handleClick = (key, value) => {
    setActive(key)
    setSelected(value)

    // 在點擊時呼叫回調函數，將選擇的資料傳遞給父元件
    onSelect(title, value)
  }

  return (
    <div className={`${style['style-select']}`}>
      {hasTitle && (
        <h5 className="text-secondary d-flex justify-content-center d-sm-block">
          {title}
        </h5>
      )}
      <div className={`${style['style-select-list']}`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // 將 handleClick 函數作為 onClick 屬性傳遞給每個子元件
            return React.cloneElement(child, {
              onClick: handleClick,
              active,
              selected,
              onSelect,
            })
          }
          return child
        })}
      </div>
    </div>
  )
}

const Item = ({
  children,
  selected,
  key,
  value = children,
  onClick,
  onSelect,
}) => {
  return (
    <div
      onSelect={() => {
        onSelect(title, value)
      }}
      onClick={() => onClick(key, value)}
      className={`${style['style-select-item']} ${
        selected === value ? style['active'] : ''
      }`}
    >
      {children}
    </div>
  )
}

export { StyleSelect, Item }
