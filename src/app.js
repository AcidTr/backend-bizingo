import express from 'express';
import io from 'socket.io';
import http from 'http';
import cors from 'cors';

import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.socket();
    this.middlewares();
    this.routes();

    this.conncetedUsers = {};
    this.messages = [];
    this.players = {};
    this.colors = {
      captain1: '#7159c1',
      pawn1: '#000',
      captain2: '#ff8',
      pawn2: '#990200',
    };
    this.positions = [
      {
        position: 0,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
            /*

            Salvar somente as possíveis casas onde a peça seria capturada (possível função para cada casa).validar se é capitão e borda
             Checar e atualizar cada casa na borda da casa que a peça foi movida se ta com isEmpity = false na mesma linha com coluna + e - 1
             e na linha de cima coluna - 1 e na linha abaixo coluna + 1.
             Caso alguma esteja com peça, verificar cada uma se a borda está fechada e tal peça foi capturada. (Validar borda do tabuleiro para capitão)
             Se as bordas superiores estiverem ocupadas por peças do outro jogador, essa casa perde a peça. (Contailizar -1 ponto e isEmpity = true)
             Caso contrário, o jogador oposto perde a peça.
            */
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 0,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 0,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 0,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 1,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 0,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 1,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 2,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 1,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 2,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 3,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 2,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 3,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 4,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 3,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 12,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 13,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 5,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 12,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 12,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 5,
                  column: 13,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 4,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 4,
                  column: 14,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 15,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 6,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 12,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 13,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 14,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 15,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 15,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 5,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 6,
                  column: 16,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 17,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 7,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 11,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 12,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 13,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 13,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 14,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 15,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 15,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 16,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 17,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 6,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 7,
                  column: 18,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 17,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 19,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 8,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 11,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 12,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 13,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 13,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 14,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 15,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 15,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 16,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 17,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 18,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 17,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 17,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 19,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 19,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 7,
                  column: 18,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 18,
                  isEmpity: true,
                },
                {
                  row: 8,
                  column: 20,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 20,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 19,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 20,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 9,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 12,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 12,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 13,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 14,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 14,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 15,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 15,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 16,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 17,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 17,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 18,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 18,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 17,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 19,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 19,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 19,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 18,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 20,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 20,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 8,
                  column: 20,
                  isEmpity: true,
                },
                {
                  row: 9,
                  column: 19,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
      {
        position: 10,
        squares: [
          {
            position: 0,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 1,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 0,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 2,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 1,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 3,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 2,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 4,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 3,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 5,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 4,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 6,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 5,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 7,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 6,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 8,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 7,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 9,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 8,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 10,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 9,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 11,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 10,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 12,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 11,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 13,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 12,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 14,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 13,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 15,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 15,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 14,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 16,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 17,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 15,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 17,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 18,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 16,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 18,
                  isEmpity: true,
                },
              ],
            },
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            borders: {
              borderSquares: [
                {
                  row: 9,
                  column: 19,
                  isEmpity: true,
                },
                {
                  row: 10,
                  column: 17,
                  isEmpity: true,
                },
              ],
            },
          },
        ],
      },
    ];
    this.currentTurn = null;
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.conncetedUsers[user_id] = socket.id;
      if (this.players.number_1 === undefined) {
        socket.emit('player', { player: 0 });
        this.players.number_1 = user_id;
      } else {
        socket.emit('player', { player: 1 });
        this.players.number_2 = user_id;
        if (this.players.number_1 > user_id) {
          this.currentTurn = this.players.number_1;
        } else {
          this.currentTurn = user_id;
        }
        // socket.broadcast.emit('start', this.currentTurn);
      }
      if (this.currentTurn) {
        Object.keys(this.conncetedUsers).forEach(current => {
          this.io
            .to(this.conncetedUsers[current])
            .emit('start', this.currentTurn);
        });
      }

      socket.on('disconnect', () => {
        // definir notificaçao para outro usuário que o outro usuário desconectou
        let user = null;
        if (this.players.number_1 === user_id) {
          user = 'player 1';
          delete this.players.number_1;
        } else {
          user = 'player 2';
          delete this.players.number_2;
        }
        socket.broadcast.emit('disconnection', user);
        delete this.conncetedUsers[user_id];
      });
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.conncetedUsers = this.conncetedUsers;
      req.messages = this.messages;
      req.positions = this.positions;
      req.colors = this.colors;
      req.players = this.players;
      req.currentTurn = this.currentTurn;
      next();
    });
    this.app.use((req, res, next) => {
      if (req.body.reset) {
        this.positions = [
          {
            position: 0,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 1,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 2,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 3,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 4,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 5,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 12,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 6,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 15,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 7,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 11,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 13,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 15,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 8,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 11,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 13,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 15,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 19,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 20,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 9,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 12,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 14,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 15,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 19,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 20,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
          {
            position: 10,
            squares: [
              {
                position: 0,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 15,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                borders: {
                  borderSquares: [
                    {
                      row: 0,
                      column: 1,
                      isEmpity: true,
                    },
                    {
                      row: 1,
                      column: 1,
                      isEmpity: true,
                    },
                  ],
                },
              },
            ],
          },
        ];
        Object.keys(this.conncetedUsers).forEach(user => {
          req.io.to(this.conncetedUsers[user]).emit('updateTable', {
            positions: this.positions,
            currentTurn: this.currentTurn,
          });
        });
      }
      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
