// 播放列表组件
// 功能：展示所有可播放的音乐列表，高亮当前播放项，点击可切换歌曲
// 原理：通过 props 接收音乐列表、当前播放索引和切换回调，渲染列表并处理点击事件
import React from 'react';

const Playlist = ({ musicList, current, onSelect }) => {
  // 渲染播放列表，每一项可点击切换
  return (
    <div className="zuo-bottom">
      {musicList.map((item, idx) => (
        <div
          key={item.title + idx} // 唯一 key
          style={{
            padding: '0.5em 0',
            color: idx === current ? '#6366f1' : '#374151', // 当前播放项高亮
            fontWeight: idx === current ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: '1px solid #e5e7eb',
            background: idx === current ? '#eef2ff' : 'transparent',
            borderRadius: '0.5em',
          }}
          onClick={() => onSelect(idx)} // 切换歌曲
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Playlist;
