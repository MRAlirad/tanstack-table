import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TableCell = ({ getValue, row, column, table }) => {
	const initialValue = getValue();
	const columnMeta = column.columnDef.meta;
	const tableMeta = table.options.meta;
	const [value, setValue] = useState(initialValue);
	const [validationMessge, setValidationMessage] = useState('');

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const onBlur = event => {
		tableMeta?.updateData(row.index, column.id, value);
		displayValidationMessage(event);
	};

	const displayValidationMessage = event => {
		if (columnMeta?.validate) {
			const isValid = columnMeta.validate(event.target.value);
			if (isValid) {
				event.target.setCustomValidity('');
				setValidationMessage('');
			} else {
				event.target.setCustomValidity(columnMeta.validationMessage);
				setValidationMessage(columnMeta.validationMessage);
			}
		} else if (event.target.validity.valid) setValidationMessage('');
		else setValidationMessage(event.target.validationMessage);
	};

	if (tableMeta?.editedRows[row.id])
		return (
			<input
				value={value}
				type={columnMeta?.type}
				onBlur={onBlur}
				onChange={e => setValue(e.target.value)}
				required={columnMeta?.required}
				pattern={columnMeta?.pattern}
				title={validationMessge}
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
