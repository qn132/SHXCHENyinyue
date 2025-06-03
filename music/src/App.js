
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='zuo'>
        <div className='zuo-top'>唱片区</div>
        <div className='zuo-body'>
          <div className="player">
            <div className="player-controls1">
              <button className="prev-btn">⏮️</button>
              <button className="play-pause-btn">⏯️</button>
              <button className="next-btn">⏭️</button>
            </div>
            <div className="player-controls2">
              <button className="loop-btn">🔁</button>
              <button className="lyrics-btn">词</button>
              <button className="like-btn">❤️</button>
            </div>
          </div>
        </div>
        <div className="zuo-bottom">播放列表区</div>
      </div>
      <div className='you'>全屏歌词区</div>
    </div>
  );
  
}

export default App;
