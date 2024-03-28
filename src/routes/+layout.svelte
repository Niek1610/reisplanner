<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { auth, db } from "../lib/firebase";
  import { getDoc, setDoc, doc } from "firebase/firestore";
  import { authStore } from "../store/store";
  const nonAuthRoutes = ["/"];
  let dataToSet;
  onMount(() => {
    console.log("mounting");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }

      if (user && currentPath == "/") {
        window.location.href = "/homepage";
        return;
      }

      if (!user) {
        return;
      }

      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const userRef = doc(db, "user", user.uid);
        dataToSet = {
          email: user.email,
          uid: user.uid,
        };
        await setDoc(userRef, dataToSet, { merge: true });
      } else {
        const userData = docSnap.data();
        dataToSet = userData;
      }
      authStore.update((curr) => {
        return {
          ...curr,
          user,
          data: dataToSet,
          loading: false,
        };
      });
    });
  });
</script>

<div class="mainContainer">
  <slot />
</div>

<style>
  .mainContainer {
    height: 100vh;
    background: linear-gradient(180deg, #1c0429 0%, #6600ff 100%);
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>
