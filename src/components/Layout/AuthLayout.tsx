import { DesktopOutlined, LogoutOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FullScreenLoading } from '@/components/Loading';
import { AppContext } from '@/contexts/app-context';
import Authentication from '@/libs/authentication';

type MenuItem = Required<MenuProps>['items'][number];

const useMenuData = () => {
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

  const menuItems: MenuItem[] = [
    getItem(<Link to="/app">Dashboard</Link>, '/app', <PieChartOutlined />),
    getItem(<Link to="/app/projects">Projects</Link>, '/app/projects', <DesktopOutlined />)
  ];

  const profileItems: MenuItem[] = [
    getItem(<Link to="/app/profile/me">Profile</Link>, '/profile/me', <UserOutlined />),
    getItem(
      <Link to="/" onClick={() => Authentication.signOut()}>
        Sign Out
      </Link>,
      '/logout',
      <LogoutOutlined />
    )
  ];

  return { menuItems, profileItems };
};

const { Content, Sider } = Layout;
const { useToken } = theme;

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // Authentication
  const { authenticated, access_token, updateToken } = useContext(AppContext);
  const location = useLocation();

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

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = useToken();

  // Menu
  const { menuItems, profileItems } = useMenuData();
  const activeMenuItem = '/' + location.pathname.split('/').slice(1, 3).join('/');

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
              className={clsx('justify-self-end bg-inherit pt-5')}
              mode="inline"
              selectedKeys={Array<string>(activeMenuItem)}
              items={profileItems}
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
