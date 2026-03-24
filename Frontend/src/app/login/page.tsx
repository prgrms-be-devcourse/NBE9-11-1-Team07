'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    console.log('로그인 시도:', formData);  // 추가
    console.log('이메일:', formData.email);  // 추가
    console.log('비밀번호:', formData.password);

    // 임시: 하드코딩 체크
    if (formData.email === 'admin@decaf.com' && formData.password === '1234') {
        console.log('조건 통과! /admin으로 이동');
        router.push('/admin');
        return;
    }

    console.log('조건 실패');  // 추가

    setError('이메일 또는 비밀번호가 일치하지 않습니다.');

    /*
    try {
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.resultCode.startsWith('200')) {
        router.push('/admin');
      } else {
        setError(data.msg || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setError('로그인 중 오류가 발생했습니다.');
    }
    */
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <Header />

        {/* 메인 컨텐츠 */}
        <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px'
        }}>
            <div style={{
            width: '100%',
            maxWidth: '440px'
            }}>
            <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '40px',
                textAlign: 'left'
            }}>
                관리자 로그인 페이지
            </h1>

            <div style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '40px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                textAlign: 'center',
                marginBottom: '32px'
                }}>
                <div style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    marginBottom: '4px'
                }}>
                    Log In
                </div>
                <div style={{
                    fontSize: '16px',
                    color: '#6b7280'
                }}>
                    관리자 로그인
                </div>
                </div>

                <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px',
                    color: '#374151'
                    }}>
                    관리자 이메일 (Admin Email)
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@gmail.com"
                    required
                    style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px',
                    color: '#374151'
                    }}>
                    비밀번호 (Password)
                    </label>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••"
                    required
                    style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '24px'
                }}>
                    <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#6b7280',
                    cursor: 'pointer'
                    }}>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ cursor: 'pointer' }}
                    />
                    아이디 저장
                    </label>
                </div>

                {error && (
                    <div style={{
                    padding: '12px',
                    marginBottom: '16px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: '#dc2626'
                    }}>
                    {error}
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#000000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer'
                    }}
                >
                    로그인
                </button>
                </form>
            </div>
            </div>
        </div>
    </>
  );
}