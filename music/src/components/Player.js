// 播放器组件
// 功能：实现音乐播放、暂停、切歌、循环、喜欢、歌词等操作按钮
// 原理：通过 <audio> 标签实现音频播放，按钮事件控制 audio 播放/暂停，父组件通过 props 控制当前播放状态
import React, { useRef } from 'react';

const Player = ({ src, onPrev, onNext, onLoop, onLike, onLyrics, isPlaying, onPlayPause, onTimeUpdate }) => {
  // 创建 audio 元素的引用
  const audioRef = useRef(null);

  // 控制播放/暂停按钮点击事件
  const handlePlayPause = () => {
    if (!audioRef.current) return; // 如果 audio 未挂载则返回
    if (audioRef.current.paused) { // 如果当前是暂停状态
      audioRef.current.play();     // 播放音频
      onPlayPause && onPlayPause(true); // 通知父组件正在播放
    } else {
      audioRef.current.pause();    // 暂停音频
      onPlayPause && onPlayPause(false); // 通知父组件暂停
    }
  };

  return (
    <div className="player"> {/* 播放器主容器 */}
      {/* 音频播放核心，src 由父组件传入 */}
      <audio ref={audioRef} src={src} preload="auto" onTimeUpdate={onTimeUpdate} />
      <div className="player-controls1"> {/* 上方主控按钮组 */}
        <button className="prev-btn" onClick={onPrev}>⏮️</button> {/* 上一首 */}
        <button className="play-pause-btn" onClick={handlePlayPause}>{isPlaying ? '⏸️' : '⏯️'}</button> {/* 播放/暂停 */}
        <button className="next-btn" onClick={onNext}>⏭️</button> {/* 下一首 */}
      </div>
      <div className="player-controls2"> {/* 下方功能按钮组 */}
        <button className="loop-btn" onClick={onLoop}>🔁</button> {/* 循环播放 */}
        <button className="lyrics-btn" onClick={onLyrics}>词</button> {/* 显示歌词 */}
        <button className="like-btn" onClick={onLike}>❤️</button> {/* 喜欢/收藏 */}
      </div>
    </div>
  );
};

export default Player;
