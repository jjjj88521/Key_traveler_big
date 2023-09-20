import Link from 'next/link'
import React from 'react'
import { Divider, Space, Tag } from 'antd'

export default function Article() {
  const fontColor = {
    color: 'red',
    fontSize: '100px',
  }
  return (
    <>
      <div>Article</div>
      <h1 style={fontColor}>kkkkk</h1>
      <button className="btn text-danger">btn</button>
      <div className="container">
        <div className="row">
          <div className="col-3 text-center">側邊搜尋欄</div>
          <div className="col ">
            <div className="row mb-4">
              <div className="col">
                <div class="card">
                  <Link href="#">
                    <img
                      src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                  </Link>

                  <div class="card-body bg-light">
                    <h3 class="card-title mb-3">Card title</h3>
                    {/* <a
                      href="#"
                      class="btn btn-sm btn-primary rounded-pill mb-3 text-white fw-bold"
                    ></a> */}
                    <Link href={'#'}>
                      <Tag className="bg-primary text-white fw-bolder mb-3">
                        公告
                      </Tag>
                    </Link>

                    <p class="card-date">發布日期:</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
