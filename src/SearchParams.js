import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
	const [ location, updateLocation ] = useState('Seattle, WA');
	const [ breeds, updateBreeds ] = useState([]);
	const [ animal, AnimalDropdown ] = useDropdown('Animal', 'dog', ANIMALS);
	const [ breed, BreedDropdown, updateBreed ] = useDropdown('Breed', '', breeds);
	const [ pets, setPets ] = useState([]);
	const [ theme ] = useContext(ThemeContext);

	async function requestPets() {
		const { animals } = await pet.animals({
			location,
			breed,
			type: animal
		});

		setPets(animals || []);
	}

	useEffect(
		() => {
			updateBreeds([]);
			updateBreed('');
			pet.breeds(animal).then(({ breeds: apiBreeds }) => {
				// console.log(apiBreeds);

				const breedStrings = apiBreeds.map(({ name }) => name); // from breed object or map((breedObj) => breedObj.name)
				updateBreeds(breedStrings);
			}, console.error);
		},
		[ animal, updateBreed ]
	);

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						placeholder="Location"
						onChange={(event) => updateLocation(event.target.value)}
					/>
				</label>
				<AnimalDropdown />
				<BreedDropdown />
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;
