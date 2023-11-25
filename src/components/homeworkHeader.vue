<script setup lang="ts"></script>

<template>
  <header id="header" class="header">
    <img id="logo_header" class="logo_header" src="@/assets/UntisHomeworkLogo.png" alt="logo" />
    <h1 id="title" class="title">Hausaufgaben</h1>
    <button id="create_button" class="create_button">Hausaufgabe erstellen</button>
    <button class="dropdown_button" id="dropdown_button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill=""
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
      >
        <path
          d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"
        ></path>
      </svg>
    </button>
  </header>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.header {
  display: grid;
  grid-template-columns: 1fr 3fr 0.5fr 0.6fr 0.01fr;
  grid-template-rows: 0.2fr;
  background-color: #dcdcdc;
}

.logo_header {
  width: 5vw;
  aspect-ratio: initial;
  max-width: 200px;

  margin: 20px;

  /* vertically center the logo in its grid cell */
  justify-self: center;
  align-self: center;
}

.title {
  justify-self: center;
  align-self: center;
}

.create_button {
  background-color: rgba(100, 252, 100, 0.7);
  color: black;
  border: solid 1px black;
  border-radius: 5px;
  padding: 0.6vw 0.6vw;

  font-size: medium;
  font-weight: bold;

  /* vertically center the button in its grid cell */
  justify-self: center;
  align-self: center;

  cursor: pointer;
}

.dropdown_button {
  color: black;
  background-color: inherit;
  border: none;
  font-size: medium;
  justify-self: center;
  align-self: center;
  cursor: pointer;
}
</style>
