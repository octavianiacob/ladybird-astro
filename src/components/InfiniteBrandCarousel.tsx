import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/InfiniteBrandCarousel.scss";
// import { Rerousel } from "rerousel";
// import Slider from "react-infinite-logo-slider";

interface Brand {
	name: string;
	logo: string;
}

interface InfiniteBrandCarouselProps {
	brands: Brand[];
	speed?: number; // Speed factor (higher = faster)
}

export default function InfiniteBrandCarousel({
	brands,
	speed = 5,
}: InfiniteBrandCarouselProps) {
	const carouselRef = useRef<HTMLDivElement>(null);
	const customerLogo = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (!carouselRef.current || brands.length === 0) return;

		const container = carouselRef.current;
		const items = Array.from(container.children) as HTMLDivElement[];
		const totalWidth = container.scrollWidth / 2; // Use half because of duplication

		gsap.set(container, { x: 0 });

		gsap.to(container, {
			x: -totalWidth, // Moves the full width of the first set of brands
			duration: 15 / speed, // Adjusts scrolling speed
			ease: "linear",
			repeat: -1,
			modifiers: {
				x: (x) => `${parseFloat(x) % totalWidth}px`, // Prevents jump
			},
		});
	}, [brands, speed]);

	return (
		// <div className="carousel-container">
		// 	<div className="carousel-track" ref={carouselRef}>
		// 		{[...brands, ...brands].map((brand, index) => (
		// 			<div key={`${brand.name}-${index}`} className="carousel-item">
		// 				<img src={brand.logo} alt={brand.name} />
		// 			</div>
		// 		))}
		// 	</div>
		// </div>

		<div>
			{/* <Slider
				width="250px"
				duration={40}
				pauseOnHover={true}
				blurBorders={false}
				blurBorderColor={"#fff"}
			>
				{brands.map((brand, index) => (
					<Slider.Slide key={`${brand.name}-${index}`}>
						<img src={brand.logo} alt={brand.name} />
					</Slider.Slide>
				))}
			</Slider> */}
		</div>
	);
}
