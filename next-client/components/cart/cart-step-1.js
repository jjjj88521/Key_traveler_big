import React, { useState, useEffect } from 'react'

import { Steps, Divider, Radio, List } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'

export default function CartStep1() {
  // step 1
  const items = [
    {
      title: '確認商品',
    },
    {
      title: '填寫訂單資訊',
    },
    {
      title: '完成訂單',
    },
  ]
  return (
    <>
      {/* step 1 */}
      <Steps
        current={0}
        labelPlacement="vertical"
        items={items}
        responsive={false}
        className="mt-5"
      />
    </>
  )
}
