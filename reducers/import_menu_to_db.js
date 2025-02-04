import axios from 'axios';

const apiUrl = 'https://mysite-j0w74rt5t-adi-ancelovits-projects.vercel.app/menu';

const products = [
    { name: "הפוך", price: 13, handled_by: "bar" },
    { name: "אמריקנו", price: 10, handled_by: "bar" },
    { name: "אספרסו כפול", price: 9, handled_by: "bar" },
    { name: "אספרסו ארוך/קצר", price: 8, handled_by: "bar" },
    { name: "קפה קר", price: 16, handled_by: "bar" },
    { name: "אמריקנו קר", price: 13, handled_by: "bar" },
    { name: "שוקו", price: 10, handled_by: "bar" },
    { name: "מוגז/מיץ", price: 10, handled_by: "bar" },
    { name: "מים/סודה", price: 8, handled_by: "bar" },
    { name: "מאפה", price: 18, handled_by: "bar" },
  ];
  

// Function to send each record
async function sendRecords() {
  for (const product of products) {
    try {
      const response = await axios.post(apiUrl, product);
      console.log('Sent:', product, 'Response:', response.status);
    } catch (error) {
      console.error('Error sending record:', product, error.message);
    }
  }
}

// Send all records
sendRecords();
