import { useState } from 'react'
import TabButton from './TabButton.js'
import IntroTab from './IntroTab.js'
import SpecTab from './SpecTab.js'
import ReviewTab from './ReviewTab.js'

export default function TabContainer() {
  const [tab, setTab] = useState('intro')
  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-center">
          <TabButton isActive={tab === 'intro'} onClick={() => setTab('intro')}>
            商品介紹
          </TabButton>
          <TabButton isActive={tab === 'spec'} onClick={() => setTab('spec')}>
            商品規格
          </TabButton>
          <TabButton
            isActive={tab === 'review'}
            onClick={() => setTab('review')}
          >
            商品評價[5]
          </TabButton>
        </div>
        <hr />
        <p>上面的hr之後再拿掉，目前這樣分區比較清楚</p>
        {tab === 'intro' && <IntroTab />}
        {tab === 'spec' && <SpecTab />}
        {tab === 'review' && <ReviewTab />}
      </div>
    </>
  )
}
