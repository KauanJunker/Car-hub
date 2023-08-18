'use client'

import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import { CustomButton } from "."
import { updateSearchParms } from "@/utils"

export function ShowMore({ pageNumber, isNext }: ShowMoreProps){
  const router = useRouter()

 function handleNavigation() {
   const newLimit = (pageNumber + 1) * 10
   const newPathName = updateSearchParms('limit', `${newLimit}`)

   router.push(newPathName, {scroll: false})
 }

    return(
        <div className="w-full flex-center gap-5 mt-10">
          {!isNext && (
            <CustomButton
              title="Mostrar Mais"
              btnType="button"
              containerStyles="bg-primary-blue rounded-full text-white"
              handleClick={handleNavigation}
            />
          )}
        </div>
    )
}