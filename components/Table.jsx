import { useState } from 'react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import TableCell from './TableCell';

const defaultData = [
	{
		studentId: 1111,
		name: 'Bahar Constantia',
		dateOfBirth: '1984-01-04',
		major: 'Business',
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
		major: 'Business',
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
];

const Table = () => {
	const [data, setData] = useState(() => [...defaultData]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
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
		</table>
	);
};

export default Table;
