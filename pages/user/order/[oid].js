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

  // const initialOrderLists = [
  //   {
  //     id: 1,
  //     img: '/images/1669370674683000804.jpg',
  //     price: 3000,
  //     amount: 1,
  //   },
  //   {
  //     id: 2,
  //     img: '/images/1669370674683000804.jpg',
  //     price: 1000,
  //     amount: 2,
  //   },
  // ]
  // const initialRentOrderLists = [
  //   {
  //     id: 1,
  //     img: '/images/1669370674683000804.jpg',
  //     startDate: '2023-10-02',
  //     endDate: '2023-10-03',
  //     price: 300,
  //   },
  //   {
  //     id: 2,
  //     img: '/images/1669370674683000804.jpg',
  //     startDate: '2023-10-04',
  //     endDate: '2023-10-05',
  //     price: 100,
  //   },
  // ]
  // const [orderLists, setOrderLists] = useState(initialOrderLists)
  // const [rentOrderLists, setRentOrderLists] = useState(initialRentOrderLists)
  // P總計
  // const calculateTotalPrice = (orderLists) => {
  //   let totalPrice = 0
  //   for (const orderList of orderLists) {
  //     totalPrice += orderList.price * orderList.amount
  //   }
  //   return totalPrice
  // }
  // const totalPrice = calculateTotalPrice(orderLists)

  return (
    <>
      <div className="container py-4">
        {orderListComponent}
        {/* <POrderList />
        <GOrderList />
        <ROrderList /> */}
        {/* 一般商品 */}
        {/* <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div className="pe-2">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-primary"
            />
          </div>
          <div>一般商品</div>
          <div className="ps-1">(2)</div>
        </div> */}
        {/* 歷史訂單明細頁 電腦版 */}
        {/* <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th
                className="bg-primary text-white ps-3"
                style={{ width: '40%' }}
              >
                商品明細
              </th>
              <th className="bg-primary text-white text-center">單價</th>
              <th className="bg-primary text-white text-center">數量</th>
              <th className="bg-primary text-white text-center">小計</th>
              <th className="bg-primary text-white text-center">評價</th>
            </tr>
          </thead>
          <tbody>
            {orderLists.map((v) => (
              <tr key={v.id}>
                <td className="d-flex">
                  <div className="p-2">
                    <Image src={v.img} width={100} height={100} alt="" />
                  </div>
                  <div className="p-2">
                    <div>Qwertykey</div>
                    <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                    <div>陽極紅</div>
                    <div>噴砂銀</div>
                  </div>
                </td>
                <td className="align-middle text-center">${v.price}</td>
                <td className="align-middle ps-3 text-center">{v.amount}</td>
                <td className="align-middle text-center">
                  ${v.price * v.amount}
                </td>
                <td className="align-middle ps-3 text-center">
                  <button className="btn">
                    <FontAwesomeIcon icon={faPencil} className="text-primary" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-end pe-4" colSpan={5}>
                <div className="pe-4">總計: ${totalPrice}</div>
              </td>
            </tr>
          </tbody>
        </table> */}
        {/* 租用商品 */}
        {/* <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div className="pe-2">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-primary"
            />
          </div>
          <div>租用商品</div>
          <div className="ps-1">(2)</div>
        </div> */}
        {/* 歷史訂單明細頁 電腦版 */}
        {/* <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th
                className="bg-primary text-white ps-3"
                style={{ width: '40%' }}
              >
                商品明細
              </th>
              <th className="bg-primary text-white" style={{ width: '25%' }}>
                租用日期
              </th>
              <th className="bg-primary text-white text-center">數量</th>
              <th className="bg-primary text-white text-center">小計</th>
            </tr>
          </thead>
          <tbody>
            {rentOrderLists.map((v) => (
              <tr key={v.id}>
                <td className="d-flex">
                  <div className="p-2">
                    <Image src={v.img} width={100} height={100} alt="" />
                  </div>
                  <div className="p-2">
                    <div>Qwertykey</div>
                    <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                    <div>陽極紅</div>
                    <div>噴砂銀</div>
                  </div>
                </td>
                <td className="align-middle">
                  <span>{v.startDate}</span>
                  <span className="px-2">
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-secondary"
                    />
                  </span>
                  <span>{v.endDate}</span>
                </td>
                <td className="align-middle ps-3 text-center">1</td>
                <td className="align-middle text-center">${3000}</td>
              </tr>
            ))}
            <tr>
              <td className="text-end pe-5 " colSpan={4}>
                <div className="pe-4 ">總計: $6000</div>
              </td>
            </tr>
          </tbody>
        </table> */}
        {/* 一般商品 */}
        {/* 歷史訂單明細頁 手機版 */}
        {/* <table className="table d-table d-sm-none">
          <thead>
            <tr>
              <th className="bg-primary text-white" colSpan={3}>
                <div className="d-flex px-1">
                  <div>一般商品</div>
                  <div className="ps-1">(2)</div>
                  <div className="ms-auto">
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orderLists.map((v) => (
              <tr key={v.id}>
                <td className="d-flex">
                  <div className="pe-2 pt-2">
                    <Image src={v.img} width={100} height={100} alt="" />
                  </div>
                  <div>
                    <div>Qwertykey</div>
                    <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                    <div>陽極紅</div>
                    <div>噴砂銀</div>
                    <div className="d-flex">
                      <div>${v.price}</div>
                      <div
                        className="border rounded-5 ms-auto text-center"
                        style={{ width: 70 }}
                      >
                        {v.amount}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <button className="btn">
                    <FontAwesomeIcon icon={faPencil} className="text-primary" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-end pe-3" colSpan={2}>
                總計: ${totalPrice}
              </td>
            </tr>
          </tbody>
        </table> */}
        {/* 租用商品 */}
        {/* 歷史訂單明細頁 手機版 */}
        {/* <table className={`table d-table d-sm-none`}>
          <thead>
            <tr>
              <th className="bg-primary text-white" colSpan={3}>
                <div className="d-flex px-1">
                  <div>租用商品</div>
                  <div className="ps-1">(2)</div>
                  <div className="ms-auto">
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rentOrderLists.map((v) => (
              <tr key={v.id}>
                <td className="d-flex">
                  <div className="pe-2 pt-2">
                    <Image src={v.img} width={100} height={100} alt="" />
                  </div>
                  <div>
                    <div>Qwertykey</div>
                    <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                    <div>陽極紅</div>
                    <div>噴砂銀</div>
                    <div>
                      <span>{v.startDate}</span>
                      <span className="px-2">
                        <FontAwesomeIcon
                          icon={faCaretRight}
                          className="text-secondary"
                        />
                      </span>
                      <span>{v.endDate}</span>
                    </div>
                    <div>$300</div>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-end pe-3" colSpan={2}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </>
  )
}
