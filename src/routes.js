import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({});
});

routes.post('/sendMessage', (req, res) => {
  const { message } = req.body;
  req.messages.push(message);
  Object.keys(req.conncetedUsers).forEach(user => {
    req.io.to(req.conncetedUsers[user]).emit('newMessage', message);
  });
  return res.json(req.messages);
});

routes.post('/validateMove', (req, res) => {
  const { previousRow, previousColumn, row, column, player } = req.body;
  const previous = req.positions[previousRow].squares[previousColumn];
  const current = req.positions[row].squares[column];
  if (current.isEmpity) {
    if (previous.isEmpity) {
      return res.json('ok');
    }
    if (previous.player !== player) {
      return res.json('ok');
    }
    // if (
    //   (!player && req.currentTurn !== req.players.number_1) ||
    //   (player && req.currentTurn !== req.players.number_2)
    // ) {
    //   console.log(req.currentTurn === req.players.number_1);
    //   console.log(req.currentTurn === req.players.number_2);
    //   console.log(player);
    //   return res.json('ok');
    // }
    if (!player) {
      if (
        (row <= 8 &&
          column % 2 === 0 &&
          column >= previousColumn - 2 &&
          column <= previousColumn + 2 &&
          row >= previousRow - 1 &&
          row <= previousRow + 1) ||
        (row > 8 &&
          column % 2 !== 0 &&
          column >= previousColumn - 2 &&
          column <= previousColumn + 2 &&
          row >= previousRow - 1 &&
          row <= previousRow + 1)
      ) {
        req.positions[row].squares[column] = {
          position: current.position,
          isEmpity: false,
          isCaptain: previous.isCaptain,
          captainColor: previous.captainColor,
          pawnColor: previous.pawnColor,
          color: current.color,
          player,
        };
        req.positions[previousRow].squares[previousColumn] = {
          ...previous,
          isEmpity: true,
        };
        req.currentTurn = req.players.number_2;
        // TODO: por aqui verificação de adjacencias para captura
      } else {
        req.io
          .to(
            req.conncetedUsers[
              player ? req.players.number_2 : req.players.number_1
            ]
          )
          .emit('invalidMovement');
        return res.json({});
      }
    } else if (
      (player &&
        row <= 8 &&
        column % 2 !== 0 &&
        column >= previousColumn - 2 &&
        column <= previousColumn + 2 &&
        row >= previousRow - 1 &&
        row <= previousRow + 1) ||
      (player &&
        row > 8 &&
        column % 2 === 0 &&
        column >= previousColumn - 2 &&
        column <= previousColumn + 2 &&
        row >= previousRow - 1 &&
        row <= previousRow + 1)
    ) {
      req.positions[row].squares[column] = {
        position: current.position,
        isEmpity: false,
        isCaptain: previous.isCaptain,
        captainColor: previous.captainColor,
        pawnColor: previous.pawnColor,
        color: current.color,
        player,
      };
      req.positions[previousRow].squares[previousColumn] = {
        ...previous,
        isEmpity: true,
      };
      req.currentTurn = req.players.number_1;
      // TODO: por aqui verificação de adjacencias para captura
    } else {
      req.io
        .to(
          req.conncetedUsers[
            player ? req.players.number_2 : req.players.number_1
          ]
        )
        .emit('invalidMovement');
      return res.json({});
    }
  } else {
    req.io
      .to(
        req.conncetedUsers[player ? req.players.number_2 : req.players.number_1]
      )
      .emit('filledSquare');
  }
  Object.keys(req.conncetedUsers).forEach(user => {
    req.io.to(req.conncetedUsers[user]).emit('updateTable', {
      positions: req.positions,
      currentTurn: req.currentTurn,
    });
  });
  return res.json('ok');
});

routes.post('/restartGame', (req, res) => {
  console.log('reiniciando');

  return res.json({});
});

export default routes;
