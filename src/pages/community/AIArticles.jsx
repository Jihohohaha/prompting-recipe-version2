import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import aiInfoBgImage from '../../assets/images/ai_info_bgg.png';
import apiService from '../../services/apiService'; // ApiService 인스턴스 임포트

const AIArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 API 호출 - 게시글 목록 조회
    const fetchArticles = async () => {
      try {
        const response = await apiService.get('/info-boards', {
          params: { page: 1, limit: 10 },
        });
        setArticles(response.data.data.data || []);
      } catch (error) {
        console.error('정보 게시글 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="relative h-screen bg-black">
      <img
        src={aiInfoBgImage}
        alt=""
        className="fixed top-1/2 left-1/2 w-2/3 max-w-2xl opacity-40 pointer-events-none select-none"
        style={{ transform: 'translate(-50%, -50%)', zIndex: 0 }}
      />
      <div className="relative pt-20 px-8 z-10 bg-black">
        <div className="max-w-4xl mx-auto bg-black">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white text-center font-pretendard flex-1">
              AI 정보 공유
            </h1>
            <Link
              to="/community/new"
              className="ml-6 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow font-semibold transition"
            >
              글 생성
            </Link>
          </div>

          <div className="text-white bg-black">
            <div className="mb-8" />
            {loading ? (
              <div className="text-center text-gray-400">로딩 중...</div>
            ) : articles.length === 0 ? (
              <div className="text-center text-gray-400">게시글이 없습니다.</div>
            ) : (
              articles.map((post, i) => (
                <div key={post.info_board_id}>
                  <div className="mb-2">
                    <div className="text-2xl font-bold mb-3">{post.title}</div>
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm mr-12">{post.user?.name || '운영자'}</span>
                      <span className="text-gray-500 text-sm ml-auto">
                        {new Date(post.created_at).toLocaleDateString('ko-KR', {
                          year: '2-digit',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  {i !== articles.length - 1 && <hr className="my-5 border-gray-700" />}
                </div>
              ))
            )}
            <div className="pb-12 bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIArticles;
