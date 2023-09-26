import { useState } from 'react'
import TabButton from './TabButton.js'
import IntroTab from './IntroTab.js'
import SpecTab from './SpecTab.js'
import ReviewTab from './review-tab/ReviewTab.js'

export default function TabContainer() {
  const [tab, setTab] = useState('intro')
  return (
    <>
      <div className="px-sm-4 px-0 py-sm-5 py-2 border-top border-2">
        <div className="row justify-content-center py-4 gap-sm-5 gap-0">
          <div className="col-4 col-sm-auto text-center">
            <TabButton
              isActive={tab === 'intro'}
              onClick={() => setTab('intro')}
            >
              商品介紹
            </TabButton>
          </div>
          <div className="col-4 col-sm-auto text-center">
            <TabButton isActive={tab === 'spec'} onClick={() => setTab('spec')}>
              商品規格
            </TabButton>
          </div>
          <div className="col-4 col-sm-auto text-center">
            <TabButton
              isActive={tab === 'review'}
              onClick={() => setTab('review')}
            >
              商品評價[5]
            </TabButton>
          </div>
        </div>
        {/* <hr />
        <p>上面的hr之後再拿掉，目前這樣分區比較清楚</p> */}
        {tab === 'intro' && <IntroTab />}
        {tab === 'spec' && <SpecTab />}
        {tab === 'review' && <ReviewTab />}
      </div>
    </>
  )
}
