import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
const arr = [
  "ALL",
  "Starters",
  "Main",
  "Juices",
  "Beverages",
  "Sides",
  "Salads",
  "Desserts",
  "Burgers",
  "Sandwiches"];

export function CarouselSpacing() {
  return (
    <div className="flex justify-center">
        
        <Carousel className="max-w-sm md:max-w-max ">
        {/* flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/5 xl:w-1/4 p-2 */}
      <CarouselContent className="-ml-1">
        {arr.map((item, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/3 md:basis-1/5 ">
            <div className="p-1">
              <Card className="cursor-pointer">
                <CardContent className="flex items-center justify-center p-3">
                  <span className="font-semibold">{item}</span>
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
  )
}
