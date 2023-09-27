import { useState } from 'react'
import TabButton from './TabButton.js'
import IntroTab from './IntroTab.js'
import SpecTab from './spec-tab'
import ReviewTab from './review-tab'

export default function TabContainer({
  feature,
  featureImgs,
  specTable,
  commentData,
}) {
  const [tab, setTab] = useState('intro')
  return (
    <section className="">
      <div className="container">
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
              <TabButton
                isActive={tab === 'spec'}
                onClick={() => setTab('spec')}
              >
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
          {/* 主要內容 */}
          {tab === 'intro' && (
            <IntroTab feature={feature} featureImgs={featureImgs} />
          )}
          {tab === 'spec' && <SpecTab specTable={specTable} />}
          {tab === 'review' && <ReviewTab commentData={commentData} />}
        </div>
      </div>
    </section>
  )
}
