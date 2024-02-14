import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TableCell = ({ getValue, row, column, table }) => {
	const initialValue = getValue();
	const columnMeta = column.columnDef.meta;
	const tableMeta = table.options.meta;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const onBlur = () => {
		tableMeta?.updateData(row.index, column.id, value);
	};

	if (tableMeta?.editedRows[row.id])
		return (
			<input
				value={value}
				type={columnMeta?.type}
				onBlur={onBlur}
				onChange={e => setValue(e.target.value)}
			/>
		);
	return <span>{value}</span>;
};

TableCell.propTypes = {
	getValue: PropTypes.func,
	table: PropTypes.object,
	row: PropTypes.object,
	column: PropTypes.object,
};

export default TableCell;
