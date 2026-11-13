import React from 'react';
import { Link } from 'react-router-dom';
const GameSelector = () => {
  const styles = {
    reset: { boxSizing: 'border-box', margin: 0, padding: 0, fontFamily: "'Tajawal', sans-serif" },
    body: {
      backgroundColor: '#0b0a0d',
      backgroundImage: `
        radial-gradient(circle at 10% 10%, rgba(128, 0, 32, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 90% 90%, rgba(128, 0, 32, 0.2) 0%, transparent 50%)
      `,
      color: '#ffffff',
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      overflowX: 'hidden',
      position: 'relative',
      boxSizing: 'border-box',
    },
    backgroundDecoration: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      background: `
        linear-gradient(135deg, transparent 80%, rgba(212, 175, 55, 0.05) 81%, transparent 82%),
        linear-gradient(45deg, transparent 75%, rgba(128, 0, 32, 0.1) 76%, transparent 77%)
      `,
      pointerEvents: 'none',
      zIndex: 0,
    },
    mainContainer: {
      width: '100%',
      maxWidth: '480px',
      textAlign: 'center',
      zIndex: 1,
      padding: '30px 10px',
      boxSizing: 'border-box',
      fontFamily: "'Tajawal', sans-serif",
    },
    title: {
      fontSize: '26px',
      fontWeight: 800,
      color: '#e5c158',
      textShadow: '0 2px 10px rgba(229, 193, 88, 0.2)',
      marginBottom: '40px',
      letterSpacing: '0.5px',
      margin: '0 0 40px 0',
    },
    gamesGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    gameCard: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '170px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    gameCardHover: {
      transform: 'translateY(-8px)',
    },
    iconBox: {
      width: '100%',
      height: '170px',
      background: 'linear-gradient(145deg, #580c1f, #2d040e)',
      border: '2px solid #e5c158',
      borderRadius: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: `
        0 10px 20px rgba(0, 0, 0, 0.6),
        inset 0 1px 2px rgba(255, 255, 255, 0.2),
        0 0 15px rgba(229, 193, 88, 0.15)
      `,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    },
    iconBoxHover: {
      borderColor: '#ffd700',
      boxShadow: `
        0 15px 30px rgba(128, 0, 32, 0.4),
        0 0 25px rgba(229, 193, 88, 0.4)
      `,
    },
    iconBoxAfter: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: `linear-gradient(
        45deg,
        transparent 45%,
        rgba(255, 255, 255, 0.08) 50%,
        transparent 55%
      )`,
      transform: 'rotate(30deg)',
      pointerEvents: 'none',
    },
    gameTitle: {
      marginTop: '15px',
      fontSize: '20px',
      fontWeight: 700,
      color: '#f1f1f1',
      lineHeight: 1.2,
    },
    gameSubtitle: {
      fontSize: '15px',
      fontWeight: 500,
      color: '#e5c158',
      marginTop: '4px',
      direction: 'ltr',
    },
    gameIcon: {
      width: '100px',
      height: '100px',
      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
    },
  };
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const getCardStyle = (id) => {
    return hoveredCard === id 
      ? { ...styles.gameCard, ...styles.gameCardHover }
      : styles.gameCard;
  };
  const getIconBoxStyle = (id) => {
    return hoveredCard === id
      ? { ...styles.iconBox, ...styles.iconBoxHover }
      : styles.iconBox;
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@500;700;800&display=swap');
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: #0b0a0d;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <div style={styles.body}>
        <div style={styles.backgroundDecoration} />
        <div style={styles.mainContainer}>
          <h1 style={styles.title}>اختر لعبتك المفضلة</h1>
          <div style={styles.gamesGrid}>
            <Link 
              to="/puzzle" 
              style={getCardStyle('puzzle')}
              onMouseEnter={() => setHoveredCard('puzzle')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={getIconBoxStyle('puzzle')}>
                <div style={styles.iconBoxAfter} />
                <svg style={styles.gameIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 25,25 H 45 A 8,8 0 0,1 45,35 A 8,8 0 0,1 45,25 H 55 V 45 A 8,8 0 0,1 65,45 A 8,8 0 0,1 55,45 V 55 H 25 Z" fill="#800020" stroke="#e5c158" strokeWidth={2} />
                  <path d="M 45,25 H 75 V 55 H 55 V 45 A 8,8 0 0,0 45,45 A 8,8 0 0,0 55,45 V 25" fill="#1f181b" stroke="#e5c158" strokeWidth={2} />
                  <path d="M 25,55 H 55 V 85 H 25 Z" fill="#500014" stroke="#e5c158" strokeWidth={2} />
                  <path d="M 55,55 H 85 V 85 H 55 Z" fill="#2a2226" stroke="#e5c158" strokeWidth={2} />
                </svg>
              </div>
              <div style={styles.gameTitle}>لعبة الفازل</div>
              <div style={styles.gameSubtitle}>(Puzzle)</div>
            </Link>
            <Link 
              to="/matching" 
              style={getCardStyle('matching')}
              onMouseEnter={() => setHoveredCard('matching')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={getIconBoxStyle('matching')}>
                <div style={styles.iconBoxAfter} />
                <svg style={styles.gameIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="rotate(-12 40 50)">
                    <rect x={20} y={20} width={42} height={60} rx={6} fill="#1f181b" stroke="#e5c158" strokeWidth={2} />
                    <text x={41} y={58} fontSize={22} fontWeight="bold" fill="#e5c158" textAnchor="middle" fontFamily="Arial, sans-serif">M</text>
                  </g>
                  <g transform="rotate(10 60 50)">
                    <rect x={38} y={20} width={42} height={60} rx={6} fill="#800020" stroke="#e5c158" strokeWidth={2} />
                    <path d="M 59,42 L 64,52 L 54,52 Z" fill="#e5c158" />
                    <path d="M 59,60 L 64,50 L 54,50 Z" fill="#e5c158" />
                  </g>
                </svg>
              </div>
              <div style={styles.gameTitle}>لعبة التشابه</div>
              <div style={styles.gameSubtitle}>(Matching)</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default GameSelector;