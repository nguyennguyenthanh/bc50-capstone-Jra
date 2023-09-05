import { Layout, Space } from 'antd';
import LoginPage from './LoginPage';
import { useEffect, useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;

export default function UserLoginTemplate() {
  const [{ width, height }, setSize] = useState({ width: Math.round(window.innerWidth), height: Math.round(window.innerHeight) });
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight)
      })
    }
  }, [])
  return (
    <>
      <Layout>
        <Sider width={width / 1.6} style={{ height: height, backgroundImage: `url(https://picsum.photos/${Math.round(width/2)}/${height})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', objectFit: 'cover' }}>
        </Sider>
        <Content>
          <LoginPage />
        </Content>
      </Layout>
    </>
  )
}
