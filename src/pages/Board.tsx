import { Chess } from 'chess.js';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { useConst } from '../components/AnimatedHelpers';

import Background from './Background';
import { SIZE } from './Notation';
import Piece from './Piece';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: 'w',
    board: chess.board(),
  });
  const onTurn = useCallback(() => {
    setState({
      player: state.player == 'w' ? 'b' : 'w',
      board: chess.board(),
    });
  }, [chess, state.player]);
  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, i) =>
        row.map((square, j) => {
          if (square === null) {
            return null;
          }
          return (
            <Piece
              enabled={state.player === square.color}
              onTurn={onTurn}
              chess={chess}
              key={`${i}-${j}`}
              position={{ x: j * SIZE, y: i * SIZE }}
              id={`${square.color}${square.type}` as const}
            />
          );
        }),
      )}
    </View>
  );
};

export default Board;
