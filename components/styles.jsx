// styles.js
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ced4da',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: 'auto',
      minWidth: '900px',
      margin: '10px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#ffffff', // White background for content container
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center', // Center the buttons horizontally
      width: '100%', // Ensure buttons take up the full width of the container
      marginTop: '20px',
      padding: '10px',
    },
    button: {
      margin: '0 10px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#f2f2f2',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
    },

 
    section:{
        flex: 1,
        margin: '0 10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    box: {
      border: '1px solid #ddd', // Light border for the box
      borderRadius: '8px',      // Rounded corners
      padding: '16px',          // Padding inside each box
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
      backgroundColor: '#fff',  // White background for each box
  }
  
    
  };
  
  export default styles;
  