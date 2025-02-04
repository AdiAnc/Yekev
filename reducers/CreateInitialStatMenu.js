import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read menu.txt and update initialState.json
function updateInitialState() {
  // Read the menu.txt file
  const filePath = path.join(__dirname, '../menu.txt');
  console.log('Looking for menu.txt at:', filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse the file content into an array of objects
  const initialState = fileContent.split('\n').map((line) => {
    const [name, price] = line.split(',');
    return { name: name.trim(), price: parseFloat(price.trim()) };
  });

  // Write the initial state to a JSON file
  const outputPath = path.join(__dirname, 'initialState.json');
  fs.writeFileSync(outputPath, JSON.stringify(initialState, null, 2));

  console.log('Initial state JSON generated:', initialState);
}

// Initial call to update the state
updateInitialState();

// Watch for changes in menu.txt
const filePath = path.join(__dirname, '../menu.txt');
fs.watch(filePath, (eventType) => {
  if (eventType === 'change') {
    console.log('Detected change in menu.txt, updating initialState.json...');
    updateInitialState();
  }
});
