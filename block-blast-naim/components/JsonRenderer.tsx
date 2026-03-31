import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UIConfig } from '../hooks/useAIChat';

interface JsonRendererProps {
  uiConfig: UIConfig;
  sampleGrid: any[][];
  upcomingPieces: any[];
}

const CELL_SIZE = 38;

export default function JsonRenderer({ uiConfig, sampleGrid, upcomingPieces }: JsonRendererProps) {
  const isLight = uiConfig.theme === 'light';
  
  const renderCell = (color: string | null, key: string, size = CELL_SIZE, isSmall = false) => {
    return (
      <TouchableOpacity 
        key={key} 
        style={[
          styles.cell, 
          { width: size, height: size },
          color ? { backgroundColor: color, shadowColor: color, borderColor: 'rgba(255,255,255,0.2)' } : null,
          color ? styles.filledCell : { borderColor: isLight ? '#e2e8f0' : '#1a2440', backgroundColor: isLight ? '#edf2f7' : '#121a2f' },
          isSmall && styles.smallCell
        ]}
        activeOpacity={0.8}
      />
    );
  };

  const renderUpcomingPiece = (piece: any, index: number) => {
    const pieceSize = 20;
    // Update piece color dynamically based on its original key color
    let displayColor = piece.color;
    if (piece.color === '#ff4757') displayColor = uiConfig.blockColors.red;
    if (piece.color === '#5352ed') displayColor = uiConfig.blockColors.blue;
    if (piece.color === '#2ed573') displayColor = uiConfig.blockColors.green;

    return (
      <View key={`piece-${index}`} style={styles.upcomingPieceContainer}>
        {piece.shape.map((row: number[], rIdx: number) => (
          <View key={`r-${rIdx}`} style={styles.row}>
            {row.map((cell: number, cIdx: number) => (
              <View 
                key={`c-${cIdx}`} 
                style={[
                  styles.miniCell, 
                  { width: pieceSize, height: pieceSize },
                  cell ? { backgroundColor: displayColor, shadowColor: displayColor } : { backgroundColor: 'transparent', borderColor: 'transparent'}
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Score Section */}
      {uiConfig.showScoreCard && (
        <View style={styles.scoreSection}>
          <View style={[styles.scoreCard, { backgroundColor: isLight ? '#fff' : '#131b2f', borderColor: isLight ? '#cbd5e0' : '#1a2035' }]}>
            <Text style={[styles.scoreLabel, { color: isLight ? '#4a5568' : '#a0aec0' }]}>CURRENT SCORE</Text>
            <Text style={[styles.scoreValue, { color: isLight ? '#1a202c' : '#fff' }]}>12,480</Text>
          </View>
          <View style={[styles.scoreCard, { backgroundColor: isLight ? '#fff' : '#131b2f', borderColor: isLight ? '#cbd5e0' : '#1a2035' }]}>
            <Text style={[styles.scoreLabel, { color: isLight ? '#4a5568' : '#a0aec0' }]}>HIGH SCORE</Text>
            <Text style={styles.scoreValueSecondary}>45,000</Text>
          </View>
        </View>
      )}

      {/* Game Board */}
      <View style={styles.boardContainer}>
        <View style={[styles.board, { backgroundColor: isLight ? '#e2e8f0' : '#0d1326', borderColor: isLight ? '#cbd5e0' : '#1a2035' }]}>
          {sampleGrid.slice(0, uiConfig.gridSize).map((row, r) => (
            <View key={`row-${r}`} style={styles.row}>
              {row.slice(0, uiConfig.gridSize).map((cellObj, c) => {
                let cellColor = cellObj;
                // Apply dynamic theme colors if matched
                if (cellColor === '#ff4757') cellColor = uiConfig.blockColors.red;
                if (cellColor === '#5352ed') cellColor = uiConfig.blockColors.blue;
                if (cellColor === '#2ed573') cellColor = uiConfig.blockColors.green;
                return renderCell(cellColor, `cell-${r}-${c}`);
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Upcoming Pieces */}
      <View style={[styles.upcomingPanel, { backgroundColor: isLight ? '#fff' : '#131b2f', borderColor: isLight ? '#cbd5e0' : '#1a2035' }]}>
        {upcomingPieces.map((piece, i) => renderUpcomingPiece(piece, i))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 15,
  },
  scoreCard: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  scoreValueSecondary: {
    color: '#ffcc00',
    fontSize: 22,
    fontWeight: 'bold',
  },
  boardContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  board: {
    padding: 4,
    borderRadius: 12,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  filledCell: {
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
  },
  smallCell: {
    borderRadius: 4,
  },
  upcomingPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginTop: 15,
    borderWidth: 1,
  },
  upcomingPieceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  miniCell: {
    margin: 1,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
});
