import { Children, cloneElement, useState, useRef } from 'react'
import IntroTab from './IntroTab.js'
import SpecTab from './spec-tab'
import ReviewTab from './review-tab'
import style from '@/styles/_fade-in-out.module.scss'
import GbDescription from './gb-desc.js'
import { useProductData } from '@/context/product.js'

export default function TabContainer({ children }) {
  const [tab, setTab] = useState('intro')

  // tab 切換，滾動到該位置
  const TabRef = useRef(null)
  const handleScroll = () => {
    if (TabRef.current) {
      TabRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 使用 productDataContext 取得商品資料
  const { productData } = useProductData()
  let { feature, feature_img: featureImgs, specTable } = productData
  featureImgs =
    Object.keys(productData).length > 0
      ? JSON.parse(productData.feature_img)
      : []
  specTable =
    Object.keys(productData).length > 0 ? JSON.parse(productData.spec) : []

  return (
    <section className="">
      <div className="container" ref={TabRef}>
        <div className="px-sm-4 px-0 py-2 border-top border-2">
          <div className="row justify-content-center py-4 gap-sm-5 gap-0">
            {Children.map(children, (child) => {
              return (
                <div className="col-4 col-sm-auto text-center">
                  {cloneElement(child, {
                    isActive: tab === child.props.tabName,
                    onClick: () => {
                      setTab(child.props.tabName)
                    },
                  })}
                </div>
              )
            })}
          </div>
          {/* 主要內容 */}
          <div
            className={`${style['fade-in-out']} ${
              tab === 'intro' ? style['active'] : ''
            }`}
          >
            {tab === 'intro' && (
              <IntroTab feature={feature} featureImgs={featureImgs} />
            )}
          </div>
          <div
            className={`${style['fade-in-out']} ${
              tab === 'spec' ? style['active'] : ''
            }`}
          >
            {tab === 'spec' && <SpecTab specTable={specTable} />}
          </div>
          <div
            className={`${style['fade-in-out']} ${
              tab === 'review' ? style['active'] : ''
            }`}
          >
            {tab === 'review' && <ReviewTab />}
          </div>
          <div
            className={`${style['fade-in-out']} ${
              tab === 'gb-desc' ? style['active'] : ''
            }`}
          >
            {tab === 'gb-desc' && <GbDescription />}
          </div>
        </div>
      </div>
    </section>
  )
}
