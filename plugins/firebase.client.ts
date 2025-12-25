import { initializeApp, getApps } from 'firebase/app'
import { getMessaging, type Messaging } from 'firebase/messaging'

declare module '#app' {
  interface NuxtApp {
    $messaging: Messaging
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $messaging: Messaging
  }
}

export default defineNuxtPlugin(() => {
  const app = getApps()[0] ?? initializeApp({
    apiKey:"AIzaSyCu0xsfZCiIegl21EOvwWu42HnDcC9As6Y",
    authDomain:"syafama-media.firebaseapp.com",
    projectId:"syafama-media",
    storageBucket:"syafama-media.firebasestorage.app",
    messagingSenderId:"909231531359",
    appId:"1:909231531359:web:e72585a1544cb7929042ea",
  })

  const messaging = getMessaging(app)
  return {
    provide: {
      messaging,
    }
  }
})