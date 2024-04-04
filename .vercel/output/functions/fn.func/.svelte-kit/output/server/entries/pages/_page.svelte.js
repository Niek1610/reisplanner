import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import "firebase/auth";
import "../../chunks/firebase.js";
const css = {
  code: ".authContainer.svelte-1aht5rw.svelte-1aht5rw{background:linear-gradient(180deg, #1c0429 0%, #6600ff 100%);color:white;display:flex;flex-direction:column;position:relative;justify-content:center;align-items:center;flex:1;padding:5%}form.svelte-1aht5rw.svelte-1aht5rw{display:flex;flex-direction:column;gap:10px;width:500px;max-width:100%;margin:0 auto}input.svelte-1aht5rw.svelte-1aht5rw{width:100%;padding:10px;border:none;border-radius:5px}h1.svelte-1aht5rw.svelte-1aht5rw{font-size:80px;font-weight:bold;text-align:center;margin-bottom:48px}form.svelte-1aht5rw input.svelte-1aht5rw{background:rgba(255, 255, 255, 0.065);color:white;border:none;padding:8px, 14px;transition:all 0.2s;border:1px solid rgba(255, 255, 255, 0.193)}form.svelte-1aht5rw label.svelte-1aht5rw{border-radius:10px}form.svelte-1aht5rw input.svelte-1aht5rw::-moz-placeholder{color:rgba(255, 255, 255, 0.347)}form.svelte-1aht5rw input.svelte-1aht5rw::placeholder{color:rgba(255, 255, 255, 0.347)}form.svelte-1aht5rw input.svelte-1aht5rw:focus{outline:none;color:white}form.svelte-1aht5rw input.svelte-1aht5rw:focus::-moz-placeholder{color:transparent}form.svelte-1aht5rw input.svelte-1aht5rw:focus::placeholder{color:transparent}form.svelte-1aht5rw input.svelte-1aht5rw:hover{background:rgba(255, 255, 255, 0.1)}form.svelte-1aht5rw button.svelte-1aht5rw{background:#ffffff28;border:1px solid #ffffff38;color:white;padding:10px;border-radius:5px;cursor:pointer;transition:all 0.2s}form.svelte-1aht5rw button.svelte-1aht5rw:hover{background:#ffffff38}form.svelte-1aht5rw p.svelte-1aht5rw{text-align:end;cursor:pointer}.error.svelte-1aht5rw.svelte-1aht5rw{color:coral;text-align:center;margin-bottom:24px}.spin.svelte-1aht5rw.svelte-1aht5rw{animation:svelte-1aht5rw-spin 5s infinite}@keyframes svelte-1aht5rw-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  map: null
};
const Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let registerText = "Nog geen account? Registreer";
  let loginOrRegister = "Login";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let confirmPasswordInput;
  $$result.css.add(css);
  return `<div class="authContainer svelte-1aht5rw"><h1 id="titleLogin" class="svelte-1aht5rw" data-svelte-h="svelte-1b77k1e">Voyager</h1>  <form action="" class="svelte-1aht5rw"><label class="svelte-1aht5rw">${``} <input type="text" placeholder="Email" class="svelte-1aht5rw"${add_attribute("value", email, 0)}></label> <label class="svelte-1aht5rw"><input type="password" placeholder="Wachtwoord" class="svelte-1aht5rw"${add_attribute("value", password, 0)}></label> <label class="svelte-1aht5rw"><input style="display: none;" type="Password" placeholder="Bevestig Wachtwoord" class="svelte-1aht5rw"${add_attribute("this", confirmPasswordInput, 0)}${add_attribute("value", confirmPassword, 0)}></label> <button type="submit" class="svelte-1aht5rw"> ${`${escape(loginOrRegister)}`}</button>  <p class="svelte-1aht5rw">${escape(registerText)}</p></form> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Auth, "Auth").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
