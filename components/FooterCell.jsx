import PropTypes from 'prop-types';

const FooterCell = ({ table }) => {
	const meta = table.options.meta;
	const selectedRows = table.getSelectedRowModel().rows;
	const removeRows = () => {
		meta.removeSelectedRows(table.getSelectedRowModel().rows.map(row => row.index));
		table.resetRowSelection();
	};

	return (
		<div className="footer-buttons">
			{selectedRows.length > 0 && (
				<button
					className="remove-button"
					onClick={removeRows}
				>
					Remove Selected x
				</button>
			)}
			<button onClick={() => meta?.addRow()}>Add Row +</button>
		</div>
	);
};

FooterCell.propTypes = {
	table: PropTypes.object.isRequired,
};

export default FooterCell;
