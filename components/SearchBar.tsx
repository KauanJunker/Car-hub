"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchManufacturer } from ".";



const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

export function SearchBar() {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Crie um novo objeto URLSearchParams usando os parâmetros de pesquisa de URL atuais
    const searchParams = new URLSearchParams(window.location.search);

    // Atualize ou exclua o parâmetro de pesquisa 'modelo' com base no valor 'modelo'
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Atualize ou exclua o parâmetro de pesquisa 'fabricante' com base no valor 'fabricante'
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
       searchParams.delete("manufacturer");
    }

    // Gere o novo nome de caminho com os parâmetros de pesquisa atualizados
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname, {scroll: false});
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item z-10'>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManuFacturer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

