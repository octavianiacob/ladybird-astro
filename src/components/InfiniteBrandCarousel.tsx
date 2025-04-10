import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/InfiniteBrandCarousel.scss";

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
	return <div></div>;
}
