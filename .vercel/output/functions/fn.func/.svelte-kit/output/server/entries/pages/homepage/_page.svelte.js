import { c as create_ssr_component, e as escape, d as add_attribute } from "../../../chunks/ssr.js";
import "firebase/auth";
import "../../../chunks/firebase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let responseText = "Klik om te spreken";
  {
    {
      {
        responseText = "Klik om te spreken";
      }
    }
  }
  return `<head data-svelte-h="svelte-1tih5sa"><link rel="stylesheet" href="/style.css"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></head> <div class="menu-container"><button class="hamburger" data-svelte-h="svelte-uxqceb"><span class="hamburger-line"></span> <span class="hamburger-line"></span> <span class="hamburger-line"></span></button> <div class="${"menu " + escape("", true)}"><button class="logout" data-svelte-h="svelte-1vip4fi">Log Uit</button></div></div> <div class="grid"><div class="center"><button${add_attribute("class", "round-button", 0)}></button> <p class="responseTekst">${escape(responseText)}</p> ${``} <audio id="audioPlayer" controls hidden></audio> <br> ${`<p class="info" data-svelte-h="svelte-l25oc">Als je op de knop drukt, vermeld dan de begin- en eindbestemming in de
        vorm: &quot;beginbestemming NAAR eindbestemming&quot;. Het woord &quot;NAAR&quot; is
        essentieel voor het systeem om de route correct te interpreteren.</p>`}</div> ${``}</div>`;
});
export {
  Page as default
};
