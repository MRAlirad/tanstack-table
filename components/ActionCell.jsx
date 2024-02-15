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
	const removeRow = () => {
		meta?.removeRow(row.index);
	};

	return (
		<div className="edit-cell-container">
			{meta?.editedRows[row.id] ? (
				<div className="edit-cell-action">
					<button
						onClick={setEditedRows}
						name="cancel"
					>
						⚊
					</button>
					<button
						onClick={setEditedRows}
						name="done"
					>
						✔
					</button>
				</div>
			) : (
				<div className="edit-cell-action">
					<button
						onClick={setEditedRows}
						name="edit"
					>
						✐
					</button>
					<button
						onClick={removeRow}
						name="remove"
					>
						X
					</button>
				</div>
			)}
		</div>
	);
};

ActionCell.propTypes = {
	row: PropTypes.object,
	table: PropTypes.object,
};

export default ActionCell;
