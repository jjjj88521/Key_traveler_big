import React, { useEffect, useState } from 'react'
import cityDataTotal from '@/data/taiwan-district-zip-code.json'
const cityData = cityDataTotal
// console.log(cityData)

export default function Address({ onAddressChange }) {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [tempAddressDetail, setTempAddressDetail] = useState('')

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
    setSelectedDistrict('')
  }
  useEffect(() => {
    if (selectedCity && selectedDistrict && addressDetail) {
      const newAddress = `${selectedCity}${selectedDistrict}${addressDetail}`
      console.log(newAddress)
      onAddressChange(newAddress)
    }
    // onAddressChange
  }, [selectedCity, selectedDistrict, addressDetail])

  return (
    <>
      {/* 手機板 */}
      <div className="d-sm-none">
        <div className="d-flex align-items-center">
          {/* <label htmlFor="cities">選擇城市：</label> */}
          <select
            id="cities"
            value={selectedCity}
            onChange={handleCityChange}
            className="form-control"
          >
            <option value="" disabled>
              請選擇城市
            </option>
            {cityData.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* <label htmlFor="districts">選擇行政區：</label> */}
          <select
            id="districts"
            value={selectedDistrict}
            onChange={(event) => {
              setSelectedDistrict(event.target.value)
            }}
            className="form-control ms-2"
          >
            <option value="" disabled>
              請選擇行政區
            </option>
            {selectedCity &&
              cityData
                .find((city) => city.name === selectedCity)
                .districts.map((district) => (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="memberAddr"
          className={`form-control`}
        ></input>
      </div>
      {/* 電腦版 */}
      <div className="d-sm-block d-none">
        <div className="d-flex">
          <div className="d-flex align-items-center">
            {/* <label htmlFor="cities">選擇城市：</label> */}
            <select
              id="cities"
              value={selectedCity}
              onChange={handleCityChange}
              className="form-control"
            >
              <option value="" disabled>
                請選擇城市
              </option>
              {cityData.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            {/* <label htmlFor="districts">選擇行政區：</label> */}
            <select
              id="districts"
              value={selectedDistrict}
              onChange={(event) => {
                setSelectedDistrict(event.target.value)
              }}
              className="form-control ms-2"
              style={{ width: '130px' }}
            >
              <option value="" disabled>
                請選擇行政區
              </option>
              {selectedCity &&
                cityData
                  .find((city) => city.name === selectedCity)
                  .districts.map((district) => (
                    <option key={district.name} value={district.name}>
                      {district.name}
                    </option>
                  ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="請填寫詳細地址"
            className={`form-control ms-2`}
            style={{ width: '465px' }}
            value={tempAddressDetail}
            onChange={(e) => setTempAddressDetail(e.target.value)}
            onBlur={() => setAddressDetail(tempAddressDetail)}
          ></input>
        </div>
      </div>
    </>
  )
}
