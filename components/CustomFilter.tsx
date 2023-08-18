"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParms } from "@/utils";


export function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]); //Estado para armazenar a opção selecionada

  // atualize os parâmetros de pesquisa de URL e navegue até o novo URL
  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParms(title, e.value.toLowerCase());

    router.push(newPathName, {scroll: false});
  };

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); // Atualize a opção selecionada no estado
          handleUpdateParams(e); // Atualize os parâmetros de pesquisa de URL e navegue até o novo URL
        }}
      >
        <div className='relative w-fit z-10'>
          {/* Botão para o listbox */}
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' />
          </Listbox.Button>
          {/* Transição para exibir as options*/}
          <Transition
            as={Fragment} // agrupar vários elementos sem introduzir um nó DOM adicional, ou seja, <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {/* Mapeie as options e exiba-as como listbox options */}
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}