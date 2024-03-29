import PropTypes from 'prop-types';

const ActionCell = ({ row, table }) => {
	const meta = table.options.meta;
	const validRow = meta?.validRow[row.id];
	const disabledSubmit = validRow ? Object.values(validRow)?.some(item => !item) : false;
	const setEditedRows = e => {
		const elName = e.currentTarget.name;
		meta?.setEditedRows(old => ({
			...old,
			[row.id]: !old[row.id],
		}));
		if (elName !== 'edit') {
			// meta?.revertData(row.index, e.currentTarget.name === 'cancel');
			e.currentTarget.name === 'cancel'
				? meta?.revertData(row.index)
				: meta?.updateRow(row.index);
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
						disabled={disabledSubmit}
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
			<input
				type="checkbox"
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
			/>
		</div>
	);
};

ActionCell.propTypes = {
	row: PropTypes.object,
	table: PropTypes.object,
};

export default ActionCell;
