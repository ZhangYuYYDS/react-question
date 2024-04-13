import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, type FormProps } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Login_PathNAME } from '../router'

const { Title } = Typography

// 类型
type FieldType = {
  username?: string
  password?: string
  remember?: string
  confirm?: string
  nickname?: string
}

const Register: FC = () => {
  // 函数
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  // JSX
  return (
    <div className={styles.container}>
      {/* 标题 */}
      <div className={styles.title}>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册</Title>
        </Space>
      </div>

      {/* 表单 */}
      <div className={styles.form}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="确认密码"
            name="confirm"
            rules={[{ required: true, message: 'Please input your password again!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: 'Please input your nickname!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={Login_PathNAME}>已有账户，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
