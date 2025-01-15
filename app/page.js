'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [url, setUrl] = useState(''); // State to store the YouTube URL
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [thumbnail, setThumbnail] = useState(''); // State to store the thumbnail URL

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})|(?:https?:\/\/)?youtu\.be\/([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  // Handle URL input change
  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    const videoId = getYouTubeVideoId(newUrl);
    if (videoId) {
      setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`); // Set thumbnail URL
      setError('');
    } else {
      setThumbnail('');
      setError('Geçerli bir YouTube bağlantısı girin.'); // Set error message
    }
  };

  // Handle video download
  const handleDownload = async () => {
    if (!url) {
      setError('YouTube linki gerekli.'); // Set error if URL is empty
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`); // Fetch video download

      if (response.ok) {
        const blob = await response.blob(); // Get video blob
        const downloadUrl = window.URL.createObjectURL(blob); // Create download URL
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'video.mp4'; // Set download filename
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Bilinmeyen bir hata oluştu.'); // Set error message
      }
    } catch (err) {
      setError('İndirme sırasında bir hata oluştu.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">YouTube Video Downloader</h1>
        <input
          type="text"
          placeholder="YouTube Linkini Girin"
          value={url}
          onChange={handleUrlChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />
        {thumbnail && (
          <div className="mb-4">
            <img
              src={thumbnail}
              alt="Video Thumbnail"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        )}
        <button
          onClick={handleDownload}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-colors duration-300 ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-purple-500 hover:bg-purple-600'
            }`}
          disabled={loading}
        >
          {loading ? 'İndiriliyor...' : 'İndir'}
        </button>
        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
