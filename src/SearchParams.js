import React, { useState } from 'react';

const SearchParams = () => {
	const [ location, setlocation ] = useState('Seattle, WA');

	return (
		<div className="search-params">
			<form>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						placeholder="Location"
						onChange={(event) => setlocation(event.target.value)}
					/>
				</label>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default SearchParams;
