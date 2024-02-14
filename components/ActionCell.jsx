import PropTypes from 'prop-types';

const ActionCell = ({ row, table }) => {
	const meta = table.options.meta;
	const setEditedRows = e => {
		const elName = e.currentTarget.name;
		meta?.setEditedRows(old => ({
			...old,
			[row.id]: !old[row.id],
		}));
		if (elName !== 'edit') {
			meta?.revertData(row.index, e.currentTarget.name === 'cancel');
		}
	};

	return meta?.editedRows[row.id] ? (
		<>
			<button
				onClick={setEditedRows}
				name="cancel"
			>
				X
			</button>
			<button
				onClick={setEditedRows}
				name="done"
			>
				✔
			</button>
		</>
	) : (
		<button
			onClick={setEditedRows}
			name="edit"
		>
			✐
		</button>
	);
};

ActionCell.propTypes = {
	row: PropTypes.object,
	table: PropTypes.object,
};

export default ActionCell;
