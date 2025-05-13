import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Sample carousel items with captions
const carouselItems = [
    {
        image: "/assets/carousel1.jpg",
        alt: "Carousel image 1",
        title: "Welcome to Our Platform",
        description: "Discover amazing features and services",
    },
    {
        image: "/assets/carousel2.png",
        alt: "Carousel image 2",
        title: "Explore New Possibilities",
        description: "Find what you need with our intuitive interface",
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
                                 autoPlayInterval = 5000,
                                 showControls = true,
                                 showIndicators = true,
                                 showCaptions = true,
                                 className,
                             }: HeroCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Handle auto-play functionality
    useEffect(() => {
        if (!api || !autoPlay) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [api, autoPlay, autoPlayInterval]);

    // Track the current slide
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrentSlide(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        // Initial call to set the current slide
        onSelect();

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    // Handle indicator click
    const scrollToSlide = (index: number) => {
        api?.scrollTo(index);
    };

    return (
        <div className={cn("relative", className)}>
            <Carousel
                className="w-full max-w-6xl mx-auto"
                setApi={setApi}
                opts={{
                    align: "center",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <div
                                    className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.4/1] overflow-hidden rounded-xl group"
                                    style={{ backgroundColor: "#f3f4f6" }} // Fallback background color
                                >
                                    <img
                                        src={item.image}
                                        alt={item.alt}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />

                                    {showCaptions && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                                            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                                            <p className="text-sm md:text-base opacity-90">{item.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/*{showControls && (*/}
                {/*    <>*/}
                {/*        <CarouselPrevious className="left-4 lg:left-8" />*/}
                {/*        <CarouselNext className="right-4 lg:right-8" />*/}
                {/*    </>*/}
                {/*)}*/}
            </Carousel>

            {showIndicators && (
                <div className="flex justify-center gap-2 mt-4">
                    {carouselItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                currentSlide === index
                                    ? "bg-primary w-6"
                                    : "bg-gray-300 hover:bg-gray-400"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}