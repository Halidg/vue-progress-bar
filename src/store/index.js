import { createStore } from 'vuex'

export default createStore({
  state: {
    stages: [
      {
        "name": "Этап первый",
        "id": 1,
        "thresholdPoints": 25,
        "games": [
          {
            "name": "Игра 1.1",
            "bestResult": 10,
            "isPlayed": false
          }
        ]
      },
      {
        "name": "Этап второй",
        "id": 2,
        "thresholdPoints": 50,
        "games": [
          {
            "name": "Игра 2.1",
            "bestResult": 20,
            "isPlayed": false
          }
        ]
      },
      {
        "id": 3,
        "name": "Этап третий",
        "thresholdPoints": 100,
        "games": [
          {
            "name": "Игра 3.1",
            "bestResult": 40,
            "isPlayed": false
          }
        ]
      },
      {
        "id": 4,
        "name": "Этап четвертый",
        "thresholdPoints": 200,
        "games": [
          {
            "name": "Игра 4.1",
            "bestResult": 15,
            "isPlayed": false
          }
        ]
      },
      {
        "id": 5,
        "name": "Этап пятый",
        "thresholdPoints": 500,
        "games": [
          {
            "name": "Игра 5.1",
            "bestResult": 50,
            "isPlayed": false
          }
        ]
      },
      {
        "id": 6,
        "name": "Этап шестой",
        "thresholdPoints": 1000,
        "games": [
          {
            "name": "Игра 6.1",
            "bestResult": 45,
            "isPlayed": false
          },
          {
            "name": "Игра 6.2",
            "bestResult": 67,
            "isPlayed": false
          }
        ]
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    stages(state) {
      return state.stages
    }
  }
})
