import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles'; // Assuming you have a styles file

const Bar = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateProductStatus = async (orderId, productId, newStatus) => {
        try {
            await axios.put(`https://mysite-j0w74rt5t-adi-ancelovits-projects.vercel.app/order/${orderId}/product/${productId}`, {
                productStatus: newStatus,
            });

            // Update the local state to reflect the new status
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? {
                              ...order,
                              product: order.product.filter(
                                  (product) => product.productId !== productId || newStatus !== 'close'
                              ).map((product) =>
                                  product.productId === productId
                                      ? { ...product, status: newStatus }
                                      : product
                              ),
                          }
                        : order
                )
            );
        } catch (err) {
            console.error('Error updating product status:', err);
            alert('Failed to update product status. Please try again.');
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersResponse = await axios.get('https://mysite-j0w74rt5t-adi-ancelovits-projects.vercel.app/order');
                const allOrders = ordersResponse.data;

                const barOrders = allOrders
                    .map((order) => {
                        const barProducts = order.product.filter(
                            (product) => product.orderType === 'bar' && product.status !== 'close'
                        );
                        return { ...order, product: barProducts };
                    })
                    .filter((order) => order.product.length > 0);

                setOrders(barOrders);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Bar Orders</h2>
            {orders.length === 0 ? (
                <p>No bar orders to display.</p>
            ) : (
                <ul className={styles.orderList}>
                    {orders.map((order, index) => (
                        <li key={index} className={styles.orderItem}>
                            <h3>Order ID: {order._id}</h3>
                            {order.product.map((product, productIndex) => (
                                <div key={productIndex} className={styles.productDetails}>
                                    <p>
                                        <strong>Product:</strong> {product.productName}
                                    </p>
                                    <p>
                                        <strong>Quantity:</strong> {product.quantity}
                                    </p>
                                    <p>
                                        <strong>Note:</strong> {product.note}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {product.status}
                                    </p>
                                    <button
                                        className={styles.button}
                                        onClick={() =>
                                            updateProductStatus(order._id, product.productId, 'in_process')
                                        }
                                    >
                                        Mark as In Process
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={() =>
                                            updateProductStatus(order._id, product.productId, 'close')
                                        }
                                    >
                                        Mark as Closed
                                    </button>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Bar;
