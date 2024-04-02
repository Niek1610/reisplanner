<script>
  import { onMount } from "svelte";
  import { authHandlers } from "../../store/store";

  let transcript = "";
  let recognition;
  let silenceTimer;
  let responseText = "Klik om te spreken";
  let startListeningInterval;
  let isListening = false;
  let menuOpen = false;
  let maxDots = 3;
  let currentDots = 0;
  let intervalId = null;
  let isThinking = false;
  let data;
  let isPlaying = false;

  $: {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }

    if (isListening) {
      intervalId = setInterval(() => {
        responseText = "Aan het luisteren" + ".".repeat(currentDots);
        currentDots = (currentDots + 1) % (maxDots + 1);
      }, 500);
    } else if (isThinking) {
      intervalId = setInterval(() => {
        responseText = "Aan het denken" + ".".repeat(currentDots);
        currentDots = (currentDots + 1) % (maxDots + 1);
      }, 500);
    } else {
      responseText = "Klik om te spreken";
    }
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  async function promptToOpenAI() {
    isThinking = true;

    const response = await fetch("/homepage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript: "groningen naar amsterdam" }),
    });
    isThinking = false;
    if (response.ok) {
      data = await response.json();
      const audioBase64 = data.audio;
      const route = data.route;

      // Convert the Base64 string back to a Blob
      const byteCharacters = atob(audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: "audio/mpeg" });

      console.log("Audio bestand", audioBlob); // Log the audio blob
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.src = audioUrl;

      audioPlayer.onplay = () => {
        isPlaying = true;
      };

      audioPlayer.onended = () => {
        isPlaying = false;
      };

      audioPlayer.play().catch((error) => {
        console.error("Err audio:", error);
      });

      console.log("Ontvangen route:", route); // Log the route
    } else {
      responseText = "fout";
    }
  }

  onMount(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.lang = "nl-NL";
      recognition.onresult = (event) => {
        clearInterval(startListeningInterval);
        transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        clearTimeout(silenceTimer);
        silenceTimer = setTimeout(stopListening, 1500);
      };
      recognition.onerror = (event) => {
        console.log("err:", event.error);
      };
    } else {
      console.error("Spraak wordt niet ondersteund in de browser");
    }
  });

  async function startListening() {
    try {
      if (recognition) {
        if (isListening) {
          stopListening();
        } else {
          recognition.start();
          isListening = true;

          startListeningInterval = setInterval(() => {
            if (!isListening) {
              recognition.start();
            }
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function stopListening() {
    if (isListening) {
      console.log("test");
      recognition.stop();
      isListening = false;
      clearInterval(startListeningInterval);
      clearTimeout(silenceTimer);
      promptToOpenAI().catch((error) => {
        console.error(error);
      });
    }
  }

  function stopAudio() {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
  }
</script>

<head>
  <link rel="stylesheet" href="/src/routes/homepage/style.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />
</head>

<div class="menu-container">
  <button class="hamburger" on:click={toggleMenu}>
    <span class="hamburger-line" />
    <span class="hamburger-line" />
    <span class="hamburger-line" />
  </button>

  <div class="menu {menuOpen ? 'open' : ''}">
    <button class="logout" on:click={authHandlers.logout}>Log Uit</button>
  </div>
</div>

<div class="grid">
  <div class="center">
    <button
      class={isListening ? "pulse" : "round-button"}
      on:click={startListening}
    />

    <p class="responseTekst">{responseText}</p>
    {#if isPlaying}
      <button class="stopButton" on:click={stopAudio}>Stop Audio</button>
    {/if}
    <audio id="audioPlayer" controls hidden />
  </div>

  <div class="route-overview">
    {#if data}
      <h2 class="center-text">
        <i class="fas fa-route"></i>
        {data.route.vertrekAdres} <i class="fas fa-arrow-right"></i>
        {data.route.aankomstAdres}
      </h2>
      <div class="time-container">
        {#if data.route.vertrektijd}
          <p>
            <i class="fas fa-clock"></i>
            {data.route.vertrektijd}
          </p>
        {/if}
        {#if data.route.aankomsttijd}
          <p>
            <i class="fas fa-arrow-right"></i>
            {data.route.aankomsttijd}
          </p>
        {/if}
      </div>

      {#if data.route.totaleDuur}
        <p>
          <i class="fas fa-hourglass-half"></i>
          {data.route.totaleDuur}
        </p>
      {/if}

      {#if data.route.stappen && data.route.stappen.length > 0}
        {#each data.route.stappen as stap, i (i)}
          <div class="step-card">
            {#if stap.type}
              <p><i class="fas fa-directions"></i> {stap.type}</p>
            {/if}
            <div class="time-location">
              {#if stap.vertrek || stap.vertrektijd}
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  {stap.vertrek}
                  {#if stap.vertrektijd}
                    {stap.vertrektijd}
                  {/if}
                </p>
              {/if}
              {#if stap.aankomst || stap.aankomsttijd}
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  {stap.aankomst}
                  {#if stap.aankomsttijd}
                    {stap.aankomsttijd}
                  {/if}
                </p>
              {/if}
            </div>

            {#if stap.duur}
              <p><i class="fas fa-hourglass-half"></i> {stap.duur}</p>
            {/if}
            {#if stap.instructie}
              <p>
                <i class="fas fa-info-circle"></i>
                {stap.instructie}
              </p>
            {/if}
          </div>
        {/each}
      {/if}

      {#if data.route.waarschuwingen && data.route.waarschuwingen.length > 0}
        <ul>
          {#each data.route.waarschuwingen as waarschuwing, i (i)}
            <li><i class="fas fa-exclamation-circle"></i> {waarschuwing}</li>
          {/each}
        </ul>
      {/if}
    {/if}
  </div>
</div>
