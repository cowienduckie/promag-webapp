import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate('/app')}>Bypass login</Button>;
};
