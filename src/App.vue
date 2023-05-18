<template>
  <div class="container">
    <input class="input" placeholder="Введите свои данные"  type="number" v-model.number="userValue" min="0" max="1000">
    <ProgressBar :value="gamesValue" :data="stages" />  
  </div>
</template>

<script>
import ProgressBar from "./components/ProgressBar.vue";

export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      userValue: null, 
    };
  },
  computed: {
    stages() {
      const stages = this.$store.getters.stages
      let stagesWithStartingPoint = [
        {
          name: "Нулевой этап",
          id: 0,
          thresholdPoints: 0,
          games: [],
        },
        ...stages
      ];
    return stagesWithStartingPoint
    },
    gamesValue() {
      if (this.userValue > 0) {
        return this.userValue
      } else {
        const sum = this.stages.reduce((acc, stage) => {
          return acc + stage.games.reduce((total, game) => {
            return total + game.bestResult
          }, 0)
        }, 0)
        return sum
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  padding: 25px;
  margin: 0;
}

.input {
  display: block;
  width: 100%;
  max-width: 300px; 

  margin-bottom: 100px;
  padding: 10px;

  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  
  font-size: 16px; 
  line-height: 1.5;
}
</style>
