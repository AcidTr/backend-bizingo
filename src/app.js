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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 10,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 2,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 4,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 10,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 12,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
          },
          {
            position: 15,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#fff',
            player: 0,
            // possible borders
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain1,
            pawnColor: this.colors.pawn1,
            color: '#777',
            player: 0,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 3,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 5,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 7,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 9,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 11,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 13,
            isEmpity: false,
            isCaptain: true,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 15,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
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
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 5,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 7,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 9,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 11,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 13,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 15,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 19,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 20,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
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
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 6,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 8,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 10,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 12,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 14,
            isEmpity: false,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 15,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 19,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 20,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
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
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 1,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 2,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 3,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 4,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 5,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 6,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 7,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 8,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 9,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 10,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 11,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 12,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 13,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 14,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 15,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 16,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
          },
          {
            position: 17,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#777',
            player: 1,
            // possible borders
          },
          {
            position: 18,
            isEmpity: true,
            isCaptain: false,
            captainColor: this.colors.captain2,
            pawnColor: this.colors.pawn2,
            color: '#fff',
            player: 1,
            // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 10,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 2,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 4,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 10,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 12,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
              },
              {
                position: 15,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#fff',
                player: 0,
                // possible borders
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain1,
                pawnColor: req.colors.pawn1,
                color: '#777',
                player: 0,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 3,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 5,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 7,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 9,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 11,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 13,
                isEmpity: false,
                isCaptain: true,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 15,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 5,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 7,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 9,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 11,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 13,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 15,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 19,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 20,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 6,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 8,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 10,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 12,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 14,
                isEmpity: false,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 15,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 19,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 20,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
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
                // possible borders
              },
              {
                position: 1,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 2,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 3,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 4,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 5,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 6,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 7,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 8,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 9,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 10,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 11,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 12,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 13,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 14,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 15,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 16,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
              {
                position: 17,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#777',
                player: 1,
                // possible borders
              },
              {
                position: 18,
                isEmpity: true,
                isCaptain: false,
                captainColor: req.colors.captain2,
                pawnColor: req.colors.pawn2,
                color: '#fff',
                player: 1,
                // possible borders
              },
            ],
          },
        ];
        Object.keys(this.conncetedUsers).forEach(user => {
          req.io
            .to(this.conncetedUsers[user])
            .emit('updateTable', { positions: this.positions });
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
