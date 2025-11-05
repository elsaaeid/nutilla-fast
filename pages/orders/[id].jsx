import OrderPage, { getServerSideProps } from '../order/[id]'

// Render the same UI as /order/[id] so both URLs work.
export { getServerSideProps }

export default function OrdersId(props) {
  return <OrderPage {...props} />
}
