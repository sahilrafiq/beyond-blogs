import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, Sparkles, Clock, Link2, ExternalLink, X } from 'lucide-react';

const API_URL = 'http://localhost:8000/api';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [viewMode, setViewMode] = useState('original');
  const [scraping, setScraping] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/articles`);
      const data = await response.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    if (!window.confirm('Scrape 5 oldest articles from BeyondChats?')) return;
    
    try {
      setScraping(true);
      const response = await fetch(`${API_URL}/articles/scrape`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        alert(`Scraped ${data.count} articles!`);
        fetchArticles();
      }
    } catch (error) {
      alert('Scraping failed');
    } finally {
      setScraping(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'enhanced') return article.is_updated;
    if (filter === 'original') return !article.is_updated;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                <FileText size={40} className="text-blue-600" />
                Beyond Blogs
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                AI-Powered Article Enhancement Platform
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleScrape}
                disabled={scraping}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <RefreshCw size={20} className={scraping ? 'animate-spin' : ''} />
                {scraping ? 'Scraping...' : 'Scrape Articles'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm font-medium opacity-90">Total Articles</div>
            <div className="text-4xl font-bold mt-2">{articles.length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm font-medium opacity-90">Enhanced</div>
            <div className="text-4xl font-bold mt-2">{articles.filter(a => a.is_updated).length}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm font-medium opacity-90">Pending</div>
            <div className="text-4xl font-bold mt-2">{articles.filter(a => !a.is_updated).length}</div>
          </div>
        </div>

        <div className="mb-6 flex gap-3 bg-white rounded-xl p-2 shadow-md">
          {['all', 'enhanced', 'original'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw size={48} className="animate-spin text-blue-600" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FileText size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-6">Click Scrape Articles to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
            ))}
          </div>
        )}

        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </div>
    </div>
  );
}

function ArticleCard({ article, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      {article.image_url && (
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
          {article.is_updated && (
            <div className="absolute top-3 right-3">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Sparkles size={12} />
                Enhanced
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.content?.substring(0, 180)}...
        </p>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            article.is_updated 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {article.is_updated ? '✨ Enhanced' : 'Original'}
          </span>
        </div>
      </div>
    </div>
  );
}

function ArticleModal({ article, onClose, viewMode, setViewMode }) {
  const content = viewMode === 'enhanced' && article.updated_content 
    ? article.updated_content 
    : article.content;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold pr-8">{article.title}</h2>
          <button onClick={onClose} className="text-white hover:bg-white hover:text-blue-600 rounded-full p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8">
          {article.is_updated && (
            <div className="mb-6 flex gap-3 bg-gray-50 p-2 rounded-xl">
              <button
                onClick={() => setViewMode('original')}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                  viewMode === 'original' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                📄 Original
              </button>
              <button
                onClick={() => setViewMode('enhanced')}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  viewMode === 'enhanced' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Sparkles size={18} />
                AI Enhanced
              </button>
            </div>
          )}

          {article.image_url && (
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-72 object-cover rounded-xl mb-6 shadow-md"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}

          <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg mb-8">
            {content}
          </div>

          {article.is_updated && article.references && article.references.length > 0 && (
            <div className="mt-8 pt-6 border-t-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Link2 size={22} className="text-blue-600" />
                Reference Sources
              </h3>
              <div className="space-y-3 bg-blue-50 p-4 rounded-xl">
                {article.references.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-blue-700 hover:text-blue-900 p-3 bg-white rounded-lg hover:shadow-md transition-all"
                  >
                    <ExternalLink size={18} className="mt-1 flex-shrink-0" />
                    <span className="font-medium">{ref.title || ref.url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;