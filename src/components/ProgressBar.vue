<template>
<div class="progress-bar-container">
  <div class="progress-bar-wrapper">
    <div class="progress-bar" :style="progressBarStyle"></div>
  </div>
  <div class="progress-bar-steps">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="progress-bar-step"
      :style="{ left: item.leftPosition }"
    >
    <CupIcon v-if="index === list.length - 1" class="progress-bar-final"/>
    <StarIcon v-else-if="index > 0" class="progress-bar-star" :class="{'progress-bar-star__active': activeStars[item.id]}"/>
    <span class="progress-bar-result">{{ displayValue[item.id] }}</span>  
    </div>
  </div>
</div>
</template>

<script>
import CupIcon from './Icons/CupIcon.vue'
import StarIcon from './Icons/StarIcon.vue'

export default {
  props: {
    data: {
      type: Array,
    },
    value: {
      type: Number,
      default: 100,
    },
  },
  components:{
    CupIcon,
    StarIcon
  },
  methods: {
    calculateProgressPercentage() {
      const thresholds = this.data.map((item) => item.thresholdPoints)
      const lowerThresholdIndex = thresholds.findIndex((threshold, index) => this.value >= threshold && (index === thresholds.length - 1 || this.value < thresholds[index + 1]))
      const lowerThreshold = thresholds[lowerThresholdIndex]
      const upperThreshold = thresholds[lowerThresholdIndex + 1]

      if (upperThreshold === undefined) {
        return 100
      }

      const range = upperThreshold - lowerThreshold
      const valueInRange = this.value - lowerThreshold
      const percentageInRange = (valueInRange / range) * 100
      const totalPercentage = (lowerThresholdIndex / (thresholds.length - 1)) * 100 + percentageInRange / (thresholds.length - 1)

      return totalPercentage
    },
  },
  computed: {
    progressBarStyle() {
      const percentage = this.calculateProgressPercentage()
      return {
        width: `${percentage}%`,
      }
    },
    list() {
      const stepWidth = 100 / (this.data.length - 1)
      
      return this.data.map((item, index) => {
        return {
          ...item,
          leftPosition: index * stepWidth + '%',
        }
      })
    },
    displayValue() {
      return this.data.map((item) => {
        if (this.value <= 25 && item.id === 1) {
          return `${this.value}/${item.thresholdPoints}`
        } 
        if (this.value >= 500 && item.id === 6) {
          return `${this.value}/${item.thresholdPoints}`
        } 
        return item.thresholdPoints
     })
   },
    activeStars() {
      return this.data.map((item) => this.value >= item.thresholdPoints)
    } 
  },
}
</script>

<style lang="scss" scoped>
.progress-bar-container {
  position: relative;
  max-width: 900px;
  width: 100%;
  height: 40px;

  background: rgba(239, 239, 239, 0.6);
  border-radius: 30px;
}
.progress-bar-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow: hidden;

  border-radius: 30px;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  background: #3300FF;
  border-radius: 30px 0px 0px 30px;
}

.progress-bar-steps {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #000000;
  opacity: 0.5;
}

.progress-bar-step {
  position: absolute;
  bottom: 0;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background: #000000;

  &:first-child {
    background: none;
    width: 0px;
  }

  &:last-child {
    background: none;
    width: 0px;
  }
}

.progress-bar-star  {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
}

.progress-bar-star__active {
  fill: #3300FF;
}

.progress-bar-final {
  position: absolute;
  bottom: calc(100% + 7px);
  left: 50%;
  transform: translateX(-50%);
}

.progress-bar-result {
  position: absolute;
  top: calc(100% + 13px);
  left: 50%;
  transform: translateX(-50%);
}
</style>