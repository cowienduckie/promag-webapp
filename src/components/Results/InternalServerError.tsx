import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const InternalServerError: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
