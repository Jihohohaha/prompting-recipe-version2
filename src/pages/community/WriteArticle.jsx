import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService'; // ApiService 인스턴스 임포트

const WriteArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('authToken');
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
      }

      // ApiService에 토큰 설정
      apiService.setAuthToken(accessToken);

      // POST /info-boards 요청
      const response = await apiService.post('/info-boards', {
        title,
        content,
      });

      if (response.status === 201) {
        alert('글이 성공적으로 작성되었습니다!');
        navigate('/community/ai-articles');
      } else {
        throw new Error('글 작성에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-6">글 작성</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-gray-300 mb-2" htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            className="mb-6 p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
            disabled={loading}
          />
          <label className="text-gray-300 mb-2" htmlFor="content">내용</label>
          <textarea
            id="content"
            rows={10}
            className="mb-6 p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            required
            disabled={loading}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition"
            disabled={loading}
          >
            {loading ? '작성 중...' : '작성 완료'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteArticle;
