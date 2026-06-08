// API 베이스 URL (개발 중에는 proxy를 통해 localhost:8083으로 전달됨)
const API_BASE_URL = import.meta.env.DEV ? '' : 'http://localhost:8083';

/**
 * 토큰을 포함하여 API 요청을 보내는 함수
 * @param {string} endpoint - API 엔드포인트 (예: /api/users/login)
 * @param {object} options - fetch 옵션 (method, body 등)
 * @returns {Promise} - API 응답
 */
export const apiWithAuth = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  // localStorage에서 토큰 가져오기
  const token = localStorage.getItem('authToken');

  console.log(`[apiWithAuth] 요청: ${endpoint}`);
  console.log(`[apiWithAuth] 토큰 존재: ${!!token}`);
  console.log(`[apiWithAuth] 토큰: ${token ? token.substring(0, 20) + '...' : 'null'}`);
  console.log(`[apiWithAuth] 전체 URL: ${url}`);

  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  // 요청 헤더 설정
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  console.log(`[apiWithAuth] Authorization 헤더: Bearer ${token.substring(0, 20)}...`);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[apiWithAuth] 응답 상태: ${response.status}`);

    // 응답 상태 확인
    if (!response.ok) {
      let errorMessage = `API 요청 실패: ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('백엔드 에러:', errorData);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        const errorText = await response.text();
        console.error('응답 텍스트:', errorText);
      }
      
      if (response.status === 401) {
        // 토큰이 만료되었을 경우 처리
        localStorage.removeItem('authToken');
        const authError = new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
        authError.status = 401;
        throw authError;
      }
      const apiError = new Error(errorMessage);
      apiError.status = response.status;
      throw apiError;
    }

    const data = await response.json();
    console.log(`[apiWithAuth] 응답 데이터:`, data);
    return data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 인증 정보 없이 API 요청을 보내는 함수
 * @param {string} endpoint - API 엔드포인트 (예: /api/users/login)
 * @param {object} options - fetch 옵션 (method, body 등)
 * @returns {Promise} - API 응답
 */
export const apiWithoutAuth = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  // 요청 헤더 설정
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 응답 상태 확인
    if (!response.ok) {
      let errorMessage = `API 요청 실패: ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('백엔드 에러:', errorData);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error('응답 텍스트:', await response.text());
      }
      const apiError = new Error(errorMessage);
      apiError.status = response.status;
      throw apiError;
    }

    return await response.json();
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 통합 API 호출 함수 (인증 여부 선택 가능)
 * @param {string} endpoint - API 엔드포인트 (예: /api/users/login)
 * @param {object} options - fetch 옵션
 * @param {boolean} options.withAuth - 인증 포함 여부 (기본값: false)
 * @returns {Promise} - API 응답
 */
export const api = async (endpoint, options = {}) => {
  const { withAuth = false, ...fetchOptions } = options;

  if (withAuth) {
    return apiWithAuth(endpoint, fetchOptions);
  } else {
    return apiWithoutAuth(endpoint, fetchOptions);
  }
};
