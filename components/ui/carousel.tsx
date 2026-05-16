"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: "horizontal" | "vertical"
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("Carousel parts must be used inside <Carousel>")
  return ctx
}

type CarouselProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}

function Carousel({
  className,
  orientation = "horizontal",
  children,
  ...props
}: CarouselProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const update = React.useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    if (orientation === "horizontal") {
      setCanScrollPrev(el.scrollLeft > 1)
      setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    } else {
      setCanScrollPrev(el.scrollTop > 1)
      setCanScrollNext(el.scrollTop + el.clientHeight < el.scrollHeight - 1)
    }
  }, [orientation])

  React.useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    update()
    el.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [update])

  const scrollBy = React.useCallback(
    (direction: 1 | -1) => {
      const el = viewportRef.current
      if (!el) return
      const amount =
        orientation === "horizontal" ? el.clientWidth * 0.9 : el.clientHeight * 0.9
      el.scrollBy({
        [orientation === "horizontal" ? "left" : "top"]: amount * direction,
        behavior: "smooth",
      })
    },
    [orientation]
  )

  const value = React.useMemo<CarouselContextValue>(
    () => ({
      viewportRef,
      scrollPrev: () => scrollBy(-1),
      scrollNext: () => scrollBy(1),
      canScrollPrev,
      canScrollNext,
      orientation,
    }),
    [scrollBy, canScrollPrev, canScrollNext, orientation]
  )

  return (
    <CarouselContext.Provider value={value}>
      <div
        data-slot="carousel"
        data-orientation={orientation}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { viewportRef, orientation } = useCarousel()
  return (
    <div ref={viewportRef} className="overflow-hidden">
      <div
        data-slot="carousel-content"
        className={cn(
          "flex snap-x snap-mandatory",
          orientation === "horizontal"
            ? "flex-row -ml-4"
            : "flex-col -mt-4 snap-y",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full snap-start",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel()
  return (
    <Button
      variant="default"
      size="icon-sm"
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      className={cn(
        "absolute z-10",
        orientation === "horizontal"
          ? "top-1/2 -left-3 -translate-y-1/2"
          : "left-1/2 -top-3 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
    </Button>
  )
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext, orientation } = useCarousel()
  return (
    <Button
      variant="default"
      size="icon-sm"
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      className={cn(
        "absolute z-10",
        orientation === "horizontal"
          ? "top-1/2 -right-3 -translate-y-1/2"
          : "left-1/2 -bottom-3 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ChevronRightIcon className="size-4" />
    </Button>
  )
}

export {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
}
