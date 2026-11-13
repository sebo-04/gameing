import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cgImg from './images/cg.png';
const CardSelection = () => {
  const navigate = useNavigate();
  const EXPIRATION_DATE = new Date('2027-9-18 T00:00:00');
  const [isTopCardVisible, setIsTopCardVisible] = useState(true);
  useEffect(() => {
    const checkExpiration = () => {
      const now = new Date();
      if (now >= EXPIRATION_DATE) {
        setIsTopCardVisible(false);
      } else {
        setIsTopCardVisible(true);
      }
    };
    checkExpiration();
    const interval = setInterval(checkExpiration, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    if (files.length !== 8) {
      alert('الرجاء اختيار 8 صور بالضبط لبدء اللعبة!');
      return;
    }
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    navigate('/matching-custom', { state: { customImages: imageUrls } });
  };
  const topCard = {
    id: 2,
    title: 'هندسة مدنية',
    image: cgImg,
    path: '/card-engineer',
    active: false,
  };
  const styles = {
    container: {
      backgroundColor: '#0b0a0d',
      backgroundImage: `
        radial-gradient(circle at 50% 20%, rgba(128, 0, 32, 0.25) 0%, transparent 60%),
        radial-gradient(circle at 10% 80%, rgba(128, 0, 32, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 90% 90%, rgba(80, 0, 20, 0.2) 0%, transparent 50%)
      `,
      minHeight: '100vh',
      width: '100vw',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Tajawal', sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'rgba(31, 24, 27, 0.8)',
      color: '#e5c158',
      border: '1px solid rgba(229, 193, 88, 0.4)',
      borderRadius: '20px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      zIndex: 10,
      backdropFilter: 'blur(5px)',
      transition: 'all 0.3s ease',
    },
    backgroundDecoration: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        linear-gradient(135deg, transparent 75%, rgba(212, 175, 55, 0.03) 76%, transparent 77%),
        linear-gradient(45deg, transparent 70%, rgba(128, 0, 32, 0.08) 71%, transparent 73%)
      `,
      pointerEvents: 'none',
      zIndex: 0,
    },
    gameSymbolOverlay: {
      position: 'absolute',
      bottom: '-50px',
      right: '-50px',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      border: '2px solid rgba(128, 0, 32, 0.15)',
      background: 'radial-gradient(circle, rgba(128, 0, 32, 0.12) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 0,
    },
    contentWrapper: {
      zIndex: 1,
      width: '100%',
      maxWidth: '480px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      color: '#e5c158',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '25px',
      textShadow: '0 2px 10px rgba(229, 193, 88, 0.3)',
      textAlign: 'center',
    },
    cardsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      width: '100%',
    },
    cardButton: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      maxWidth: '200px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    cardImageWrapper: (isActive) => ({
      width: '100%',
      height: '220px',
      borderRadius: '16px',
      overflow: 'hidden',
      border: isActive ? '2px solid #ffd700' : '1px solid rgba(229, 193, 88, 0.3)',
      boxShadow: isActive
        ? '0 0 18px rgba(229, 193, 88, 0.4), inset 0 0 10px rgba(229, 193, 88, 0.2)'
        : '0 4px 12px rgba(0, 0, 0, 0.6)',
      backgroundColor: '#1f181b',
      position: 'relative',
    }),
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    customCardDesign: {
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 50% 50%, #4a0618 0%, #1a0108 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxSizing: 'border-box',
    },
    cardTitle: {
      marginTop: '10px',
      color: '#e5c158',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    fileInput: {
      display: 'none',
    },
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
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => navigate('/')}>
          ➔
        </button>
        <div style={styles.backgroundDecoration} />
        <div style={styles.gameSymbolOverlay} />
        <div style={styles.contentWrapper}>
          <h2 style={styles.title}>اختر شكل البطاقة</h2>
          <div style={styles.cardsContainer}>
            {isTopCardVisible && (
              <Link to={topCard.path} style={styles.cardButton}>
                <div style={styles.cardImageWrapper(topCard.active)}>
                  <img src={topCard.image} alt={topCard.title} style={styles.cardImage} />
                </div>
                <span style={styles.cardTitle}>{topCard.title}</span>
              </Link>
            )}
            <label style={styles.cardButton}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={styles.fileInput}
              />
              <div style={styles.cardImageWrapper(false)}>
                <div style={styles.customCardDesign}>
                  <svg width="100%" height="100%" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="92" height="132" rx="6" stroke="#e5c158" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
                    <rect x="8" y="8" width="84" height="124" rx="4" stroke="#e5c158" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />      
                    <path d="M12 20 L20 12 M12 12 L24 12 L12 24" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
                    <path d="M88 20 L80 12 M88 12 L76 12 L88 24" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
                    <path d="M12 120 L20 128 M12 128 L24 128 L12 116" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
                    <path d="M88 120 L80 128 M88 128 L76 128 L88 116" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
                    <pattern id="cardGridBtn" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 10 M 0 0 L 10 10" fill="none" stroke="#e5c158" strokeWidth="0.3" strokeOpacity="0.25" />
                    </pattern>
                    <rect x="12" y="12" width="76" height="116" fill="url(#cardGridBtn)" />
                    <g transform="translate(50, 70)">
                      <polygon points="0,-22 16,0 0,22 -16,0" stroke="#e5c158" strokeWidth="1.5" fill="#3b0312" />
                      <polygon points="0,-15 11,0 0,15 -11,0" fill="#e5c158" fillOpacity="0.2" stroke="#e5c158" strokeWidth="0.8" />
                      <circle cx="0" cy="0" r="4" fill="#e5c158" />
                    </g>
                  </svg>
                </div>
              </div>
              <span style={styles.cardTitle}>اختر صورة من عندك للعب</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardSelection;