import React, { useState,lazy,Suspense } from 'react';
import { render } from 'react-dom';
import { Router,Link } from '@reach/router';
// import SearchParams from './SearchParams';
// import Details from './Details';
import ThemeContext from './ThemeContext';
// import NavBar from './NavBar';


const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
	const theme = useState('peru');
	return (
		<React.StrictMode>
			<ThemeContext.Provider value={theme}>
				<div>
					<header>
						<Link to="/">Adopt Me!</Link>
					</header>
					<Suspense fallback={<h1>loading route …</h1>}>
					<Router>
						<SearchParams path="/" />
						<Details path="/details/:id" />
					</Router>
					</Suspense>
				</div>
			</ThemeContext.Provider>
		</React.StrictMode>
	);
};

render(<App />, document.getElementById('root'));
