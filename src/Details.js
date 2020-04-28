import React, {lazy} from 'react';
import { navigate } from '@reach/router';
// import Modal from './Modal';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import moment from 'moment'
import _ from 'lodash'

const Modal = lazy(() => import("./Modal"));

console.log(_,moment)
class Details extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = { loading: true };
	// }
	state = { loading: true, showModal: false };

	componentDidMount() {
		// throw new Error('dff');
		pet
			.animal(+this.props.id)
			.then(({ animal }) => {
				this.setState({
					url: animal.url,
					name: animal.name,
					animal: animal.type,
					location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
					description: animal.description,
					media: animal.photos,
					breed: animal.breeds.primary,
					loading: false
				});
			})
			.catch((err) => this.setState({ error: err }));
	}

	toggleModal = () => this.setState({ showModal: !this.state.showModal });
	adopt = () => navigate(this.state.url);
	render() {
		if (this.state.loading) {
			return <h1>loading … </h1>;
		}

		const { animal, breed, location, description, media, name, showModal } = this.state;

		return (
			<div className="details">
				<Carousel media={media} />
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} — ${breed} — ${location}`}</h2>
					<ThemeContext.Consumer>
					{([theme]) => ( //destructuring
							// console.log(themeHook)
							<button 
								style={{ backgroundColor: theme }}
								onClick={this.toggleModal}
							>
								Adopt {name}
							</button>
					    )}
					</ThemeContext.Consumer>
					<p>{description}</p>
					{showModal ? (
						<Modal>
							<div>
								<h1>Would you like to adopt {name}?</h1>
							</div>
							<div className="buttons">
								<button onClick={this.adopt}>Yes</button>
								<button onClick={this.toggleModal}>No, I am a monster</button>
							</div>
						</Modal>
					) : null}
				</div>
			</div>
		);
	}
}

export default function DetailsWithErrorBoundary(props) {
	return (
		<ErrorBoundary>
			<Details {...props} />
		</ErrorBoundary>
	);
}

// <pre>
// 	<code>{JSON.stringify(props, null, 4)}</code>
// </pre>
