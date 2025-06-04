// 歌词展示组件
// 功能：右侧区域显示当前歌曲的歌词内容，并高亮当前正在唱的那一句
// 原理：通过 props 传递歌词文本和当前播放时间，解析 LRC 格式，逐行渲染并高亮当前行
import React, { useMemo, useRef, useEffect } from 'react';

// 解析 LRC 歌词，返回 [{ time: 秒, text: 行内容 }]
function parseLrc(lrc) {
  if (!lrc) return [];
  return lrc.split('\n').map(line => {
    const match = line.match(/\[(\d+):(\d+\.?\d*)\](.*)/);
    if (match) {
      const min = parseInt(match[1], 10);
      const sec = parseFloat(match[2]);
      return { time: min * 60 + sec, text: match[3].trim() };
    }
    return null;
  }).filter(Boolean);
}

const Lyrics = ({ lyrics, currentTime }) => {
  // 解析歌词
  const lines = useMemo(() => parseLrc(lyrics), [lyrics]);

  // 找到当前应该高亮的歌词行索引
  const activeIdx = useMemo(() => {
    if (!lines.length) return -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (currentTime >= lines[i].time) return i;
    }
    return -1;
  }, [lines, currentTime]);

  // 滚动到高亮歌词
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const active = activeLineRef.current;
      // 让高亮行滚动到容器中间
      const offset = active.offsetTop - container.offsetHeight / 2 + active.offsetHeight / 2;
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, [activeIdx]);

  return (
    <div
      className="you"
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        overflowY: 'auto',
        padding: '2vw 0',
        boxSizing: 'border-box',
      }}
    >
      {lines.length ? (
        lines.map((line, idx) => (
          <div
            key={idx}
            ref={idx === activeIdx ? activeLineRef : null}
            style={{
              color: idx === activeIdx ? '#f59e42' : '#6366f1',
              fontWeight: idx === activeIdx ? 'bold' : 'normal',
              fontSize: idx === activeIdx ? '2.2vw' : '1.2vw',
              lineHeight: '2.2',
              transition: 'all 0.2s',
              textAlign: 'center',
              background: idx === activeIdx ? 'rgba(255, 243, 207, 0.3)' : 'none',
              borderRadius: '0.5em',
              padding: idx === activeIdx ? '0.2em 1em' : '0',
              margin: '0.1em 0',
              minHeight: '2em',
              maxWidth: '90%',
              whiteSpace: 'pre-line',
            }}
          >
            {line.text}
          </div>
        ))
      ) : (
        <div style={{ color: '#bbb' }}>暂无歌词</div>
      )}
    </div>
  );
};

export default Lyrics;
