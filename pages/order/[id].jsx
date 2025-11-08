import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useCurrentUser } from "../../protect/AuthGate";

const Order = ({ order }) => {
  // keep a local copy so the UI updates after admin actions
  const [orderState, setOrderState] = useState(order);
  const [loading, setLoading] = useState(false);
  const user = useCurrentUser();
  const role = user?.role;
  const isAdmin = !!user && (role === "admin" || role === "superadmin" || role === "author");

  const status = orderState.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  // simple feedback for already-delivered orders
  const succefullDeliveredToast = () => {
    if (typeof window !== 'undefined') {
      // keep this simple for now; replace with a proper toast when available
      try {
        window.alert('Order is already delivered.');
      } catch (e) {
        console.log('Order is already delivered.');
      }
    }
  };

  // feedback for cash-on-delivery customers
  const succefullCODToast = () => {
    if (typeof window !== 'undefined') {
      try {
        window.alert('Wait admin to check order');
      } catch (e) {
        console.log('Wait admin to check order');
      }
    }
  };

  const handleStatus = async () => {
    if (!isAdmin) return;
    if (orderState.status >= 3) return;
    try {
      setLoading(true);
      const res = await axios.put(`/api/orders/${orderState._id}`, { status: orderState.status + 1 });
      // API returns the updated order
      setOrderState(res.data);
    } catch (err) {
      console.error('Failed to update order status', err);
      // Optionally show a toast or inline error (not added here)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{orderState._id}</span>
                </td>
                <td>
                  <span className={styles.name}>{orderState.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{orderState.address}</span>
                </td>
                <td>
                  <span className={styles.total}>${orderState.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" unoptimized />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
                unoptimized
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            {/* bake.png was missing from public/img; use an existing asset */}
            <Image src="/img/halfwaffel.png" width={30} height={30} alt="" unoptimized />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
                unoptimized
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" unoptimized />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
                unoptimized
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" unoptimized />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${orderState.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${orderState.total}
          </div>
          {/* Admins may advance the order; non-admins see payment status (disabled) */}
          {isAdmin ? (
            orderState.status < 3 ? (
              <button
                onClick={handleStatus}
                className={styles.button}
                disabled={loading}
              >
                {loading ? "Updating..." : "Mark as Delivered"}
              </button>
            ) : (
              <button onClick={succefullDeliveredToast} className={styles.button}>
                DELIVERED
              </button>
            )
          ) : orderState.method === 1 ? (
            <button disabled className={styles.button}>
              PAID
            </button>
          ) : orderState.method === 0 ? (
            <button onClick={succefullCODToast} className={styles.button}>
              CASH ON DELIVERY
            </button>
          ) : (
            <button disabled className={styles.button}>
              PAID
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const dbConnect = require("../../util/mongo").default || require("../../util/mongo");
    const Order = (require("../../models/Order").default || require("../../models/Order"));
    await dbConnect();
    const order = await Order.findById(params.id).lean();
    if (!order) return { notFound: true };
    const serialized = {
      ...order,
      _id: String(order._id),
      createdAt: order.createdAt ? order.createdAt.toISOString() : null,
      updatedAt: order.updatedAt ? order.updatedAt.toISOString() : null,
    };
    return { props: { order: serialized } };
  } catch (err) {
    console.error('Error fetching order in getServerSideProps:', err?.message || err);
    return { props: { order: null } };
  }
};

export default Order;