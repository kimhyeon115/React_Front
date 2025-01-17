import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from '@mui/material';

function Login() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [loading, setLoading] = useState(false);

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    userId: '',
    userPwd: ''
  });
  
  // 경고 상태 관리
  const [warnings, setWarnings] = useState({
    userId: false,
    userPwd: false
  });

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 경고 표시 함수
  const showWarning = (field) => {
    setWarnings(prev => ({
      ...prev,
      [field]: true
    }));
    
    // 1.5초 후 경고 제거
    setTimeout(() => {
      setWarnings(prev => ({
        ...prev,
        [field]: false
      }));
    }, 1500);

    setLoading(false);
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    setLoading(true);

    if (formData.userId === "") {
      showWarning('userId');
      return;
    }
    if (formData.userPwd === "") {
      showWarning('userPwd');
      return;
    }

    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          userPwd: formData.userPwd,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);

      if (data.header.code === 200) {
        alert('로그인 성공!');
        navigate('/dashboard');
      } else {
        alert(data.header.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('로그인 실패. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form">
      <h1>LOGO DESIGN</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="int-area">
          <input
            type="text"
            name="userId"
            id="userId"
            value={formData.userId}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label 
            htmlFor="userId"
            className={warnings.userId ? 'warning' : ''}
          >
            USER NAME
          </label>
        </div>
        <div className="int-area">
          <input
            type="password"
            name="userPwd"
            id="userPwd"
            value={formData.userPwd}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label 
            htmlFor="userPwd"
            className={warnings.userPwd ? 'warning' : ''}
          >
            PASSWORD
          </label>
        </div>
        <div className="btn-area">
          <Button
            disabled={loading}
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              height: '50px',
              backgroundColor: '#1253b7',
              borderRadius: '25px',
              boxShadow: '0 4px 8px rgba(22, 108, 234, 0.3)',
              '&:hover': {
                backgroundColor: '#166cea',
                boxShadow: '0 6px 12px rgba(22, 108, 234, 0.4)',
              },
              '&:active': {
                boxShadow: '0 2px 4px rgba(22, 108, 234, 0.4)',
                transform: 'translateY(1px)'
              },
            }}
          >
            LOGIN
          </Button>
        </div>
      </form>
      <div className="caption">
      <Link
        href="#"
        onClick={(e) => e.preventDefault()}
        sx={{
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
          }
        }}
      >
        Forgot Password?
      </Link>
      </div>
    </section>
  );
}

export default Login;