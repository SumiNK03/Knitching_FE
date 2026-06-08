# API 호출 유틸리티 사용 가이드

## 개요
`src/utils/api.js`에서 제공하는 API 호출 함수들입니다.

---

## 1. 토큰이 포함된 인증 API 호출: `apiWithAuth()`

토큰을 헤더에 담아서 API 요청을 보냅니다.

### 사용법
```javascript
import { apiWithAuth } from '@/utils/api';

// GET 요청
try {
  const data = await apiWithAuth('https://api.example.com/user/profile');
  console.log(data);
} catch (error) {
  console.error('오류:', error.message);
}

// POST 요청
try {
  const data = await apiWithAuth('https://api.example.com/user/update', {
    method: 'POST',
    body: JSON.stringify({ name: '홍길동', email: 'hong@example.com' }),
  });
  console.log(data);
} catch (error) {
  console.error('오류:', error.message);
}

// PUT 요청
try {
  const data = await apiWithAuth('https://api.example.com/course/1', {
    method: 'PUT',
    body: JSON.stringify({ progress: 50 }),
  });
  console.log(data);
} catch (error) {
  console.error('오류:', error.message);
}

// DELETE 요청
try {
  const data = await apiWithAuth('https://api.example.com/course/1', {
    method: 'DELETE',
  });
  console.log(data);
} catch (error) {
  console.error('오류:', error.message);
}
```

### 특징
- `localStorage.getItem('authToken')`에서 토큰을 자동으로 가져옵니다.
- `Authorization: Bearer {token}` 헤더를 자동으로 추가합니다.
- 401 Unauthorized 응답 시 토큰을 삭제하고 에러를 던집니다.

---

## 2. 인증 정보 없이 API 호출: `apiWithoutAuth()`

토큰 없이 API 요청을 보냅니다. (로그인, 회원가입 등에 사용)

### 사용법
```javascript
import { apiWithoutAuth } from '@/utils/api';

// 로그인
try {
  const data = await apiWithoutAuth('https://api.example.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
  });
  // 토큰을 localStorage에 저장
  localStorage.setItem('authToken', data.token);
  console.log('로그인 성공:', data);
} catch (error) {
  console.error('로그인 오류:', error.message);
}

// 회원가입
try {
  const data = await apiWithoutAuth('https://api.example.com/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ 
      email: 'newuser@example.com', 
      password: 'password123',
      name: '새사용자'
    }),
  });
  console.log('회원가입 성공:', data);
} catch (error) {
  console.error('회원가입 오류:', error.message);
}

// 공개 정보 조회
try {
  const data = await apiWithoutAuth('https://api.example.com/courses/public');
  console.log('공개 코스:', data);
} catch (error) {
  console.error('오류:', error.message);
}
```

### 특징
- 인증 헤더가 포함되지 않습니다.
- 로그인, 회원가입, 공개 정보 조회에 사용됩니다.

---

## 3. 통합 API 호출: `api()`

`withAuth` 옵션으로 인증 여부를 선택할 수 있습니다.

### 사용법
```javascript
import { api } from '@/utils/api';

// 인증 포함
try {
  const data = await api('https://api.example.com/user/profile', {
    withAuth: true,
  });
  console.log(data);
} catch (error) {
  console.error('오류:', error.message);
}

// 인증 미포함
try {
  const data = await api('https://api.example.com/auth/login', {
    withAuth: false,
    method: 'POST',
    body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
  });
  localStorage.setItem('authToken', data.token);
  console.log('로그인 성공:', data);
} catch (error) {
  console.error('로그인 오류:', error.message);
}
```

---

## 주의사항

1. **토큰 저장**: 로그인 후 받은 토큰을 `localStorage.setItem('authToken', token)`으로 저장해야 합니다.
2. **토큰 형식**: 서버에서 받은 토큰이 올바른 형식인지 확인하세요.
3. **에러 처리**: 항상 `try-catch`로 감싸서 에러를 처리하세요.
4. **CORS**: 백엔드에서 CORS 설정이 되어 있어야 합니다.
