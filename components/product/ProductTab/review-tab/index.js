import PaginationComponent from '@/components/common/PaginationComponent'
import {
  Item,
  StyleSelect,
} from '@/components/common/style-select/style-select'
import useStyleSelect from '@/hooks/useStyleSelect'
import { Dropdown, List, Progress, Rate, Space, Typography } from 'antd'
import { useRef, useState, useEffect } from 'react'
import CommentItem from './comment-item'
import axios from 'axios'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import { useProductData } from '@/context/use-product'
import { useRouter } from 'next/router'
import { fetchProductComment } from '@/libs/productFetcher'
import { DownOutlined } from '@ant-design/icons'

export default function ReviewTab() {
  const { productData, commentData, setCommentData, commentCount } =
    useProductData()
  const pid = productData.id
  // loading
  const [isloading, setIsLoading] = useLoading(commentData)
  // 取得商品評論資料
  const getComment = async (pid, ...qs) => {
    const [star, page] = qs
    const comment = await fetchProductComment(pid, star, page)
    setCommentData(comment)
  }

  // 星星篩選
  const [starSelected, handleStarSelect] = useStyleSelect([
    {
      key: '星數',
      value: 6,
    },
  ])

  // 當前頁數
  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 5

  // 找到 class comment-list 的元素，滾動到該元素的底部
  const commentListRef = useRef(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  useEffect(() => {
    if (commentListRef.current) {
      const rect = commentListRef.current.getBoundingClientRect()
      const top = rect.top + window.scrollY
      setScrollHeight(top)
    }
  }, [commentListRef])

  // 處理頁碼變更事件
  const handlePageChange = (currentPage) => {
    // // 找到 class comment-list 的元素，滾動到該元素的底部
    getComment(
      pid,
      starSelected[0].value === 6 ? null : starSelected[0].value,
      currentPage
    )
    setCurrentPage(currentPage)
    setIsLoading(true)
  }
  // 根據選擇的星數篩選出評論
  const handleDisplayedData = () => {
    getComment(pid, starSelected[0].value === 6 ? null : starSelected[0].value)
    setIsLoading(true)
    setCurrentPage(currentPage)
  }
  const filteredData = commentData.data

  useEffect(() => {
    if (pid) {
      getComment(
        pid,
        starSelected[0].value === 6 ? null : starSelected[0].value,
        currentPage
      )
    }
  }, [])

  useEffect(() => {
    handleDisplayedData()
  }, [starSelected])

  return (
    <>
      <div className="comment-list py-3" ref={commentListRef}>
        {/* 上方選單區 */}
        <div className="row pb-3">
          <div className="col-sm-4 col-12 d-flex flex-column gap-3">
            {/* 平均星數 */}
            <div className="vstack gap-3 align-item-center">
              <div className="text-center">
                <h2 className="text-primary">
                  <span>{commentCount.avgStar}</span> / 5
                </h2>
                <Rate value={commentCount.avgStar} disabled allowHalf />
              </div>
              <div className="text-center text-secondary">
                {commentCount.total} 則評論
              </div>
              {/* 各星數評論數 */}
              <div className="px-2">
                {commentCount.eachStar.map((star, index) => {
                  return (
                    <div key={index} className="row">
                      <div className="col-auto d-flex justify-content-between px-0">
                        <div className="text-center" style={{ width: '20px' }}>
                          {star.star}
                        </div>
                        <Rate count={1} value={1} />
                      </div>
                      <div className="col-10 px-1 d-flex justify-content-center">
                        <Progress
                          percent={
                            commentCount.total === 0
                              ? 0
                              : (star.count / commentCount.total) * 100
                          }
                          showInfo={false}
                        />
                      </div>

                      <div className="col px-0 d-flex justify-content-center text-nowrap">
                        {star.count}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="col-sm-8 col-12">
            <div className="d-flex justify-content-between">
              {/* 篩選 */}
              <StyleSelect
                title="星數"
                onSelect={handleStarSelect}
                hasTitle={false}
              >
                <Item key={6} value={6}>
                  全部
                </Item>
                <Item key={5} value={5}>
                  五星
                </Item>
                <Item key={4} value={4}>
                  四星
                </Item>
                <Item key={3} value={3}>
                  三星
                </Item>
                <Item key={2} value={2}>
                  二星
                </Item>
                <Item key={1} value={1}>
                  一星
                </Item>
              </StyleSelect>
              <div className="d-flex">
                {/* 時間排序 */}
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: [
                      {
                        key: '1',
                        label: '預設排序',
                      },
                      {
                        key: '2',
                        label: '時間由新到舊',
                      },
                      {
                        key: '3',
                        label: '時間由舊到新',
                      },
                    ],
                    // onClick: handleChangeOrderby,
                  }}
                >
                  <Typography.Link>
                    <Space className="fs-6 text-dark fw-bold">
                      排序
                      <DownOutlined />
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </div>
            </div>
            {/* 評論列表 */}
            {isloading ? (
              <LoadingPage />
            ) : (
              <div className="pt-3">
                <List
                  size="large"
                  dataSource={filteredData}
                  renderItem={(item) => (
                    <List.Item key={item.key}>
                      <CommentItem {...item} />
                    </List.Item>
                  )}
                />
                <hr className="text-secondary" />
                <div className="pt-3">
                  <PaginationComponent
                    totalItems={commentData.starTotal}
                    pageSize={pageSize}
                    currentPage={commentData.page}
                    onPageChange={handlePageChange}
                    scrollTo={scrollHeight}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
