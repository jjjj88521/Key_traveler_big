import React, { useState, useEffect } from 'react'

export default function Search() {
  const [searchCard, setSearchCard] = useState('')
  const handleSearch = (e) => {
    // console.log('搜尋關鍵字：', e.target.value)
    setSearchCard(e.target.value)
  }
  return (
    <>
      {/* 手機版搜尋欄 */}
      <nav className="navbar navbar-light bg-light d-sm-none mb-4">
        <div className="w-100">
          <form className="d-flex px-2">
            <input
              className="form-control flex-grow-1 me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </nav>
      {/* 左側 */}
      <div className="col-3  text-center d-sm-block d-none">
        {/* 搜尋欄 */}
        <nav className="navbar navbar-light bg-light mb-4">
          <div className="container-fluid">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchCard}
                onChange={handleSearch}
              />
              <button className="btn btn-outline-secondary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </nav>
      </div>
    </>
  )
}
