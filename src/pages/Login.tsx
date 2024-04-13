import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, type FormProps } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Login_PathNAME, Register_PathNAME } from '../router'

const { Title } = Typography

// 类型
type FieldType = {
  username?: string
  password?: string
  remember?: string
  nickname?: string
  confirm?: string
}
const USERNAME_KET = 'username'
const PASSWORD_KEY = 'password'

const Login: FC = () => {
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUser()
    form.setFieldValue('username', username)
    form.setFieldValue('password', password)
  }, [])
  // 函数
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values)
    const { username, password, remember } = values || {}
    if (remember && username && password) {
      rememberUser(username, password)
    } else {
      deleteUser()
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  // 将用户名和密码存到浏览器中
  const rememberUser = (username: string, password: string) => {
    localStorage.setItem(USERNAME_KET, username)
    localStorage.setItem(PASSWORD_KEY, password)
  }

  // 忘记用户名和密码
  const deleteUser = () => {
    localStorage.removeItem(USERNAME_KET)
    localStorage.removeItem(PASSWORD_KEY)
  }

  // 获取用户名和密码
  const getUser = () => {
    return {
      username: localStorage.getItem(USERNAME_KET),
      password: localStorage.getItem(PASSWORD_KEY),
    }
  }

  // JSX
  return (
    <div className={styles.container}>
      {/* 标题 */}
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>

      {/* 表单 */}
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType> label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space style={{ width: '200%' }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={Register_PathNAME}>没有账号，去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
