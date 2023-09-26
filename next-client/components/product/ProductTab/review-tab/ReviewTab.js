import PaginationComponent from '@/components/common/PaginationComponent'
import {
  Item,
  StyleSelect,
} from '@/components/common/style-select/style-select'
import useStyleSelect from '@/hooks/useStyleSelect'
import { List, Rate } from 'antd'
import { random } from 'lodash'
import { useRef, useState } from 'react'
import CommentItem from './comment-item'

// 評論假資料
const commentData = Array.from({
  length: 23,
}).map((_, i) => ({
  key: i,
  account: 'account' + i,
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  star: Math.ceil(Math.random() * 5),
  comment: 'comment' + i,
  // 隨機日期2023-01-01 ~ 2023-12-31
  createTime: new Date(random(2023, 2023)).toLocaleDateString(),
}))

export default function ReviewTab() {
  // 計算平均星數，四捨五入到小數點第一位
  const averageStar = (
    commentData.reduce((sum, item) => sum + item.star, 0) / commentData.length
  ).toFixed(1)

  // 星星篩選
  const [starSelected, handleStarSelect] = useStyleSelect([
    {
      key: '星數',
      value: 6,
    },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 5

  // 找到 class comment-list 的元素，滾動到該元素的底部
  const commentListRef = useRef(null)
  // 處理頁碼變更事件
  const handlePageChange = (page) => {
    // 找到 class comment-list 的元素，滾動到該元素的底部
    commentListRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
    setCurrentPage(page)
    console.log('currentPage is' + currentPage)
    // 在這裡可以處理分頁後的資料載入或其他操作
  }

  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedData = commentData.slice(startIndex, endIndex)

  return (
    <div className="comment-list">
      {/* 上方選單區 */}
      <div
        className="row py-3 border-bottom border-2 border-primary"
        ref={commentListRef}
      >
        {/* 平均星數 */}
        <div className="col">
          <div className="d-flex flex-column align-items-center">
            <h4 className="text-primary">
              <span>{averageStar}</span> / 5
            </h4>
            <Rate
              value={averageStar}
              disabled
              allowHalf
              style={{ fontSize: '30px' }}
            />
          </div>
        </div>
        {/* 篩選 */}
        <div className="col-auto d-flex align-items-end">
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
        </div>
        {/* 排序 */}
        <div className="col"></div>
      </div>
      {/* 評論列表 */}
      <List
        size="large"
        dataSource={displayedData}
        renderItem={(item) => (
          <List.Item key={item.key}>
            <CommentItem {...item} />
          </List.Item>
        )}
      />
      <hr className="text-secondary" />
      <div className="pt-3">
        <PaginationComponent
          totalItems={commentData.length}
          pageSize={5}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
