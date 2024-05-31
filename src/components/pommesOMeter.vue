<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    required: true
  }
})

const meterPath = computed(() => {
  const radius = 135
  const startAngle = 135
  const endAngle = startAngle + (props.percentage / 100) * 270
  const x1 = 150 + radius * Math.cos((Math.PI / 180) * startAngle)
  const y1 = 150 + radius * Math.sin((Math.PI / 180) * startAngle)
  const x2 = 150 + radius * Math.cos((Math.PI / 180) * endAngle)
  const y2 = 150 + radius * Math.sin((Math.PI / 180) * endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
})

const meterColor = computed(() => {
  const hue = (props.percentage * 120) / 100 // 0 (red) to 120 (green)
  return `hsl(${hue}, 100%, 50%)`
})

const probabilityText = computed(() => {
  if (props.percentage < 20) {
    return 'unwahrscheinlich Sehr'
  } else if (props.percentage < 40) {
    return 'Unwahrscheinlich'
  } else if (props.percentage < 60) {
    return 'Möglich'
  } else if (props.percentage < 80) {
    return 'Wahrscheinlich'
  } else {
    return 'wahrscheinlich Sehr '
  }
})
</script>

<template>
  <div class="o-meter d-flex justify-content-center align-items-center">
    <svg width="300" height="300" viewBox="0 0 300 300">
      <circle
        cx="150"
        cy="150"
        r="135"
        stroke="#ddd"
        stroke-width="20"
        fill="none"
        stroke-dasharray="636.172 212.057"
        stroke-dashoffset="530.143"
        stroke-linecap="round"
      />
      <path
        :d="meterPath"
        :stroke="meterColor"
        stroke-width="20"
        fill="none"
        stroke-linecap="round"
      />
      <text x="50%" y="40%" text-anchor="middle" dy=".3em" font-size="45">{{ percentage }}%</text>
      <text x="50%" y="60%" text-anchor="middle" dy=".3em" font-size="60">🍟</text>
      <text x="50%" y="83%" text-anchor="middle" dy=".3em" font-size="19.5">
        <tspan x="50%" dy="">{{ probabilityText.split(' ')[0] }}</tspan>
        <tspan v-if="probabilityText.split(' ')[1]" x="50%" dy="-1em">
          {{ probabilityText.split(' ')[1] }}
        </tspan>
      </text>
    </svg>
  </div>
</template>

<style scoped>
text {
  fill: var(--text-primary-color);
}
</style>
