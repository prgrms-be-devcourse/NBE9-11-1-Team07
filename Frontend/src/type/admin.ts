// Admin 엔티티
export interface Admin {
    id: number;
    name: string;
    password: string;
    role: string;
    createDate: string;
    modifyDate: string;
  }
  
  // 관리자 로그인 요청
  export interface AdminLoginRequest {
    name: string;
    password: string;
  }
  
  // 관리자 로그인 응답
  export interface AdminLoginResponse {
    msg: string;
    resultCode: string;
    data: Admin;
  }