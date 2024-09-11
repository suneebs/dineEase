import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSpacing() {
  return (
    <div className="flex justify-center">
        
        <Carousel className="max-w-sm">
        {/* flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/5 xl:w-1/4 p-2 */}
      <CarouselContent className="-ml-1">
        {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/6 lg:basis-1/5">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-3">
                  <span className="text-2xl font-semibold">{index + 1}</span>
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
