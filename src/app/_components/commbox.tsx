import React, { useState } from 'react'

interface AutoCompleteInputProps {
  suggestions: string[] // Array de sugestões de palavras
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  suggestions,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    // Filtrar sugestões baseado no que foi digitado
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredSuggestions(filtered)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setFilteredSuggestions([]) // Limpar sugestões ao selecionar uma
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Digite sua palavra aqui..."
      />
      <ul>
        {filteredSuggestions.map((suggestion) => (
          <li
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AutoCompleteInput
