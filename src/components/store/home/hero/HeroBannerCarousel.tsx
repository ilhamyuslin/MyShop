"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import styles from "./hero-banner.module.css";

export interface BannerSlide {
  id: number;
  tag: string;
  title: string;
  desc: string;
  btnText: string;
  btnLink: string;
  bgImage: string;
}

interface HeroBannerCarouselProps {
  slides: BannerSlide[];
}

export function HeroBannerCarousel({ slides }: HeroBannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Embla Carousel Hook
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Timer Ref mandiri khusus Hero Banner
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    resetTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, resetTimer]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (emblaApi) {
      emblaApi.scrollPrev();
      resetTimer();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (emblaApi) {
      emblaApi.scrollNext();
      resetTimer();
    }
  };

  const goToSlide = (idx: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(idx);
      resetTimer();
    }
  };

  return (
    <div className={styles.heroCarouselWrapper}>
      {/* Tombol Panah Hover (Ditaruh DI LUAR emblaRef agar DOM Embla murni dan tidak crash!) */}
      <button
        type="button"
        onClick={handlePrev}
        className={`${styles.heroSideArrow} ${styles.heroSideArrowPrev}`}
        aria-label="Banner sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className={`${styles.heroSideArrow} ${styles.heroSideArrowNext}`}
        aria-label="Banner berikutnya"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Viewport Murni Embla (First-child adalah track tunggal) */}
      <div className={styles.carouselViewport} ref={emblaRef}>
        <div className={styles.carouselTrack}>
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={styles.carouselSlide}
              style={{ backgroundImage: `url('${slide.bgImage}')` }}
            >
              <div className={styles.carouselOverlay} />
              <div className={styles.carouselContent}>
                <span className={styles.carouselTag}>{slide.tag}</span>
                <h2 className={styles.carouselTitle}>{slide.title}</h2>
                <p className={styles.carouselDesc}>{slide.desc}</p>
                <Link href={slide.btnLink} className={styles.carouselBtn}>
                  {slide.btnText} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indikator Garis Bawah */}
      <div className={styles.carouselControls}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goToSlide(idx)}
            className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ""}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

