import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TableCell = ({ getValue, row, column, table }) => {
	const initialValue = getValue();
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const onBlur = () => {
		table.options.meta?.updateData(row.index, column.id, value);
	};

	return (
		<input
			value={value}
			type={column.columnDef.meta?.type}
			onBlur={onBlur}
			onChange={e => setValue(e.target.value)}
		/>
	);
};

TableCell.propTypes = {
	getValue: PropTypes.func,
	table: PropTypes.object,
	row: PropTypes.object,
	column: PropTypes.object,
};

export default TableCell;
