'use client'

import Image from "next/image";
import { CustomButton } from ".";

interface HeroProps {

}
export function Hero(props : HeroProps){
  function handleScroll(){

  }

    return(
        <div className="hero">
          <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">Encontre e alugue um carro 
             de forma rápida e fácil!
            </h1>

            <p className="hero__subtitle">
               Simplifique sua experiência de aluguel de carros.
            </p>

            <CustomButton
              title='Explorar carros'
              containerStyles="bg-primary-blue
              text-white rounded-full mt-10"
              handleClick={handleScroll}
            />
          </div>
          <div className="hero__image-container">
            <div className="hero__image">
              <Image src='/hero.png' alt="hero" 
              fill className="object-contain"/>
            </div>

              <div className="hero__image-overlay"/>
          </div>
        </div>
    )
}