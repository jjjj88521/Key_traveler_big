import PaginationComponent from '@/components/common/PaginationComponent'
import {
  Item,
  StyleSelect,
} from '@/components/common/style-select/style-select'
import useStyleSelect from '@/hooks/useStyleSelect'
import { Rate } from 'antd'
import { useEffect } from 'react'

export default function ReviewTab() {
  const [starSelected, handleStarSelect] = useStyleSelect()

  useEffect(() => {
    console.log(starSelected)
  }, [starSelected])
  return (
    <>
      {/* 上方選單區 */}
      <div className="row py-3 border-bottom border-2 border-primary">
        {/* 平均星數 */}
        <div className="col">
          <div className="d-flex flex-column align-items-center">
            <h4 className="text-primary">
              <span>4.5</span> / 5
            </h4>
            <Rate value={4.5} disabled allowHalf style={{ fontSize: '30px' }} />
          </div>
        </div>
        {/* 篩選 */}
        <div className="col-auto d-flex align-items-end">
          <StyleSelect
            title="星數"
            onSelect={handleStarSelect}
            hasTitle={false}
          >
            <Item key={0} value={0}>
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
      <div></div>
      <PaginationComponent
        totalItems={100}
        pageSize={5}
        onPageChange={(page) => console.log(page)}
      />
    </>
  )
}
