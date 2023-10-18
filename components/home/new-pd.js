import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Card from '../product/Card'

export default function NewPd() {
  const [newProducts, setNewProducts] = useState([])
  useEffect(() => {
    axios
      .get(
        'http://localhost:3005/api/products/qs?orderby=created_time,desc&perpage=4'
      )
      .then((res) => {
        setNewProducts(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  // console.log(newProducts)
  return (
    <section className={''}>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center">
          <h2 className="h1 text-center fw-bolder">New Products</h2>
          <div className="row w-100 py-3 row-cols-2 row-cols-sm-4">
            {newProducts.map((product) => {
              const images = JSON.parse(product.images)
              return (
                <div className="col pb-3" key={product.id}>
                  <Card
                    title={product.name}
                    brand={product.brand}
                    price={product.price}
                    image={`/images/product/${images[0]}`}
                    link={`/product/${product.category_1}/${product.category_2}/${product.id}`}
                    stock={product.stock}
                  />
                </div>
              )
            })}
          </div>
          <div className="w-50 py-3">
            <Link
              href={'/product'}
              className="btn btn-outline-primary btn-lg rounded-0 w-100"
              type="button"
            >
              Show more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
