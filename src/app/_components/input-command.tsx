'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
export const descriptions = [
  'CONTRATO',
  'DISTRATO',
  'ADITIVO',
  'VISTORIA',
  'CITACAO',
  'PROCURACAO',
  'CARTA_DE_CITACAO',
  'MANDADO_DE_CITACAO',
  'MANDADO_DE_INTIMACAO',
  'INTIMACAO',
  'NOTIFICACAO_JUDICIAL',
  'NOTIFICACAO_EXTRAJUDICIAL',
  'COMPROVANTE_DE_IPTU',
  'CARTA_PREPOSTO',
  'MANDADO_DE_CITACAO_E_INTIMACAO',
  'CARTA_DE_CITACAO_E_INTIMACAO',
  'MANDADO_AUDIENCIA',
  'ALTERACAO_DE_VENCIMENTO',
  'ALTERACAO_DE_ENDERECO',
  'ATUALIZACAO_DE_ESTADO_CIVIL',
  'ACORDO',
  'TCD',
  'DEMARCACAO',
  'CESSAO_DE_DIREITOS',
  'TERMO_DE_QUITACAO',
  'REFINANCIAMENTO',
  'IPTU',
  'DOCUMENTOS_PESSOAIS',
  'DEMONSTRATIVO_DE_PAGAMENTOS',
  'ANALISE_DE_CREDITO',
  'APROVACAO_COMERCIAL',
  'AR',
  'ATA_DE_AUDIENCIA',
  'ATA_DE_CONDOMINIO',
  'AUTORIZACAO_PARA_CONSTRUCAO',
  'CARTA_DE_DESISTENCIA',
  'CARTA_DE_DESPACHO',
  'CARTA_DE_INTIMACAO',
  'CONTRATO_DE_SERVICO',
  'DECLARACAO_DE_VERACIDADE',
  'DESPACHO',
  'DOCUMENTOS_PJ',
  'DOSSIE',
  'EDITAL',
  'ESCRITURA',
  'FINANCIAMENTO_BANCARIO',
  'LAUDO',
  'LIMINAR',
  'NOTIFICACAO',
  'NOTIFICACAO_PROCON',
  'PROCESSO_JUDICIAL',
  'PROPOSTA',
  'PROTOCOLO',
  'PROTOCOLO_ENTREGA_DE_CONTRATO',
  'SENTENCA_JUDICIAL',
]

export function InputCommand() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const sortedDescriptions = descriptions.sort((a, b) => a.localeCompare(b))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onFocus={() => setOpen(true)}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? sortedDescriptions.find((framework) => framework === value)
            : 'Select framework...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            {sortedDescriptions.map((framework) => (
              <CommandItem
                key={framework}
                value={framework}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {framework}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
