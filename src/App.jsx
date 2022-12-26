import { useState } from 'react';
import './App.css';

function App() {
	const characters = [...Array(95).keys()].map(i => String.fromCharCode(i + 32));
	return <div className='App'>{characters}</div>;
}

export default App;
