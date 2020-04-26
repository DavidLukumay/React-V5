import React, { Component } from 'react';

export default class Carousel extends Component {
	state = {
		photos: [],
		active: 0
	};

	static getDerivedStateFromProps({ media }) {
		let photos = [ 'http://placecorgi.com/600/600' ];

		if (media.length) {
			photos = media.map(({ large }) => large);
		}

		return { photos };
	}

	handleIndexClick = (event) => {
		this.setState({
			active: +event.target.dataset.index //(+ --> turn it into a number eg (+'5'==5))
		});
	};

	render() {
		const { photos, active } = this.state;
		return (
			<div className="carousel">
				<img src={photos[active]} alt="animal" />
				<div className="carousel-smaller">
					{photos.map((photos, index) => (
						// eslint-disable-next-line
						<img
							key={photos}
							onClick={this.handleIndexClick}
							data-index={index}
							src={photos}
							className={index === active ? 'active' : ''}
						/>
					))}
				</div>
			</div>
		);
	}
}
