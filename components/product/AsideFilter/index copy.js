export default function AsideFilter() {
  return (
    <>
      <div className="p-4 pt-0">
        <div className="mb-2 fs-5">
          <i className="fa-solid fa-filter"></i> 條件篩選
        </div>
        <div className="d-flex flex-column gap-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            有貨
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            品牌
          </div>
          <hr className="opacity-75"></hr>
          <div className="mb-2 fs-5">
            <i className="fa-solid fa-dollar-sign"></i> 價錢篩選
          </div>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <input type="number" className="col-5" min="0"></input>
            <div className="col-2 fs-4 d-flex justify-content-center">~</div>
            <input type="number" className="col-5" min="0"></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '60%', margin: 'auto' }}
          >
            套用
          </button>
        </div>
      </div>
    </>
  )
}
