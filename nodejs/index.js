import React from 'react';
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="index.html"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('index.html'));
root.render(<h1>Hello, world</h1>);