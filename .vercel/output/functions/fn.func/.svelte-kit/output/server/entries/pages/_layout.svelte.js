import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/firebase.js";
import "firebase/firestore";
import "firebase/auth";
const css = {
  code: ".mainContainer.svelte-v2dqgw{height:100vh;background:linear-gradient(180deg, #1c0429 0%, #6600ff 100%);color:white;display:flex;flex-direction:column;position:relative}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="mainContainer svelte-v2dqgw">${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
