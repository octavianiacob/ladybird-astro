import React, { useEffect } from "react";
import "../styles/InfiniteBrandCarousel.scss";

interface Brand {
	name: string;
	logo: string;
}

interface InfiniteBrandCarouselProps {
	brands: Brand[];
	speed?: number; // Speed factor (higher = faster)
}

const LogoSlider = ({ brands }: InfiniteBrandCarouselProps) => {
	useEffect(() => {
		const container = document.querySelector(".logos");
		const slide = document.querySelector(".logos-slide");
		if (slide && container) {
			const copy = slide.cloneNode(true);
			container.appendChild(copy);
		}
	}, []);

	return (
		<div className="logos">
			<div className="logos-slide">
				{brands.map((brand, index) => (
					<img key={index} src={brand.logo} alt={brand.name} />
				))}
			</div>
			<div className="logos-slide">
				{brands.map((brand, index) => (
					<img key={index} src={brand.logo} alt={brand.name} />
				))}
			</div>
			<div className="logos-slide">
				{brands.map((brand, index) => (
					<img key={index} src={brand.logo} alt={brand.name} />
				))}
			</div>
		</div>
	);
};

export default LogoSlider;
