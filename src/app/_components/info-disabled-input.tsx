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
        <TooltipContent className="bg-slate-100/60 backdrop-blur-md border dark:bg-background text-gray-800 dark:text-gray-200 max-w-60">
          Dê um <strong className="text-emerald-600">duplo clique</strong> sobre
          o nome do input, para <span className="underline">habilitar</span> ou{' '}
          <span className="underline">desabilitar</span> edição.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
