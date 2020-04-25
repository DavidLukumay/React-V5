import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';

const SearchParams = () => {
	const [ location, updateLocation ] = useState('Seattle, WA');
	const [ breeds, updateBreeds ] = useState([]);
	const [ animal, AnimalDropdown ] = useDropdown('Animal', 'dog', ANIMALS);
	const [ breed, BreedDropdown, updateBreed ] = useDropdown('Breed', '', breeds);
	const [ pets, setPets ] = useState([]);

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
				console.log(apiBreeds);

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
				<button>Submit</button>
			</form>
		</div>
	);
};

export default SearchParams;
