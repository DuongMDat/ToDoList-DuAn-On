import { useEffect, useState } from "react";
import { Pagination } from 'antd'
import axios from "axios";
export default function NewHome() {
    let [task, setTask] = useState([])

    let [pageInfo, setPageInfo] = useState({
        total: 10,
        pageSize: 5,
        page: 1
    })
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
            <h1>Danh sach:</h1>
            {task.map(item => {
                return <h4 key={item.id}>
                    {item.attributes.title}

                </h4>
            })}
            <Pagination simple defaultCurrent={1} total={pageInfo.total} page={pageInfo.page} pageSize={pageInfo.pageSize}
                onChange={(trang, size) => {
                    setPageInfo({
                        ...pageInfo,
                        pageSize: size,
                        page: trang
                    })
                }} />
            <br />

        </div>
    )

}