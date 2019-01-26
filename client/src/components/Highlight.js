import React from 'react';
import { PropTypes } from 'prop-types';
export const Highlight = ({ data, visibility, addFavorite, removeFavorite }) => {

	const color = {background: 'white', border: 'white', color: 'red'};

	const addToFavorites = () => {
		addFavorite(data);
	};

	const removeFromFavorites = () => {
		removeFavorite(data);
	};

	if (visibility.highlight) {
		return (
			<section id="book-highlight" 
							 aria-label="Area showing information about book selected from list">
				<h2>{data.title}</h2>
				<h3>{(data.authors) ? <span>by</span> : null}{data.authors}</h3>
				<p><img src={data.thumbnail} alt={data.title}/>{data.description}</p>
				<div>
					<span>{data.publisher}</span>
					<span>{data.publishedDate}</span>
				</div>
				<hr/>
				<div>
					{!visibility.favorites ? 
						<button onClick={() => addToFavorites()}> Favorite</button> : 
						<button style={color} onClick={() => removeFromFavorites()}> Remove</button>}
					{(data.price) ? <a href={data.purchase}> Buy ${data.price}</a> : null}
				</div>
			</section>
		)
	} else {
		return null;
	}
};


Highlight.propTypes = {
	data: PropTypes.object
}