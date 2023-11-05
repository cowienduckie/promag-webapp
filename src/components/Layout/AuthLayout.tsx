import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FullScreenLoading } from '@/components/Loading';
import { AppContext } from '@/contexts/app-context';
import Authentication from '@/lib/authentication';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
};

const useMenuData = () => {
  const menuItems: MenuItem[] = [
    getItem(<Link to="/app">Dashboard</Link>, '/app', <PieChartOutlined />),
    getItem(<Link to="/app/projects">Projects</Link>, '/app/projects', <DesktopOutlined />)
  ];

  return { menuItems };
};

const { Content, Sider } = Layout;
const { useToken } = theme;

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = useToken();

  const { menuItems } = useMenuData();
  const location = useLocation();
  const activeMenuItem = '/' + location.pathname.split('/').slice(1, 3).join('/');

  const { authenticated, access_token, updateToken } = useContext(AppContext);

  useEffect(() => {
    if (!authenticated) {
      Authentication.authenticateUser(location);
    } else {
      const getToken = async () => {
        if (!access_token) {
          updateToken(await Authentication.getAccessToken());
        }
      };
      getToken();
    }
  }, [authenticated, location, access_token, updateToken]);

  return (
    <>
      {!authenticated && <FullScreenLoading />}
      {authenticated && (
        <Layout className={clsx('min-h-screen bg-blue-100')}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <h1 className={clsx('my-5 text-center text-2xl font-bold text-white')}>
              {!collapsed ? 'PROMAG' : 'PM'}
            </h1>
            <Menu
              theme="dark"
              className={clsx('bg-inherit pt-5')}
              mode="inline"
              selectedKeys={Array<string>(activeMenuItem)}
              items={menuItems}
            />
            <Menu
              theme="dark"
              className={clsx('bg-inherit pt-5')}
              mode="inline"
              selectedKeys={Array<string>()}
            />
          </Sider>
          <Layout className={clsx('bg-inherit')}>
            <Content
              className={clsx('border-1 m-5 rounded shadow-md')}
              style={{ background: colorBgContainer }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};
