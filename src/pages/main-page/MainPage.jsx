import { useState, useEffect } from "react"; // Added useEffect
import { useSearchParams } from "react-router-dom"; // Added
import Prologue from "./components/prologue/Prologue";
import Closue from "./components/closue/Closue";
import ClosueStatueSelect from "./components/closue-statue-select/ClosueStatueSelect";
//파일명 바꿈
const MainPage = () => {
  const [searchParams] = useSearchParams(); // Added
  const skipToClosue = searchParams.get("step") === "5"; // Added

  const urlParams = new URLSearchParams(window.location.search);
  const debugPage = urlParams.get("page") || "prologue";

  const [currentPage, setCurrentPage] = useState(skipToClosue ? "closure" : debugPage);

  // Effect to update currentPage when URL search params change
  useEffect(() => {
    const stepParam = searchParams.get("step");
    const pageParam = searchParams.get("page");

    if (stepParam === "5") {
      setCurrentPage("closure");
    } else if (pageParam) {
      setCurrentPage(pageParam);
    } else {
      // If no relevant params, default to prologue
      setCurrentPage("prologue");
    }
  }, [searchParams]); // Dependency on searchParams

  const renderPage = () => {
    switch (currentPage) {
      case "prologue":
        return <Prologue onComplete={() => setCurrentPage("closure")} />;
      case "closure":
        return <Closue onComplete={() => setCurrentPage("select")} />;
      case "select":
        return <ClosueStatueSelect />;
      default:
        return <Prologue onComplete={() => setCurrentPage("closure")} />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* 디버그용 페이지 전환 버튼
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-20 left-4 z-[9999] bg-white/90 p-4 rounded-lg shadow-lg border-2 border-green-500">
          <div className="text-sm font-bold mb-2 text-green-600">
            Page Navigator
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setCurrentPage("prologue")}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === "prologue"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Prologue
            </button>
            <button
              onClick={() => setCurrentPage("closure")}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === "closure"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Closue
            </button>
            <button
              onClick={() => setCurrentPage("select")}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === "select"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Select
            </button>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-300 text-xs text-green-600">
            💡 ?page=closure 로 바로 이동
          </div>
        </div>
      )} */}

      {renderPage()}
    </div>
  );
};

export default MainPage;
