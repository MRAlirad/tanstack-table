import { useState } from 'react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import TableCell from './TableCell';
import ActionCell from './ActionCell';
import FooterCell from './FooterCell';

const defaultData = [
	{
		studentId: 1111,
		name: 'Bahar Constantia',
		dateOfBirth: '1984-01-04',
		major: 'Computer Science',
	},
	{
		studentId: 2222,
		name: 'Harold Nona',
		dateOfBirth: '1961-05-10',
		major: 'Communications',
	},
	{
		studentId: 3333,
		name: 'Raginolf Arnulf',
		dateOfBirth: '1991-10-12',
		major: 'Business',
	},
	{
		studentId: 4444,
		name: 'Marvyn Wendi',
		dateOfBirth: '1978-09-24',
		major: 'Psychology',
	},
];

const columnHelper = createColumnHelper();
const columns = [
	columnHelper.accessor('studentId', {
		header: 'Student ID',
		cell: TableCell,
		meta: {
			type: 'number',
		},
	}),
	columnHelper.accessor('name', {
		header: 'Full Name',
		cell: TableCell,
		meta: {
			type: 'text',
		},
	}),
	columnHelper.accessor('dateOfBirth', {
		header: 'Date of Birth',
		cell: TableCell,
		meta: {
			type: 'date',
		},
	}),
	columnHelper.accessor('major', {
		header: 'Major',
		cell: TableCell,
		meta: {
			type: 'text',
		},
	}),
	columnHelper.display({
		id: 'edit',
		cell: ActionCell,
	}),
];

const Table = () => {
	const [data, setData] = useState(() => [...defaultData]);
	const [originalData, setOriginalData] = useState(() => [...defaultData]);
	const [editedRows, setEditedRows] = useState({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			editedRows,
			setEditedRows,
			revertData: (rowIndex, revert) => {
				if (revert) {
					setData(old =>
						old.map((row, index) => (index === rowIndex ? originalData[rowIndex] : row))
					);
				} else {
					setOriginalData(old =>
						old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
					);
				}
			},
			updateData: (rowIndex, columnId, value) => {
				setData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex],
								[columnId]: value,
							};
						}
						return row;
					})
				);
			},
			addRow: () => {
				const newRow = {
					studentId: Math.floor(Math.random() * 10000),
				};
				const setFunc = old => [...old, newRow];
				setData(setFunc);
				setOriginalData(setFunc);
			},
			removeRow: rowIndex => {
				const setFilterFunc = old => old.filter((_row, index) => index !== rowIndex);
				setData(setFilterFunc);
				setOriginalData(setFilterFunc);
			},
		},
	});

	return (
		<table>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<th
						colSpan={table.getCenterLeafColumns().length}
						align="right"
					>
						<FooterCell table={table} />
					</th>
				</tr>
			</tfoot>
		</table>
	);
};

export default Table;
