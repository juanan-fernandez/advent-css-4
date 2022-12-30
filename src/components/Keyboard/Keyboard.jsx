import { useEffect, useState, useRef } from 'react';
import KeyItem from '../KeyItem/KeyItem';
import './Keyboard.css';
import { keysList1, keysList2, keysList3, keysList4 } from './keys.js';

const randomIntFromInterval = (min, max) => {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const Keyboard = () => {
	const getRandomIndex = () => {
		const randomArray = randomIntFromInterval(1, 4);
		if (randomArray === 1)
			return {
				randomArray,
				randomIdx: Math.floor(Math.random() * keysList1.length),
			};
		if (randomArray === 2)
			return {
				randomArray,
				randomIdx: Math.floor(Math.random() * keysList2.length),
			};
		if (randomArray === 3)
			return {
				randomArray,
				randomIdx: Math.floor(Math.random() * keysList3.length),
			};
		if (randomArray === 4)
			return {
				randomArray,
				randomIdx: Math.floor(Math.random() * keysList4.length),
			};
	};

	const [randomIndex, setRandomIndex] = useState(getRandomIndex());
	const indexRef = useRef(randomIndex);

	const getNewRandomIndex = () => {
		setRandomIndex(() => getRandomIndex());
	};

	useEffect(() => {
		document.addEventListener('keydown', onKeyDownHandler, true);
		return () => document.removeEventListener('keydown', onKeyDownHandler);
	}, []);

	useEffect(() => {
		indexRef.current = randomIndex;
		console.log('asigno indexref', indexRef);
	}, [randomIndex]);

	const row1 = keysList1.map((item, idx) => (
		<KeyItem
			keyval={item}
			bumping={randomIndex.randomArray === 1 && randomIndex.randomIdx === idx}
			newKey={getNewRandomIndex}
			key={`row-1${idx}`}
		/>
	));

	const row2 = keysList2.map((item, idx) => (
		<KeyItem
			keyval={item}
			bumping={randomIndex.randomArray === 2 && randomIndex.randomIdx === idx}
			newKey={getNewRandomIndex}
			key={`row-2${idx}`}
		/>
	));

	const row3 = keysList3.map((item, idx) => (
		<KeyItem
			keyval={item}
			bumping={randomIndex.randomArray === 3 && randomIndex.randomIdx === idx}
			newKey={getNewRandomIndex}
			key={`row-3${idx}`}
		/>
	));

	const row4 = keysList4.map((item, idx) => (
		<KeyItem
			keyval={item}
			bumping={randomIndex.randomArray === 4 && randomIndex.randomIdx === idx}
			newKey={getNewRandomIndex}
			key={`row-4${idx}`}
		/>
	));

	const onKeyDownHandler = ev => {
		const pressedKey = ev.key.toUpperCase();
		let recalcRandom = false;
		const { randomArray, randomIdx } = indexRef.current;
		console.log(indexRef.current);
		console.log(pressedKey);

		switch (randomArray) {
			case 1:
				if (keysList1[randomIdx] == pressedKey) recalcRandom = true;
				break;
			case 2:
				if (keysList2[randomIdx] == pressedKey) recalcRandom = true;
				break;
			case 3:
				if (keysList3[randomIdx] == pressedKey) recalcRandom = true;
				break;
			case 4:
				if (keysList4[randomIdx] == pressedKey) recalcRandom = true;
				break;
			default:
				console.log(randomIdx);
				break;
		}
		//teclas especiales
		if (pressedKey === 'DEAD' && randomArray === 1 && randomIdx === 0)
			recalcRandom = true;
		if (pressedKey === 'CAPSLOCK' && randomArray === 3 && randomIdx === 0)
			recalcRandom = true;
		if (pressedKey === 'BACKSPACE' && randomArray === 1 && randomIdx === 13)
			recalcRandom = true;

		if (recalcRandom) getNewRandomIndex();
		return;
	};

	return (
		<div className='keyboard'>
			<section className='row1'>{row1}</section>
			<section className='row1'>{row2}</section>
			<section className='row1'>{row3}</section>
			<section className='row1'>{row4}</section>
		</div>
	);
};

export default Keyboard;
