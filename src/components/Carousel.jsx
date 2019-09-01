import React from 'react';
import './Carousel.scss';

const Carousel = ({ children }) => {
	const childrenCount = React.Children.count(children);

	return (
		<div>
			{Array.from({ length: childrenCount }, (x, i) => {
				return <a key={i} id={'component' + (i + 1)} />;
			})}

			<div id="links">
				{Array.from({ length: childrenCount }, (x, i) => {
					return (
						<a key={i} href={'#component' + (i + 1)}>
							Component {i}
						</a>
					);
				})}
			</div>

			<div className="carousel">
				<div className="carousel__container">
					{React.Children.map(children, (child, i) => (
						<section
							key={i}
							id={i + 'component'}
							className="carousel__component"
						>
							{child}
						</section>
					))}
				</div>
			</div>
		</div>
	);
};

export default Carousel;
