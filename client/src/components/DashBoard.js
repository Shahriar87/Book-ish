import PropTypes from 'prop-types';
import React from 'react';

export const DashBoard = ({type, query, queryObject}) => {
	
	let _type, _query;

	const submit = (e) => {
		e.preventDefault();
		queryObject({
			type: _type.value,
			query: _query.value
		});
	};

	return(
		<nav aria-label="Search Books" id="book-form">
		<header>
			<h1>Book-ish</h1>
		</header>
		<form onSubmit={submit}>
			<select aria-label="Search books by category"
						  defaultValue={type} 
						  ref={option => _type = option}>
				<option value="q=intitle:">Title</option>
				<option value="q=inauthor:">Author</option>
			</select>
			<input aria-label="Seach Box" 
			       type="text" 
			       defaultValue={query} 
			       ref={input => _query = input}
			       placeholder="Enter Names"
			       autoFocus/>
			<input type="submit"
						 value="Search"/>
		</form>
		</nav>
	)
}

DashBoard.propTypes = {
	type: PropTypes.string,
	query: PropTypes.string
};