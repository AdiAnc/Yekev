import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import styles from './styles';

const Order = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        phone: '',
    });
    const [itemDetails, setItemDetails] = useState({});
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const menu_url = 'https://mysite-j0w74rt5t-adi-ancelovits-projects.vercel.app/menu';
    const customer_url = 'https://mysite-j0w74rt5t-adi-ancelovits-projects.vercel.app/customer';
    const order_url = 'https://mysite-j0w74rt5t-adi-ancelovits-projects.vercel.app/order';

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(menu_url);
                setMenuItems(response.data);

                const initialCheckedState = response.data.reduce((acc, item) => {
                    acc[item._id] = false;
                    return acc;
                }, {});

                // Set default quantity to 1 for each item
                const initialItemDetails = response.data.reduce((acc, item) => {
                    acc[item._id] = { amount: '1', note: '' };  // Default quantity set to '1'
                    return acc;
                }, {});

                setCheckedItems(initialCheckedState);
                setItemDetails(initialItemDetails);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await axios.get(order_url, {
                    params: { status: ['new', 'in_process'] },
                });
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchMenu();
        fetchOrders();
    }, []);

    const handleCustomerChange = (event) => {
        const { name, value } = event.target;
        setCustomerDetails({
            ...customerDetails,
            [name]: value,
        });
    };

    const handleCheckboxChange = (id) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: !prevCheckedItems[id],
        }));
    };

    const handleInputChange = (id, field, value) => {
        setItemDetails((prevDetails) => ({
            ...prevDetails,
            [id]: {
                ...prevDetails[id],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async () => {
        try {
            const customerResponse = await axios.post(customer_url, {
                name: customerDetails.name,
                phone: customerDetails.phone,
            });
            const customerId = customerResponse.data._id;

            const selectedItems = menuItems.filter((item) => checkedItems[item._id]);
            if (selectedItems.length === 0) {
                alert('Please select at least one product.');
                return;
            }

            const products = selectedItems.map((item) => ({
                productId: item._id,
                productName: item.name,
                quantity: parseInt(itemDetails[item._id]?.amount || '1', 10), // Use the quantity from itemDetails (default to 1)
                note: itemDetails[item._id]?.note || '',
                orderType: item.handled_by,
                status: 'new',
            }));

            const orderResponse = await axios.post(order_url, {
                product: products,
                customerId,
                status: 'new',
            });

            const orderId = orderResponse.data._id;

            await axios.put(`${customer_url}/${customerId}`, {
                orderId,
            });

            setOrders((prevOrders) => [orderResponse.data, ...prevOrders]);

            alert('Order placed successfully!');
        } catch (err) {
            console.error('Error processing the order:', err);
            alert('Failed to process the order.');
        }
    };

    const calculateTotalPrice = () => {
        return menuItems.reduce((total, item) => {
            if (checkedItems[item._id]) {
                const quantity = parseInt(itemDetails[item._id]?.amount || '1', 10); // Default quantity to 1
                total += (item.price || 0) * quantity;
            }
            return total;
        }, 0);
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
                <h2>Create New Order</h2>
                <label>
                    Customer Name:
                    <input
                        type="text"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleCustomerChange}
                    />
                </label>
                <br />
                <label>
                    Customer Phone:
                    <input
                        type="tel"
                        name="phone"
                        value={customerDetails.phone}
                        onChange={handleCustomerChange}
                    />
                </label>
                {menuItems.map((item) => (
                    <div key={item._id} className={styles.menuItem}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checkedItems[item._id] || false}
                                onChange={() => handleCheckboxChange(item._id)}
                            />
                            {item.name} - ${item.price}
                        </label>
                        {checkedItems[item._id] && (
                            <div className={styles.additionalFields}>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={itemDetails[item._id]?.amount || '1'} // Default to 1
                                    onChange={(e) =>
                                        handleInputChange(item._id, 'amount', e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Note"
                                    value={itemDetails[item._id]?.note || ''}
                                    onChange={(e) =>
                                        handleInputChange(item._id, 'note', e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </div>
                ))}
                <div className={styles.totalPrice}>
                    <strong>Total Price: ${calculateTotalPrice()}</strong>
                </div>
                <button onClick={handleSubmit} className={styles.submitButton}>
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default Order;
