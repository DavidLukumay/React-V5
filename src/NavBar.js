import React from 'react';
import { Link } from '@reach/router';
import { css } from '@emotion/core';

const NavBar = () => (
	<header
		css={css`
        background-color: #333;
        position: sticky;
        top: 0;
        z-index: 10;
      `}
	>
		<Link to="/">
			<span role="img" aria-label="logo">
				✨
			</span>
		</Link>
	</header>
);

export default NavBar;
