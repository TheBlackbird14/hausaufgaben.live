<script setup lang="ts">


defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['toggle', 'reload'])

</script>

<template>

  <body v-if="visible">

    <div class="shader" @click="emit('toggle')">
    </div>


    <div class="sidebar" >

      <header class="d-flex justify-content-center align-items-center text-center">


        <div class="p-2 col-sm-2">
          <i class="bi bi-arrow-clockwise" @click="emit('reload')" style="font-size: 250%; cursor:pointer;"></i>
        </div>


        <div class="p-2 flex-lg-grow-1">

          <img src="/src/assets/UntisHomeworkLogo.png" alt="logo" height="100">
          
        </div>

        <div class="p-2 col-sm-2">
          <i class="bi bi-x icon" @click="emit('toggle')" style="cursor:pointer; font-size: 300%"></i>
        </div>


      </header>

    </div>


  </body>


</template>

<style scoped>

.sidebar {

  height: 100%;
  min-width: 20%;

  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  z-index: 99;

  background-color: #f5f5f5;
}

.shader {

  height: 100%;
  width: 100%;

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;

  z-index: 98;

  background-color: rgba(0, 0, 0, 0.5);
}

</style>