import { Spin } from 'antd';

export const FullScreenLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Spin size="large" />
  </div>
);
