import React from 'react'
import Image from 'next/image'

export default function Profile() {
  return (
    <>
      <div className="container">
        <h2 className="fw-bolder">個人檔案</h2>
        <div className="row my-sm-5 my-3">
          {/* 手機板的avator */}
          <div className="avatar col-12  d-sm-none d-block">
            <p>
              一般會員
              <Image
                src="/images/only-logo.svg"
                alt="logo"
                width={25}
                height={12.5}
              />
            </p>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="avatar-img ">
                <Image
                  src="https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
                  alt=""
                  width={75}
                  height={75}
                  className="rounded-circle border border-primary"
                />
              </div>
              <button className="btn btn-primary text-white my-4">
                選擇圖片
              </button>
              <div className="text-group">
                <p className="fs-6 text-black-50 mb-0">檔案大小1MB</p>
                <p className="fs-6 text-black-50 mb-0">檔案限制: JPEG, PNG</p>
              </div>
            </div>
          </div>
          {/* 下拉選單記得要跟立軒要 */}
          <div className="user-sidebar col-3 d-none d-sm-block">下拉選單</div>
          {/* form表單 */}
          <form action="" className="col-12 col-sm-5">
            <label htmlFor="name" className="col-form-label ">
              姓名
            </label>
            <input type="text" id="name" name="name" className="form-control" />

            <label htmlFor="email" className="col-form-label mt-3">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
            />

            <label htmlFor="gender" className="col-form-label mt-3">
              性別
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              className="form-control"
            />

            <label htmlFor="address" className="col-form-label mt-3">
              地址
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
            />

            <label htmlFor="phone" className="col-form-label mt-3">
              手機
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
            />

            <div className="birthday mt-3">
              <label htmlFor="birthday" className="col-form-label">
                生日
              </label>
              <div className="input-group">
                {' '}
                <select
                  type="text"
                  id="year"
                  name="birthday"
                  value="year"
                  className="form-select"
                >
                  <option value="1990">1990</option>
                </select>
                <select
                  type="text"
                  id="month"
                  name="birthday"
                  value="07"
                  className="form-select"
                >
                  <option value="07">07</option>
                </select>
                <select
                  type="text"
                  id="day"
                  name="birthday"
                  value="26"
                  className="form-select"
                >
                  <option value="26">26</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary text-white col-sm-5 col-12 offset-sm-7 mt-5">
              儲存
            </button>
          </form>
          {/* 電腦版的avator */}
          <div className="avatar col-3 offset-1 d-sm-block d-none">
            <div className="d-flex flex-column align-items-center">
              {' '}
              <h4>會員等級</h4>
              <p>
                一般會員
                <Image
                  src="/images/only-logo.svg"
                  alt="logo"
                  width={25}
                  height={12.5}
                />
              </p>
              <div className="avatar-img ">
                <Image
                  src="https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
                  alt=""
                  width={150}
                  height={150}
                  className="rounded-circle border border-primary"
                />
              </div>
              <button className="btn btn-primary text-white my-4">
                選擇圖片
              </button>
              <p className="ps-3 mb-0 align-self-start text-black-50">
                檔案大小1MB
              </p>
              <p className="ps-3 align-self-start text-black-50">
                檔案限制: JPEG, PNG
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
