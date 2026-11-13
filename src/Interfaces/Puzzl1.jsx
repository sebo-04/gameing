import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PUZZLE_IMAGE from './images/p1.jpg';
const PuzzlP1 = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');
  const [gridSize, setGridSize] = useState({ rows: 2, cols: 2 });
  const [pieces, setPieces] = useState([]);
  const [boardSlots, setBoardSlots] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const initGame = (level) => {
    setCurrentDifficulty(level);
    setSelectedPiece(null);
    setShowErrorCard(false);
    setShowSuccessCard(false);
    let rows = 2, cols = 2;
    if (level === 'medium') { rows = 3; cols = 3; }
    if (level === 'hard') { rows = 4; cols = 4; }
    setGridSize({ rows, cols });
    const totalPieces = rows * cols;
    const newPieces = [];
    for (let i = 0; i < totalPieces; i++) {
      newPieces.push({
        id: i,
        correctIndex: i,
        row: Math.floor(i / cols),
        col: i % cols,
      });
    }
    const shuffled = [...newPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setBoardSlots(Array(totalPieces).fill(null));
  };
  useEffect(() => {
    initGame('easy');
  }, []);
  const handleSlotClick = (targetIndex) => {
    if (boardSlots[targetIndex]) {
      const pieceToRemove = boardSlots[targetIndex];
      const updatedSlots = [...boardSlots];
      updatedSlots[targetIndex] = null;
      setBoardSlots(updatedSlots);
      setPieces((prev) => [...prev, pieceToRemove]);
      setShowErrorCard(false);
      setShowSuccessCard(false);
      return;
    }
    if (selectedPiece) {
      const updatedSlots = [...boardSlots];
      updatedSlots[targetIndex] = selectedPiece;
      setBoardSlots(updatedSlots);
      setPieces((prevPieces) => prevPieces.filter((p) => p.id !== selectedPiece.id));
      setSelectedPiece(null);
      const filledCount = updatedSlots.filter((slot) => slot !== null).length;
      if (filledCount === gridSize.rows * gridSize.cols) {
        const hasError = updatedSlots.some((slot, idx) => slot && slot.correctIndex !== idx);
        if (hasError) {
          setShowErrorCard(true);
          setShowSuccessCard(false);
        } else {
          setShowSuccessCard(true);
          setShowErrorCard(false);
        }
      }
    }
  };
  const handlePieceClick = (piece) => {
    if (selectedPiece && selectedPiece.id === piece.id) {
      setSelectedPiece(null); 
    } else {
      setSelectedPiece(piece);
    }
  };
  const pieceWidth = 320 / gridSize.cols;
  const pieceHeight = 320 / gridSize.rows;
  const getTrayPieceStyle = (piece) => {
    const isSelected = selectedPiece && selectedPiece.id === piece.id;
    const bgPosX = gridSize.cols > 1 ? (piece.col / (gridSize.cols - 1)) * 100 : 0;
    const bgPosY = gridSize.rows > 1 ? (piece.row / (gridSize.rows - 1)) * 100 : 0;
    return {
      width: '60px',
      height: '60px',
      flexShrink: 0,
      borderRadius: '8px',
      border: isSelected ? '3px solid #00ffcc' : '1.5px solid #ffd700',
      cursor: 'pointer',
      boxShadow: isSelected ? '0 0 12px #00ffcc' : '0 4px 8px rgba(0,0,0,0.5)',
      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.2s ease',
      backgroundImage: `url(${PUZZLE_IMAGE})`,
      backgroundSize: `${gridSize.cols * 100}% ${gridSize.rows * 100}%`,
      backgroundPosition: `${bgPosX}% ${bgPosY}%`,
    };
  };
  const styles = {
    body: {
      backgroundColor: '#130307',
      backgroundImage: `
        radial-gradient(circle at 50% 20%, rgba(128, 0, 32, 0.25) 0%, transparent 60%),
        linear-gradient(135deg, transparent 80%, rgba(212, 175, 55, 0.05) 81%, transparent 82%)
      `,
      minHeight: '100vh',
      width: '100%',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 15px',
      fontFamily: "'Tajawal', sans-serif",
      position: 'relative',
      boxSizing: 'border-box',
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
      cursor: 'pointer',
    },
    contentWrapper: {
      width: '100%',
      maxWidth: '340px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    topSection: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    difficultyButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    btn: (isActive, bgColor) => ({
      border: 'none',
      borderRadius: '12px',
      padding: '8px 18px',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '13px',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
      transition: 'transform 0.2s, opacity 0.2s',
      width: '100px',
      textAlign: 'center',
      backgroundColor: bgColor,
      opacity: isActive ? 1 : 0.5,
      transform: isActive ? 'scale(1.05)' : 'scale(1)',
    }),
    previewBox: {
      width: '90px',
      height: '90px',
      borderRadius: '8px',
      border: '2px solid #ffd700',
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
    },
    previewImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    boardContainer: {
      width: '320px',
      height: '320px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '3px solid #e5c158',
      display: 'grid',
      gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
      gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
      gap: showSuccessCard ? '0px' : '2px',
      padding: showSuccessCard ? '0px' : '2px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
      marginBottom: '20px',
      direction: 'ltr',
      transition: 'all 0.3s ease',
    },
    boardSlot: {
      backgroundColor: showSuccessCard ? 'transparent' : 'rgba(230, 230, 230, 0.4)',
      border: showSuccessCard ? 'none' : '1px dashed #ccc',
      position: 'relative',
      overflow: 'hidden',
      cursor: showSuccessCard ? 'default' : 'pointer',
    },
    bottomTray: {
      width: '100%',
      height: '90px',
      backgroundColor: 'rgba(20, 10, 15, 0.8)',
      border: '2px solid #e5c158',
      borderRadius: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: pieces.length < 4 ? 'center' : 'flex-start',
      gap: '12px',
      padding: '0 15px',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      boxShadow: '0 6px 15px rgba(0,0,0,0.7)',
    },
    placedPiece: (col, row) => ({
      width: '100%',
      height: '100%',
      backgroundImage: `url(${PUZZLE_IMAGE})`,
      backgroundSize: '320px 320px',
      backgroundPosition: `-${col * pieceWidth}px -${row * pieceHeight}px`,
    }),
    errorCard: {
      width: '320px',
      padding: '16px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #70000d 0%, #2b0005 100%)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
      color: '#ffffff',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      position: 'relative',
      overflow: 'hidden',
    },
    errorCardLines: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '1px solid rgba(255,255,255,0.15)',
      transform: 'rotate(-5deg) scale(1.2)',
      pointerEvents: 'none',
    },
    successCard: {
      width: '320px',
      padding: '20px 16px',
      borderRadius: '12px',
      background: 'radial-gradient(circle at 50% 50%, #27ae60 0%, #134e23 100%)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
      color: '#ffffff',
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '15px',
      position: 'relative',
      overflow: 'hidden',
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
    <div style={styles.body}>
      <Link to="/puzzle" style={styles.backButton}>&#10095;</Link>
      <div style={styles.contentWrapper}>
        <div style={styles.topSection}>
          <div style={styles.difficultyButtons}>
            <button
              style={styles.btn(currentDifficulty === 'easy', '#2ecc71')}
              onClick={() => initGame('easy')}
            >
              سهل (4)
            </button>
            <button
              style={styles.btn(currentDifficulty === 'medium', '#e67e22')}
              onClick={() => initGame('medium')}
            >
              متوسط (9)
            </button>
            <button
              style={styles.btn(currentDifficulty === 'hard', '#e74c3c')}
              onClick={() => initGame('hard')}
            >
              صعب (16)
            </button>
          </div>
          <div style={styles.previewBox}>
            <img src={PUZZLE_IMAGE} alt="Preview" style={styles.previewImage} />
          </div>
        </div>
        {showErrorCard && (
          <div style={styles.errorCard}>
            <div style={styles.errorCardLines} />
            لديك خطأ في الصورة قم بتعديله
          </div>
        )}
        {showSuccessCard && (
          <div style={styles.successCard}>
            <div style={styles.successCardLines} />
            لقد نجحت
          </div>
        )}
        <div style={styles.boardContainer}>
          {boardSlots.map((slotPiece, index) => (
            <div
              key={index}
              style={styles.boardSlot}
              onClick={() => handleSlotClick(index)}
            >
              {slotPiece && (
                <div style={styles.placedPiece(slotPiece.col, slotPiece.row)} />
              )}
            </div>
          ))}
        </div>
        <div style={styles.bottomTray}>
          {pieces.map((piece) => (
            <div
              key={piece.id}
              style={getTrayPieceStyle(piece)}
              onClick={() => handlePieceClick(piece)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PuzzlP1;