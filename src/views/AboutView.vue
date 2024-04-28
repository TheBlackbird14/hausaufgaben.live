<script setup lang="ts"></script>

<template>
  <div class="container">
    <!-- TODO: back button -->
    <button type="button" class="btn btn-secondary" @click="$router.go(-1)">Zurück</button>

    <h1>Info</h1>
    <br />

    <h2>Was ist das hier?</h2>
    <p>
      Diese Seite ist eine Webapp, die es dir ermöglicht, deine Hausaufgaben von Webuntis anzuzeigen
      und abzuhaken/erledigen. Du kannst auch selber welche hinzufügen und dir den Mensaplan
      ansehen. Melde dich einfach nur mit deinen Webuntis Anmeldedaten hier an (Momentan nur
      verfügbar für Webuntis Aloisiuskolleg).
    </p>
    <br />

    <h2>Wie funktioniert das?</h2>
    <p>
      Die Seite funktioniert, indem sie sich mit deinen Webuntis Anmeldedaten bei Webuntis einloggt
      und die Hausaufgaben von dort abruft. Die Anmeldedaten werden nicht im Server gespeichert,
      sondern nur in deinem Browser verschlüsselt gespeichert, um die Anfragen an Webuntis zu
      authentifizieren.
    </p>
    <br />

    <h2>Cookies und persönliche Informationen</h2>
    <p>
      Indem du dich hier anmeldest, stimmst du zu, dass cookies in deinem Browser gespeichert
      werden, um dich bei webuntis anzumelden. Diese Daten werden an den server weitergeleitet,
      damit so in deinem Namen die hausaufgaben abgerufen werden können. Dort werden sie aber
      niemals gespeichert und sind auch zu keinem Zeitpunkt für mich einsehbar. Wenn du auch die
      optionalen cookies akzeptierst, erlaubst du mir über Google Analytics wenige Daten über den
      Verkehr dieser Website sammeln. Außerdem gibt es im Server ein system, das anhand der
      einzelnen Nutzer mir eine genauere Rückmeldung gibt, welche Leute sich angemeldet haben und
      wie viele davon aktiv sind.
    </p>
    <br />

    <h2>Wie kann ich mich dem versichern?</h2>
    <p>
      Dieser Dienst ist komplett Open Source, das heißt, dass du dir jederzeit den Quellcode für
      diese Website und den Server ansehen kannst. Der Quellcode ist auf
      <a href="https://github.com">GitHub</a> für die
      <a href="https://github.com/TheBlackbird14/hausaufgaben.live">Website</a> und für den
      <a href="https://github.com/TheBlackbird14/untis-app">Server</a> verfügbar. Somit kann sich
      jeder den Quellcode ansehen und überprüfen, was mit den Daten passiert.
    </p>
    <br />

    <h2>Kontakt</h2>
    <p>
      Wenn du Anregungen oder Fragen hast, kannst du mich über
      <a href="mailto:admin@hausaufgaben.live">EMail</a> erreichen.
    </p>
    <br />

    <button type="button" class="btn btn-warning" onclick="zaraz.showConsentModal()">
      Cookies bearbeiten
    </button>
  </div>
</template>

<style scoped></style>
