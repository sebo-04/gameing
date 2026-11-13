import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import card1 from './images/1t.png';
import card2 from './images/2t.png';
import card3 from './images/3t.png';
import card4 from './images/4t.png';
import card5 from './images/5t.png';
import card6 from './images/6t.png';
import card7 from './images/7t.png';
import card8 from './images/8t.png';
const DEFAULT_SAMPLE_IMAGES = [card1, card2, card3, card4, card5, card6, card7, card8];
const CustomGame = () => {
  const location = useLocation();
  const customImages = location.state?.customImages || DEFAULT_SAMPLE_IMAGES;
  const [difficulty, setDifficulty] = useState('hard');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const initializeGame = (level) => {
    setDifficulty(level);
    let pairCount = 8;
    if (level === 'easy') pairCount = 4;
    if (level === 'medium') pairCount = 6;
    const selectedImages = customImages.slice(0, pairCount);
    const deck = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({
        id: index,
        image: img,
        pairId: img,
      }));
    setCards(deck);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsProcessing(false);
  };
  useEffect(() => {
    initializeGame('hard');
  }, [customImages]);
  const handleCardClick = (index) => {
    if (
      isProcessing || 
      flippedCards.includes(index) || 
      matchedPairs.some((p) => p.id === cards[index].id)
    ) {
      return;
    }
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].pairId === cards[secondIndex].pairId) {
        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, cards[firstIndex], cards[secondIndex]]);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1200);
      }
    }
  };
  const isGameWon = cards.length > 0 && matchedPairs.length === cards.length;
 const CardBackDesign = () => (
    <div style={styles.customCardBack}>
      <svg width="100%" height="100%" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="92" height="132" rx="6" stroke="#e5c158" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
        <rect x="8" y="8" width="84" height="124" rx="4" stroke="#e5c158" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
        <path d="M12 20 L20 12 M12 12 L24 12 L12 24" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M88 20 L80 12 M88 12 L76 12 L88 24" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M12 120 L20 128 M12 128 L24 128 L12 116" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M88 120 L80 128 M88 128 L76 128 L88 116" stroke="#e5c158" strokeWidth="1" strokeOpacity="0.7" />
  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 10 M 0 0 L 10 10" fill="none" stroke="#e5c158" strokeWidth="0.3" strokeOpacity="0.25" />
        </pattern>
        <rect x="12" y="12" width="76" height="116" fill="url(#grid)" />
  <g transform="translate(50, 70)">
          <polygon points="0,-22 16,0 0,22 -16,0" stroke="#e5c158" strokeWidth="1.5" fill="#3b0312" />
          <polygon points="0,-15 11,0 0,15 -11,0" fill="#e5c158" fillOpacity="0.2" stroke="#e5c158" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="4" fill="#e5c158" />
        </g>
      </svg>
    </div>
  );
  const styles = {
    container: {
      backgroundColor: '#130307',
      backgroundImage: `
        radial-gradient(circle at 50% 20%, rgba(128, 0, 32, 0.25) 0%, transparent 60%),
        linear-gradient(135deg, transparent 80%, rgba(212, 175, 55, 0.05) 81%, transparent 82%)
      `,
      minHeight: '100vh',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 15px',
      fontFamily: "'Tajawal', sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      width: '36px',
      height: '36px',
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
    topSection: {
      width: '100%',
      maxWidth: '360px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
      marginBottom: '25px',
    },
    difficultyButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    btn: {
      border: 'none',
      borderRadius: '12px',
      padding: '8px 20px',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '13px',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
      transition: 'transform 0.2s, opacity 0.2s',
    },
    easyBtn: { backgroundColor: '#2ecc71' },
    mediumBtn: { backgroundColor: '#e67e22' },
    hardBtn: { backgroundColor: '#e74c3c' },

    matchedBox: {
      width: '85px',
      height: '115px',
      backgroundColor: '#3a3a3a',
      borderRadius: '10px',
      border: '2px dashed #e5c158',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
    },
    stackedCard: (index) => ({
      position: 'absolute',
      width: '65px',
      height: '90px',
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid #ffd700',
      boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
      transform: `translate(${(index % 4) * 2 - 4}px, ${Math.floor(index / 2) * -2}px) rotate(${(index % 3) * 3}deg)`,
      zIndex: index + 1,
    }),
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      width: '100%',
      maxWidth: '360px',
      justifyContent: 'center',
      margin: '0 auto',
    },
    cardWrapper: {
      aspectRatio: '3/4',
      perspective: '1000px',
      cursor: 'pointer',
    },
    cardInner: (isFlipped) => ({
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.5s',
      transformStyle: 'preserve-3d',
      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    }),
    cardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1.5px solid #ffd700',
      boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
    },
    cardFront: {
      backgroundColor: '#fff',
      transform: 'rotateY(180deg)',
    },
    cardBack: {
      backgroundColor: '#2b0610',
    },
    customCardBack: {
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 50% 50%, #4a0618 0%, #1a0108 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    successCard: {
      width: '100%',
      maxWidth: '360px',
      padding: '24px 16px',
      borderRadius: '12px',
      background: 'radial-gradient(circle at 50% 50%, #27ae60 0%, #134e23 100%)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
      color: '#ffffff',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      margin: '20px 0',
    },
    successCardLines: {
      position: 'absolute',
      top: '-20px',
      left: '-20px',
      right: '-20px',
      bottom: '-20px',
      backgroundImage: `
        linear-gradient(25deg, transparent 48%, rgba(255,255,255,0.25) 49%, rgba(255,255,255,0.25) 51%, transparent 52%),
        linear-gradient(-35deg, transparent 48%, rgba(255,255,255,0.25) 49%, rgba(255,255,255,0.25) 51%, transparent 52%),
        linear-gradient(75deg, transparent 48%, rgba(255,255,255,0.2) 49%, rgba(255,255,255,0.2) 51%, transparent 52%)
      `,
      pointerEvents: 'none',
    },
  };
  return (
    <div style={styles.container}>
      <Link to="/matching" style={styles.backButton}>&#10095;</Link>
      <div style={styles.topSection}>
        <div style={styles.difficultyButtons}>
          <button
            style={{
              ...styles.btn,
              ...styles.easyBtn,
              opacity: difficulty === 'easy' ? 1 : 0.5,
              transform: difficulty === 'easy' ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => initializeGame('easy')}
          >
            سهل (8)
          </button>
          <button
            style={{
              ...styles.btn,
              ...styles.mediumBtn,
              opacity: difficulty === 'medium' ? 1 : 0.5,
              transform: difficulty === 'medium' ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => initializeGame('medium')}
          >
            متوسط (12)
          </button>
          <button
            style={{
              ...styles.btn,
              ...styles.hardBtn,
              opacity: difficulty === 'hard' ? 1 : 0.5,
              transform: difficulty === 'hard' ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => initializeGame('hard')}
          >
            صعب (16)
          </button>
        </div>
        <div style={styles.matchedBox}>
          {matchedPairs.length === 0 && (
            <span style={{ fontSize: '11px', color: '#aaa', textAlign: 'center' }}>
              المجموعة
            </span>
          )}
          {matchedPairs.map((_, idx) => (
            <div key={idx} style={styles.stackedCard(idx)}>
              <CardBackDesign />
            </div>
          ))}
        </div>
      </div>
      {isGameWon ? (
        <div style={styles.successCard}>
          <div style={styles.successCardLines} />
          🎉🎉👏👏 لدينا فائز
        </div>
      ) : (
        <div style={styles.gridContainer}>
          {cards.map((card, index) => {
            const isFlipped = flippedCards.includes(index);
            const isMatched = matchedPairs.some((p) => p.id === card.id);
            if (isMatched) {
              return <div key={card.id} style={{ opacity: 0, pointerEvents: 'none' }} />;
            }
            return (
              <div
                key={card.id}
                style={styles.cardWrapper}
                onClick={() => handleCardClick(index)}
              >
                <div style={styles.cardInner(isFlipped)}>
                  <div style={{ ...styles.cardFace, ...styles.cardBack }}>
                    <CardBackDesign />
                  </div>
                  <div style={{ ...styles.cardFace, ...styles.cardFront }}>
                    <img src={card.image} alt="Front" style={styles.img} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default CustomGame;