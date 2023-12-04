import { useRouter } from 'next/router'

import POrderList from '@/components/order-list/p-order-list'
import GOrderList from '@/components/order-list/g-order-list'
import ROrderList from '@/components/order-list/r-order-list'

export default function OrderDetail() {
  const router = useRouter()
  const { oid } = router.query

  let orderListComponent = null

  if (typeof oid === 'string') {
    const prefix = oid.charAt(0)

    switch (prefix) {
      case 'P':
        orderListComponent = <POrderList />
        break
      case 'G':
        orderListComponent = <GOrderList />
        break
      case 'R':
        orderListComponent = <ROrderList />
        break
      default:
        orderListComponent = <div>查無訂單</div>
        break
    }
  }

  return (
    <>
      <div className="container mt-5 py-4" style={{ height: '527px' }}>
        {orderListComponent}
      </div>
    </>
  )
}
