import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import p1Img from './images/p1.jpg';
import p2Img from './images/p2.jpg';
import p4Img from './images/p4.jpg';
const PuzzleSelection = () => {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const EXPIRATION_DATE = new Date('2027-9-18 T00:00:00');
  const now = new Date();
  const isExpired = now > EXPIRATION_DATE;
  const puzzles = [
    {
      id: 1,
      title: 'p1',
      image: p1Img,
      path: '/puzzle-game/p1',
      positionStyle: { top: '0', right: '0' },
    },
    {
      id: 2,
      title: 'p2',
      image: p2Img,
      path: '/puzzle-game/p2',
      positionStyle: { top: '100px', left: '0' },
    },
    {
      id: 3,
      title: 'p3',
      image: p4Img,
      path: '/puzzle-game/p3',
      positionStyle: { top: '220px', right: '0' },
    },
  ];
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      navigate('/puzzle-game/custom', { state: { customImage: imageUrl } });
    }
  };
  const handlePedestalClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const styles = {
    container: {
      backgroundColor: '#0b0a0d',
      backgroundImage: `
        radial-gradient(circle at 50% 30%, rgba(128, 0, 32, 0.25) 0%, transparent 60%),
        radial-gradient(circle at 10% 80%, rgba(80, 0, 20, 0.2) 0%, transparent 50%)
      `,
      minHeight: '100vh',
      width: '100vw',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isExpired ? 'center' : 'flex-start',
      padding: '20px 15px',
      fontFamily: "'Tajawal', sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      border: '1px solid #ffd700',
      backgroundColor: 'rgba(20, 10, 15, 0.6)',
      color: '#ffd700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      fontSize: '18px',
      boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)',
      zIndex: 10,
    },
    title: {
      color: '#e5c158',
      fontSize: '22px',
      fontWeight: 'bold',
      marginTop: isExpired ? '0' : '40px',
      marginBottom: '20px',
      textShadow: '0 2px 8px rgba(229, 193, 88, 0.3)',
      textAlign: 'center',
    },
    cardsWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: '340px',
      height: '420px',
      marginTop: '10px',
    },
    cardItem: {
      position: 'absolute',
      width: '180px',
      textDecoration: 'none',
      transition: 'transform 0.3s ease',
    },
    cardImageFrame: {
      width: '100%',
      height: '160px',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1.5px solid #ffd700',
      backgroundColor: '#1f181b',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.7), inset 0 0 10px rgba(128, 0, 32, 0.5)',
      position: 'relative',
    },
    cardImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    selectBadge: {
      position: 'absolute',
      bottom: '-12px',
      right: '-10px',
      background: 'linear-gradient(135deg, rgba(229, 193, 88, 0.9), rgba(128, 0, 32, 0.8))',
      padding: '4px 20px',
      borderRadius: '20px',
      color: '#ffffff',
      fontSize: '13px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      border: '1px solid #ffd700',
      transform: 'rotate(-5deg)',
    },
    pedestalSection: {
      marginTop: isExpired ? '20px' : 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      paddingBottom: '20px',
    },
    puzzlePieceGlow: {
      width: isExpired ? '130px' : '90px',
      height: isExpired ? '130px' : '90px',
      background: 'linear-gradient(145deg, #800020, #30000a)',
      border: '2px solid #ffd700',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: isExpired 
        ? '0 0 35px rgba(229, 193, 88, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.4)' 
        : '0 0 25px rgba(229, 193, 88, 0.6), inset 0 0 15px rgba(255, 215, 0, 0.3)',
      transform: 'rotate(15deg)',
      zIndex: 2,
      transition: 'all 0.3s ease',
    },
    startText: {
      marginTop: '25px',
      color: '#e5c158',
      fontSize: '20px',
      fontWeight: 'bold',
      textShadow: '0 2px 8px rgba(229, 193, 88, 0.4)',
      letterSpacing: '1px',
    }
  };
  return (
    <>
      <style>{`
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
        <Link to="/" style={styles.backButton}>
          &#10095;
        </Link>
        <h2 style={styles.title}>اختر صورتك للتركيب</h2>
        {!isExpired && (
          <div style={styles.cardsWrapper}>
            {puzzles.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                style={{ ...styles.cardItem, ...item.positionStyle }}
              >
                <div style={styles.cardImageFrame}>
                  <img src={item.image} alt={item.title} style={styles.cardImg} />
                  <div style={styles.selectBadge}>
                    Select <span>&#10095;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <div style={styles.pedestalSection} onClick={handlePedestalClick}>
          <div style={styles.puzzlePieceGlow}>
            <svg 
              width={isExpired ? "65" : "45"} 
              height={isExpired ? "65" : "45"} 
              viewBox="0 0 24 24" 
              fill="#ffd700"
            >
              <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5H2v4c0 1.1.9 2 2 2h4v-1.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V21h4c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/>
            </svg>
          </div>
          <span style={styles.startText}>اختر صورة من عندك للعب </span>
        </div>
      </div>
    </>
  );
};
export default PuzzleSelection;