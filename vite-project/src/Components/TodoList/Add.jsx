import { Button, Form, Input, Switch, DatePicker, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Add = () => {
  const nav = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();


  const onFinish = (values) => {
    let date = values.date.format('YYYY-MM-DD')
    let data = JSON.stringify({
      "data": {
        ...values,
        date
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://backoffice.nodemy.vn/api/tasks',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzcsImlhdCI6MTY4NDgyOTQ3NCwiZXhwIjoxNjg3NDIxNDc0fQ.SJpfuryw4zXjbeCSj6vrSd6J8w9IKVUADTUKRDR3yC8'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        messageApi.open({
          type: 'success',
          content: `Thêm task ${values.title} thành công`,

        });
        setTimeout(() => {
          window.location.href = '/home';
        }, 2000);
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: 'Thua, hết cứu!!!',
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const configDeadline = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Chọn giờ đi bro!!!',
      },
    ],
  };
  return (
    <>
      {contextHolder}
      <Form
        className='add-form'
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{

        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Task"
          name="title"
          rules={[
            {
              required: true,
              message: 'Vui lòng không bỏ trống!!!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Form.Item name="complete" label="Trạng thái" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="date" label="Deadline:" {...configDeadline}>
            <DatePicker />
          </Form.Item>
          <Button type="primary" htmlType="submit" >
            Thêm task
          </Button>
        </Form.Item>

      </Form>
    </>
  )
};
export default Add;