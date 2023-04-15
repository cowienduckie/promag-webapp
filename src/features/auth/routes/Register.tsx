import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate('/app')}> Bypass register </Button>;
};
