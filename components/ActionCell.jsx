import PropTypes from 'prop-types';

const ActionCell = ({ row, table }) => {
	const meta = table.options.meta;
	const setEditedRows = () => {
		meta?.setEditedRows(old => ({
			...old,
			[row.id]: !old[row.id],
		}));
	};

	return meta?.editedRows[row.id] ? (
		<>
			<button>X</button> <button onClick={setEditedRows}>✔</button>
		</>
	) : (
		<button onClick={setEditedRows}>✐</button>
	);
};

ActionCell.propTypes = {
	row: PropTypes.object,
	table: PropTypes.object,
};

export default ActionCell;
