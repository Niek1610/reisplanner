<script>
  import { onMount } from "svelte";
  import { authHandlers } from "../store/store";

  onMount(() => {
    const title = document.getElementById("titleLogin");
    const letters = Array.from(title.textContent);
    title.textContent = "";

    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.display = "inline-block";
      span.style.transition = "color 0.5s, transform .33s ease ";
      span.onmouseover = () => {
        span.style.color = "#8e43ff";
      };
      span.onmouseout = () => {
        span.style.color = "White";
      };
      title.appendChild(span);

      setTimeout(() => {
        setInterval(() => {
          span.style.transform = "translateY(-20px)";
          setTimeout(() => {
            span.style.transform = "translateY(0)";
          }, 150);
        }, 10000);
      }, index * 75);
    });
  });
  let isRegister = false;
  let registerText = "Nog geen account? Registreer";
  let loginOrRegister = "Login";

  function toggleRegister() {
    isRegister = !isRegister;
    if (isRegister) {
      registerText = "Al een account? Login";
      loginOrRegister = "Registreer";
      confirmPasswordInput.style.display = "block";
    } else {
      registerText = "Nog geen account? Registreer";
      loginOrRegister = "Login";
      confirmPasswordInput.style.display = "none";
    }
  }
  let authing = false;
  let email = "";
  let password = "";
  let confirmPassword = "";
  let confirmPasswordInput;
  let errorMessage = "";

  async function handleAuth() {
    if (!email || !password || (isRegister && !confirmPassword)) {
      errorMessage = "Vul alle velden in";
      return;
    }

    if (isRegister && password !== confirmPassword) {
      errorMessage = "Wachtwoorden komen niet overeen";
      return;
    }
    authing = true;
    try {
      if (!isRegister) {
        await authHandlers.login(email, password);
      } else {
        await authHandlers.signup(email, password);
      }
    } catch (err) {
      console.log(err);
      errorMessage = err;
      authing = false;
    }
  }
</script>

<div class="authContainer">
  <h1 id="titleLogin">Voyager</h1>
  <!-- svelte-ignore a11y-click-events-have-key-events -->

  <form action="">
    <label>
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}

      <input bind:value={email} type="text" placeholder="Email" />
    </label>
    <label>
      <input bind:value={password} type="password" placeholder="Wachtwoord" />
    </label>
    <label>
      <input
        style="display: none;"
        bind:this={confirmPasswordInput}
        bind:value={confirmPassword}
        type="Password"
        placeholder="Bevestig Wachtwoord"
      />
    </label>
    <button on:click={handleAuth} type="submit">
      <!-- svelte-ignore empty-block -->
      {#if authing}
        <i class="fa-solid fa-spinner spin"></i>
      {:else}
        {loginOrRegister}
      {/if}
    </button>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <p on:click={toggleRegister}>{registerText}</p>
  </form>
</div>

<style>
  .authContainer {
    background: linear-gradient(180deg, #1c0429 0%, #6600ff 100%);
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 5%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
  }

  input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }

  h1 {
    font-size: 80px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 48px;
  }

  form input {
    background: rgba(255, 255, 255, 0.065);
    color: white;
    border: none;
    padding: 8px, 14px;
    transition: all 0.2s;
    border: 1px solid rgba(255, 255, 255, 0.193);
  }

  form label {
    border-radius: 10px;
  }

  form input::placeholder {
    color: rgba(255, 255, 255, 0.347);
  }
  form input:focus {
    outline: none;
    color: white;
  }

  form input:focus::placeholder {
    color: transparent;
  }

  form input:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  form button {
    background: #ffffff28;
    border: 1px solid #ffffff38;
    color: white;
    padding: 10px;

    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
  }

  form button:hover {
    background: #ffffff38;
  }

  form p {
    text-align: end;
    cursor: pointer;
  }

  .error {
    color: coral;
    text-align: center;
    margin-bottom: 24px;
  }

  .spin {
    animation: spin 5s infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
