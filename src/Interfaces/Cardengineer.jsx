import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import img8 from './images/8.jpg';
import cardBack from './images/cg.png';
const SAMPLE_IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8];
const CARD_BACK_IMAGE = cardBack;
const CardEngineer = () => {
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
    const selectedImages = SAMPLE_IMAGES.slice(0, pairCount);
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
  }, []);
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
  const styles = {
    container: {
      backgroundColor: '#130307',
      backgroundImage: `
        radial-gradient(circle at 50% 20%, rgba(128, 0, 32, 0.25) 0%, transparent 60%),
        linear-gradient(135deg, transparent 80%, rgba(212, 175, 55, 0.05) 81%, transparent 82%)
      `,
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
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
      border: '1px solid #ffd700',
      boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
      transform: `translate(${(index % 4) * 2 - 4}px, ${Math.floor(index / 2) * -2}px) rotate(${(index % 3 - 1) * 3}deg)`,
      zIndex: index + 1,
      objectFit: 'cover',
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
      backgroundColor: 'transparent',
      transform: 'rotateY(180deg)',
    },
    cardBack: {
      backgroundColor: '#2b0610',
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
            <img
              key={idx}
              src={CARD_BACK_IMAGE}
              alt="Matched Back"
              style={styles.stackedCard(idx)}
            />
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
                    <img src={CARD_BACK_IMAGE} alt="Back" style={styles.img} />
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
export default CardEngineer;