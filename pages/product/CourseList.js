import React, { useEffect } from 'react'
// import data from '@/data/course/course.json'
import Card from './Card'
import Pagination from './Pagination'
import { BreadCrumbs } from './BreadCrumbs'
import CourseFetcher from './course-fetch'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function CourseList() {
  const [data, setData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  //--------------------------------pagination
  const itemsPerPage = 9
  const totalItems = data ? data.courses : []
  const totalPages = Math.ceil(totalItems.length / itemsPerPage)
  useEffect(() => {}, [data, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      {data && data.courses && data.courses.length > 0 ? (
        <div>
          <h3 className="text-center mt-5">課程列表</h3>
          <BreadCrumbs />
          <ul className=" row row-cols-sm-3 flex-wrap list-unstyled">
            {totalItems
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((v, i) => {
                return (
                  <li
                    key={i}
                    className=" d-flex justify-content-center course-li"
                  >
                    <Card
                      // key={i}
                      name={v.course_name}
                      price={v.course_price}
                      start_date={v.course_start_date}
                      end_date={v.course_end_date}
                      description={v.course_description}
                      image={v.course_image}
                      id={v.course_id}
                    />
                  </li>
                )
              })}
          </ul>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}
      {/*onDataFetched 為第12行定義的 這邊存入onCourseFetched並帶到子元件*/}
      <CourseFetcher onCourseFetched={onDataFetched} />
    </>
  )
}
