import './KeyItem.css';

const KeyItem = ({ keyval, bumping, newKey }) => {
	const getKeyStyle = () => {
		if (keyval === 'SHIFT') return 'key key4';
		if (keyval.length === 3) return 'key key2';
		if (keyval.length >= 4) return 'key key3';
		return 'key key1';
	};

	const onKeypress = () => {
		if (!bumping) return;
		newKey();
	};

	return (
		<div className={getKeyStyle()}>
			<button onClick={onKeypress} className={`key__button ${bumping ? 'bump' : ''}`}>
				{keyval}
			</button>
		</div>
	);
};

export default KeyItem;
