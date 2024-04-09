import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoIcon } from 'lucide-react'
import React from 'react'

export const InfoDisableInput = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={2}>
        <TooltipTrigger asChild>
          <InfoIcon size={12} />
        </TooltipTrigger>
        <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
          Dê um duplo clique sobre o nome do input, para habilitar/desabilitar a
          edição.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
