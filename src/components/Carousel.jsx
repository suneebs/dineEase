import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const categories = [
  "ALL",
  "Starters",
  "Main",
  "Juices",
  "Beverages",
  "Sides",
  "Salads",
  "Desserts",
  "Burgers",
  "Sandwiches",
];

export function CarouselSpacing({ setSelectedCategory }) {
  return (
    <div className="flex justify-center">
      <Carousel className="max-w-sm md:max-w-max">
        <CarouselContent className="-ml-1">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/3 md:basis-1/5">
              <div className="p-1">
                <Card
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)} // Update the selected category
                >
                  <CardContent className="flex items-center justify-center p-3">
                    <span className="font-semibold">{category}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
