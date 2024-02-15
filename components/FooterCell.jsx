import PropTypes from 'prop-types';

const FooterCell = ({ table }) => {
	const meta = table.options.meta;

	return (
		<div className="footer-buttons">
			<button onClick={() => meta?.addRow()}>Add Row +</button>
		</div>
	);
};

FooterCell.propTypes = {
	table: PropTypes.object.isRequired,
};

export default FooterCell;
