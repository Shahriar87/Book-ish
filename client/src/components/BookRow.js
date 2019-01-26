import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import React from 'react';
export const BookRow = ({rowNumber, title, author, rating, highlight}) => {

	// Scroll to the top of UI when user selects an entry
	const click = () => {
		highlight({
			highlight: rowNumber
		})
		Scroll.animateScroll.scrollTo(200);
	}

	return(
	<div onClick={click}>
			<span>{title}</span>
	</div>
	)
}

BookRow.propTypes ={
	title: PropTypes.string,
	author: PropTypes.string
}