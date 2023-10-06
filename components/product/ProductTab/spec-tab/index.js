import React from 'react'
import { SpecTable, SpecItem } from './spec-table'

export default function SpecTab({ specTable }) {
  return (
    <SpecTable className={'py-4'}>
      {Object.entries(specTable).map(([key, value]) => (
        <SpecItem key={key} spec={key} value={value} />
      ))}
    </SpecTable>
  )
}
