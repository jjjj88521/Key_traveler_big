import React from 'react'

const SpecTable = ({ children, className }) => {
  return (
    <div className={className}>
      <table className="table">
        <thead>
          <tr className="">
            <th className="bg-primary text-white">規格</th>
            <th className="bg-primary text-white">說明</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

const SpecItem = ({ spec, value }) => {
  return (
    <tr>
      <td>{spec}</td>
      <td>
        {value.split('<br>').map((item, index) => (
          <p className="mb-0" key={index}>
            {item}
          </p>
        ))}
      </td>
    </tr>
  )
}

export { SpecTable, SpecItem }
