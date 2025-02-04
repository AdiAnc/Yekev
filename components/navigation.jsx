import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <button style={buttonStyle} onClick={() => navigate('/')}>Home</button>
            <button style={buttonStyle} onClick={() => navigate('/bar')}>Bar</button>
            <button style={buttonStyle} onClick={() => navigate('/kitchen')}>Kitchen</button>
            <button style={buttonStyle} onClick={() => navigate('/orders/NewOrders')}>New Orders</button>
            <button style={buttonStyle} onClick={() => navigate('/orders/AllOrders')}>All Orders</button>
        </div>
    );
};

export default Navigation;
