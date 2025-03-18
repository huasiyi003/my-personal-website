import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import MusicPlayer from './components/MusicPlayer';
import blogPosts from './data/blogPosts';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeSection, setActiveSection] = useState('about'); // 默认显示"关于我"
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '26°C- 31°C', condition: '晴' });
  
  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleReadMore = (postId) => {
    const post = blogPosts.find(post => post.id === postId);
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };
  
  const handleBackToBlogList = () => {
    setSelectedPost(null);
    setActiveSection('blog');
  };

  // 导航菜单点击处理
  const handleNavClick = (section) => {
    setActiveSection(section);
    setSelectedPost(null);
  };

  // 格式化时间
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  
  // 格式化日期
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
    return `${year} 年 ${month} 月 ${day} 日 星期${weekday}`;
  };

  // 渲染内容区域
  const renderContent = () => {
    if (selectedPost) {
      return <BlogPost post={selectedPost} onBack={handleBackToBlogList} />;
    }

    switch (activeSection) {
      case 'about':
        return (
          <section className="content-section glass-effect">
            <div className="section-header">
              <h2>关于我</h2>
              <div className="section-line"></div>
            </div>
            <div className="section-content">
              <p>我是一名热爱技术的开发者，对Web开发和新技术充满热情。</p>
              <p>我擅长使用React构建现代化的Web应用程序。</p>
              <div className="quote-container">
                <blockquote>
                  "Hello World!"
                  <footer>—— 一个建立于 21 世纪的小站，存活于互联网的边缘</footer>
                </blockquote>
              </div>
            </div>
          </section>
        );
      case 'blog':
        return (
          <section className="content-section glass-effect">
            <BlogList onReadMore={handleReadMore} />
          </section>
        );
      case 'reading':
        return (
          <section className="content-section glass-effect">
            <div className="section-header">
              <h2>阅读</h2>
              <div className="section-line"></div>
            </div>
            <div className="reading-list">
              <div className="reading-item">
                <div className="reading-icon">📚</div>
                <div className="reading-content">
                  <h3>《深入理解React》</h3>
                  <p>这本书详细讲解了React的工作原理和最佳实践。</p>
                </div>
              </div>
              <div className="reading-item">
                <div className="reading-icon">📚</div>
                <div className="reading-content">
                  <h3>《JavaScript高级程序设计》</h3>
                  <p>这是一本JavaScript经典教程，涵盖了从基础到高级的各种主题。</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'projects':
        return (
          <section className="content-section glass-effect">
            <div className="section-header">
              <h2>我的项目</h2>
              <div className="section-line"></div>
            </div>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-icon">💻</div>
                <h3>个人网站</h3>
                <p>使用React开发的个人网站，展示我的作品和想法。</p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">CSS3</span>
                </div>
              </div>
              <div className="project-card">
                <div className="project-icon">🎵</div>
                <h3>音乐播放器</h3>
                <p>一个简洁的在线音乐播放器，支持播放列表和音乐可视化。</p>
                <div className="project-tags">
                  <span className="tag">JavaScript</span>
                  <span className="tag">Web Audio API</span>
                </div>
              </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="content-section glass-effect">
            <div className="section-header">
              <h2>联系我</h2>
              <div className="section-line"></div>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-detail">
                  <h3>邮箱</h3>
                  <p>your.email@example.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🌐</div>
                <div className="contact-detail">
                  <h3>GitHub</h3>
                  <p><a href="https://github.com/你的用户名" target="_blank" rel="noopener noreferrer">github.com/你的用户名</a></p>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return <div>内容不存在</div>;
    }
  };

  // 使用本地背景图片
  const backgroundImage = `${process.env.PUBLIC_URL}/images/背景.png`;
  
  // 背景样式，包含虚化效果
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    position: 'relative',
  };

  // 虚化遮罩层样式
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // 降低透明度，让背景更明显
    backdropFilter: 'blur(5px)', // 减少虚化强度
    WebkitBackdropFilter: 'blur(5px)', // Safari 支持
    zIndex: -1,
  };

  return (
    <div className="app-container" style={backgroundStyle}>
      {/* 虚化遮罩层 */}
      <div style={overlayStyle}></div>
      
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>
      
      <header className="app-header">
        <h1 className="site-title">我的个人网站</h1>
        <p className="site-subtitle">欢迎来到我的个人空间</p>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      
      <div className="main-container">
        <div className="top-widgets">
          <div className="widget clock-widget glass-effect">
            <div className="digital-clock">{formatTime(currentTime)}</div>
            <div className="date-display">{formatDate(currentTime)}</div>
            <div className="weather-info">
              <span className="weather-location">地球</span>
              <span className="weather-condition">{weather.condition}</span>
              <span className="weather-temp">{weather.temp}</span>
            </div>
          </div>
          
          <div className="widget music-widget glass-effect">
            <MusicPlayer />
          </div>
        </div>
        
        <div className="content-container">
          <nav className="site-nav glass-effect">
            <div className="nav-profile">
              <div className="profile-avatar">
                {/* 你可以在这里添加你的头像 */}
                <div className="avatar-placeholder">头像</div>
              </div>
              <h3 className="profile-name">你的名字</h3>
              <p className="profile-title">前端开发者 / 博主</p>
            </div>
            
            <ul className="nav-links">
              <li className={activeSection === 'about' ? 'active' : ''}>
                <button onClick={() => handleNavClick('about')}>
                  <span className="nav-icon">🏠</span>
                  <span className="nav-text">关于我</span>
                </button>
              </li>
              <li className={activeSection === 'blog' ? 'active' : ''}>
                <button onClick={() => handleNavClick('blog')}>
                  <span className="nav-icon">📝</span>
                  <span className="nav-text">思考</span>
                </button>
              </li>
              <li className={activeSection === 'reading' ? 'active' : ''}>
                <button onClick={() => handleNavClick('reading')}>
                  <span className="nav-icon">📚</span>
                  <span className="nav-text">阅读</span>
                </button>
              </li>
              <li className={activeSection === 'projects' ? 'active' : ''}>
                <button onClick={() => handleNavClick('projects')}>
                  <span className="nav-icon">💻</span>
                  <span className="nav-text">项目</span>
                </button>
              </li>
              <li className={activeSection === 'contact' ? 'active' : ''}>
                <button onClick={() => handleNavClick('contact')}>
                  <span className="nav-icon">📞</span>
                  <span className="nav-text">联系我</span>
                </button>
              </li>
            </ul>
            
            <div className="social-links">
              <a href="https://github.com/你的用户名" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">GitHub</span>
              </a>
              <a href="https://weibo.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">微博</span>
              </a>
              <a href="https://zhihu.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">知乎</span>
              </a>
            </div>
          </nav>
          
          <main className="main-content">
            {renderContent()}
          </main>
        </div>
      </div>
      
      <footer className="app-footer glass-effect">
        <p>&copy; 2024 我的个人网站 - 版权所有</p>
      </footer>
    </div>
  );
}

export default App;
