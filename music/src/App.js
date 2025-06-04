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
    title: '只字不提(Live)-薛之谦&周深',
    src: process.env.PUBLIC_URL + '/music/只字不提(Live)-薛之谦&周深.mp3',
    lyrics: process.env.PUBLIC_URL + '/lyrics/只字不提(Live)-薛之谦&周深.lrc', // 歌词文件后缀应为 .lrc
  },
  {
    title: '我怀念的-孙燕姿',
    src: process.env.PUBLIC_URL + '/music/我怀念的-孙燕姿.mp3',
    lyrics: process.env.PUBLIC_URL + '/lyrics/我怀念的-孙燕姿.lrc',
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [localList, setLocalList] = useState([]); // 本地音乐列表

  // 合并本地和示例音乐
  const allMusicList = React.useMemo(() => [...musicList, ...localList], [localList]);

  // 切歌时加载歌词
  useEffect(() => {
    const item = allMusicList[current];
    if (!item) return;
    if (item.lyrics && item.lyrics.startsWith('blob:')) {
      // 本地歌词（blob）
      fetch(item.lyrics).then(res => res.text()).then(setLyrics).catch(() => setLyrics(''));
    } else if (item.lyrics) {
      fetch(item.lyrics).then(res => res.ok ? res.text() : '').then(setLyrics).catch(() => setLyrics(''));
    } else {
      setLyrics('');
    }
  }, [current, allMusicList]);

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

  // 添加本地音乐和歌词
  const handleAddLocal = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    // 只处理音频和歌词
    let audioFile = files.find(f => f.type.startsWith('audio/'));
    let lrcFile = files.find(f => f.name.endsWith('.lrc'));
    if (!audioFile) return;
    const audioUrl = URL.createObjectURL(audioFile);
    let lrcUrl = '';
    if (lrcFile) lrcUrl = URL.createObjectURL(lrcFile);
    setLocalList(list => [...list, {
      title: audioFile.name,
      src: audioUrl,
      lyrics: lrcUrl || '',
    }]);
  };

  return (
    <div className="App">
      <div className='zuo'>
        {/* 添加本地音乐按钮 */}
        <div style={{padding: '0.5em 1em'}}>
          <label style={{cursor:'pointer',color:'#6366f1',fontWeight:'bold'}}>
            + 添加本地音乐
            <input type="file" accept="audio/*,.lrc" multiple style={{display:'none'}} onChange={handleAddLocal} />
          </label>
        </div>
        <Disc />
        <div className='zuo-body'>
          <Player
            src={allMusicList[current]?.src}
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
          musicList={allMusicList} 
          current={current} 
          onSelect={setCurrent} 
        />
      </div>
      <Lyrics lyrics={lyrics} currentTime={currentTime} />
    </div>
  );
}

export default App;
