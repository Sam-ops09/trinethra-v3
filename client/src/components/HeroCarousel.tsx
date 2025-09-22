import { useEffect, useState, useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Sample carousel items with captions (could be externalized later)
const carouselItems = [
    {
        image: "/assets/carousel1.jpg",
        alt: "Defense technology engineering visualization",
        title: "Mission-Ready Technology",
        description: "Rugged, secure and high-performance systems engineered for extreme environments.",
    },
    {
        image: "/assets/carousel2.png",
        alt: "Edge compute and secure storage platforms showcase",
        title: "Edge Compute & Secure Data",
        description: "Enabling tactical superiority with modular AI inference and encrypted storage.",
    },
];

interface HeroCarouselProps {
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
    showCaptions?: boolean;
    className?: string;
}

export function HeroCarousel({
                                 autoPlay = true,
                                 autoPlayInterval = 6000,
                                 showControls = true,
                                 showIndicators = true,
                                 showCaptions = true,
                                 className,
                             }: HeroCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const prefersReducedMotion = usePrefersReducedMotion();
    const intervalRef = useRef<number | null>(null);

    // Auto-play logic respecting reduced motion
    useEffect(() => {
        if (!api || !autoPlay || prefersReducedMotion) return;
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            api.scrollNext();
        }, autoPlayInterval);
        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [api, autoPlay, autoPlayInterval, prefersReducedMotion]);

    // Track current slide
    useEffect(() => {
        if (!api) return;
        const onSelect = () => setCurrentSlide(api.selectedScrollSnap());
        api.on("select", onSelect);
        onSelect();
        return () => { api.off("select", onSelect); };
    }, [api]);

    const scrollToSlide = (index: number) => api?.scrollTo(index);

    return (
        <div
            className={cn("relative", className)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured technology solutions"
        >
            <Carousel
                className="w-full max-w-7xl mx-auto"
                setApi={setApi}
                opts={{ align: "center", loop: true }}
            >
                <CarouselContent>
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <figure
                                    className="relative aspect-[16/9] xs:aspect-[5/3] sm:aspect-[2/1] lg:aspect-[2.4/1] overflow-hidden rounded-xl group bg-gradient-to-br from-forest/40 via-navy/40 to-charcoal/30"
                                >
                                    {/* Image with graceful loading */}
                                    <ImageWithPlaceholder
                                        src={item.image}
                                        alt={item.alt}
                                        priority={index === 0}
                                    />
                                    {showCaptions && (
                                        <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 sm:p-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                                            <h2 className="heading-clamp-2 font-condensed font-bold mb-2 drop-shadow-sm text-balance">
                                                {item.title}
                                            </h2>
                                            <p className="max-w-2xl text-sm sm:text-base md:text-lg opacity-90 text-balance">
                                                {item.description}
                                            </p>
                                        </figcaption>
                                    )}
                                </figure>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {showControls && (
                    <>
                        <CarouselPrevious className="hidden md:flex left-4 lg:left-6" aria-label="Previous slide" />
                        <CarouselNext className="hidden md:flex right-4 lg:right-6" aria-label="Next slide" />
                    </>
                )}
            </Carousel>

            {showIndicators && (
                <div className="flex justify-center gap-2 mt-4" aria-label="Slide indicators">
                    {carouselItems.map((_, index) => {
                        const active = currentSlide === index;
                        return (
                            <button
                                key={index}
                                onClick={() => scrollToSlide(index)}
                                className={cn(
                                    "h-2.5 rounded-full transition-all duration-300 focus-ring",
                                    active ? "bg-teal w-6" : "bg-gray-300 hover:bg-gray-400 w-2.5"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={active}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* Hook to detect prefers-reduced-motion */
function usePrefersReducedMotion() {
    const [prefers, setPrefers] = useState(false);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setPrefers(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);
    return prefers;
}

/* Progressive image component */
interface ImgProps { src: string; alt: string; priority?: boolean; }
function ImageWithPlaceholder({ src, alt, priority }: ImgProps) {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            <div className={cn("absolute inset-0 bg-cream/20 skeleton", loaded && "hidden")}/>
            <img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setLoaded(true)}
                className={cn(
                    "w-full h-full object-cover transition-transform duration-[6000ms] ease-linear group-hover:scale-105",
                    loaded ? "opacity-100" : "opacity-0"
                )}
                draggable={false}
            />
        </>
    );
}