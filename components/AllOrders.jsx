import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import styles from './styles'; // Assuming you have a styles file

const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const order_url = 'https://mysite-j0w74rt5t-adi-ancelovits-projects.vercel.app/order';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(order_url, {
                    params: { status: ['new', 'in_process'] },
                });
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateProductStatus = async (orderId, productId, newStatus) => {
        try {
            await axios.put(`${order_url}/${orderId}/product/${productId}`, { productStatus: newStatus });
            alert(`Product status updated successfully to "${newStatus}"`);
            // Refresh orders locally
            const updatedOrders = orders.map((order) => {
                if (order._id === orderId) {
                    order.product = order.product.map((prod) =>
                        prod.productId === productId ? { ...prod, status: newStatus } : prod
                    );
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (err) {
            console.error('Error updating product status:', err);
            alert('Failed to update product status');
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`${order_url}/${orderId}`, { status: newStatus });
            alert(`Order status updated to "${newStatus}"`);
            // Refresh orders locally
            const updatedOrders = orders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);
        } catch (err) {
            console.error('Error updating order status:', err);
            alert('Failed to update order status');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Active Orders</h2>
                {orders.length > 0 ? (
                    orders.map((order) => {
                        const allProductsClosed = order.product.every((prod) => prod.status === 'close');
                        const createdDate = new Date(order.createdAt);

                        return (
                            <div
                                key={order._id}
                                style={{
                                    border: `2px solid ${allProductsClosed ? 'green' : '#ced4da'}`,
                                    padding: '10px',
                                    marginBottom: '20px',
                                }}
                            >
                                <p><strong>Order Status:</strong> {order.status}</p>
                                <p><strong>Customer ID:</strong> {order.customerId}</p>
                                <p>
                                    <strong>Created At:</strong> {createdDate.toLocaleDateString()} -{' '}
                                    {createdDate.toLocaleTimeString()}
                                </p>
                                {order.product.map((prod, index) => (
                                    <div key={index} className={styles.productDetails}>
                                        <p><strong>Product:</strong> {prod.productName}</p>
                                        <p><strong>Quantity:</strong> {prod.quantity}</p>
                                        <p><strong>Note:</strong> {prod.note}</p>
                                        <p><strong>Order Type:</strong> {prod.orderType}</p>
                                        <p><strong>Status:</strong> {prod.status}</p>
                                        <div>
                                            <button
                                                onClick={() =>
                                                    updateProductStatus(order._id, prod.productId, 'in_process')
                                                }
                                                style={{ marginRight: '10px' }}
                                            >
                                                In Process
                                            </button>
                                            <button
                                                onClick={() =>
                                                    updateProductStatus(order._id, prod.productId, 'close')
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                                {allProductsClosed && (
                                    <button
                                        onClick={() => updateOrderStatus(order._id, 'close')}
                                        style={{
                                            backgroundColor: 'green',
                                            color: 'white',
                                            padding: '10px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                        }}
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No active orders.</p>
                )}
            </div>
        </div>
    );
};

export default AllOrder;
