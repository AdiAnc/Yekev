import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles';

function Main() {
  const navigate = useNavigate();

  const centerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh', // Ensures the content takes up at least the full viewport height
    backgroundColor: '#f8f9fa', // Light background color for contrast
  };

  return (
    <div style={centerStyles}>
      <div style={styles.container}>
        
        
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate('/orders/NewOrders')}>New Order</button>
          <button style={styles.button} onClick={() => navigate('/orders/AllOrders')}>All Orders</button>
        </div>
      </div>
    </div>
  );
}

export default Main;