import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Pagination, Button } from 'antd';
export default function Home() {
  let [task, setTask] = useState([])
  const [pageInfo, setPageInfo] = useState({
    total: 10,
    pageSize: 5,
    page: 1
  })
  const nav = useNavigate()
  useEffect(() => {
    var config = {
      method: 'get',
      url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=${pageInfo.page}&pagination[pageSize]=${pageInfo.pageSize}&sort[0]=id:desc`
    }
    axios(config)
      .then(function (res) {
        let list = res?.data?.data
        setTask(list)
        setPageInfo({
          ...pageInfo,
          total: res?.data?.meta?.pagination?.total
        })
      })
  }, [pageInfo.page, pageInfo.pageSize])
  return (
    <div>
      <h2>Danh sach Task:</h2>
      <Pagination defaultCurrent={1} total={pageInfo.total} page={pageInfo.page} pageSize={pageInfo.pageSize}
        onChange={(trang, size) => {
          setPageInfo({
            ...pageInfo,
            pageSize: size,
            page: trang
          })
        }}
      />
      {task.map(item => {
        {
          return <h4 key={item.id}>
            Task {item.id}: {item.attributes.title}
            
            <Button type="dashed" onClick={() => {
              nav(`/chi-tiet/${item.id}`)
            }}>Chi tiết</Button>
          </h4>
        }
      })}
   
    </div>
  )
}