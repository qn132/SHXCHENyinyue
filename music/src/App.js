// App 主组件
// 功能：负责整体布局、状态管理（当前播放、播放状态）、协调各子组件
// 原理：使用 useState 管理当前播放索引和播放状态，将音乐资源、状态和事件分发给各子组件
import React, { useState, useEffect } from 'react';
import './App.css';
import Disc from './components/Disc';
import Player from './components/Player';
import Playlist from './components/Playlist';
import Lyrics from './components/Lyrics';

// 示例音乐资源（请将你的音乐文件放在 public/music/ 目录下）
const musicList = [
  {
    title: '示例音乐1',
    src: process.env.PUBLIC_URL + '/music/song1.mp3',
    lyrics: process.env.PUBLIC_URL + '/lyrics/song1.lrc', // 歌词文件后缀应为 .lrc
  },
  {
    title: '示例音乐2',
    src: process.env.PUBLIC_URL + '/music/song2.mp3',
    lyrics: process.env.PUBLIC_URL + '/lyrics/song2.lrc',
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyrics, setLyrics] = useState('');

  // 切歌时加载歌词
  useEffect(() => {
    fetch(musicList[current].lyrics)
      .then(res => res.ok ? res.text() : '')
      .then(text => setLyrics(text))
      .catch(() => setLyrics(''));
  }, [current]);

  // 上一首
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + musicList.length) % musicList.length);
    setIsPlaying(false);
  };
  // 下一首
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % musicList.length);
    setIsPlaying(false);
  };
  // 播放/暂停
  const handlePlayPause = (playing) => {
    setIsPlaying(playing);
  };

  // 当前播放时间（传递给歌词组件高亮）
  const [currentTime, setCurrentTime] = useState(0);

  // 监听 audio 播放进度
  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  return (
    <div className="App">
      <div className='zuo'>
        <Disc />
        <div className='zuo-body'>
          <Player
            src={musicList[current].src}
            onPrev={handlePrev}
            onNext={handleNext}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onLoop={() => {}}
            onLike={() => {}}
            onLyrics={() => {}}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
        <Playlist 
          musicList={musicList} 
          current={current} 
          onSelect={setCurrent} 
        />
      </div>
      <Lyrics lyrics={lyrics} currentTime={currentTime} />
    </div>
  );
}

export default App;
