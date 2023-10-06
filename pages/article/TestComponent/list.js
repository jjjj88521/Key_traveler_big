import React, { useState } from 'react'
import SearchBar from '@/components/article/SearchBar'
import DropdownMenu from '@/components/article/DropdownMenu'
import ListCard from '@/components/article/ListCard'

const List = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchCard, setSearchCard] = useState('')

  const handleSearch = (e) => {
    setSearchCard(e.target.value)
  }
  const data = [
    {
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Teach',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '組裝教學',
      date: '2023-09-21',
    },
    {
      title: 'Card Act',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '活動',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '活動',
      date: '2023-09-21',
    },
  ]

  return (
    <>
      <div className="container mt-sm-5 mt-3">
        <SearchBar searchCard={searchCard} handleSearch={handleSearch} />
        <DropdownMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ListCard
          data={data}
          selectedCategory={selectedCategory}
          searchCard={searchCard}
        />
      </div>
    </>
  )
}
export default List
