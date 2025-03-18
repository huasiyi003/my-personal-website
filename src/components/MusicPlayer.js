import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);
  
  // 歌曲列表
  const songs = [
    {
      title: "In The End",
      artist: "Linkin Park",
      src: "https://music.163.com/song/media/outer/url?id=4153366.mp3", // 示例链接
      cover: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
    },
    {
      title: "Numb",
      artist: "Linkin Park",
      src: "https://music.163.com/song/media/outer/url?id=4153366.mp3", // 示例链接
      cover: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
    },
    {
      title: "Faint",
      artist: "Linkin Park",
      src: "https://music.163.com/song/media/outer/url?id=4153366.mp3", // 示例链接
      cover: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
    }
  ];

  // 播放/暂停切换
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 下一首歌
  const nextSong = () => {
    const next = (currentSong + 1) % songs.length;
    setCurrentSong(next);
    setProgress(0);
  };

  // 上一首歌
  const prevSong = () => {
    const prev = (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prev);
    setProgress(0);
  };

  // 更新进度条
  const updateProgress = () => {
    const { currentTime, duration } = audioRef.current;
    if (duration) {
      setProgress((currentTime / duration) * 100);
    }
  };

  // 设置进度
  const setAudioProgress = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  // 当歌曲结束时自动播放下一首
  const handleSongEnd = () => {
    nextSong();
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  };

  // 当currentSong改变时，如果正在播放，则继续播放新歌曲
  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  }, [currentSong, isPlaying]);

  // 切换播放列表显示
  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  // 选择歌曲
  const selectSong = (index) => {
    setCurrentSong(index);
    setProgress(0);
    setShowPlaylist(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  return (
    <div className="music-player-container">
      <div className="music-player-main">
        <div className="player-controls">
          <button className="control-btn" onClick={prevSong}>
            <span className="control-icon">⏮</span>
          </button>
          <button className="control-btn play-btn" onClick={togglePlay}>
            <span className="control-icon">{isPlaying ? "⏸" : "▶"}</span>
          </button>
          <button className="control-btn" onClick={nextSong}>
            <span className="control-icon">⏭</span>
          </button>
        </div>
        
        <div className="player-info">
          <div className="song-details">
            <div className="song-title">{songs[currentSong].title}</div>
            <div className="song-artist">{songs[currentSong].artist}</div>
          </div>
          
          <div className="progress-container" onClick={setAudioProgress}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        
        <button className="playlist-toggle" onClick={togglePlaylist}>
          <span className="playlist-icon">🎵</span>
        </button>
      </div>
      
      {showPlaylist && (
        <div className="music-playlist">
          <h3>播放列表</h3>
          <ul>
            {songs.map((song, index) => (
              <li 
                key={index} 
                className={index === currentSong ? 'active' : ''}
                onClick={() => selectSong(index)}
              >
                <div className="playlist-song-title">{song.title}</div>
                <div className="playlist-song-artist">{song.artist}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onTimeUpdate={updateProgress}
        onEnded={handleSongEnd}
      ></audio>
    </div>
  );
}

export default MusicPlayer; 