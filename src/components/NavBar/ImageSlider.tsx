"use client"
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import { SliderImages } from "@/config/TextData";

export default function ImageSlider({ sliderTime, className, url }: { sliderTime: number, className: string, url: string }) {
  const settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: sliderTime * 1000,
    autoplaySpeed: sliderTime * 1000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1104,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 896,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className={`${className} slider-container py-8 bg-white`}>
      <Slider {...settings}>
        {SliderImages.map((item: any, index: number) => {
          return (
            <div key={index} className="w-full">
              <Image
                src={`${url}${index + 1}).svg`}
                alt={item.alt}
                width={150}
                height={150}
                className="rounded-lg shadow-text_color-100 border-[1px] border-[#f7931a] shadow-[8px_8px_0px_0px_rgba(247,147,26)] mx-auto"
                priority // This sets the priority attribute
              />
            </div>
          )
        })
        }
      </Slider>
    </div>
  );
}

