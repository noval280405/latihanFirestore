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
    apiKey:"AIzaSyAJpw3FLhjG5uH1Acm_Brr30__P5lOfHYQ",
    authDomain:"tap-erp-94e6c.firebaseapp.com",
    projectId:"tap-erp-94e6c",
    storageBucket:"tap-erp-94e6c.appspot.com",
    messagingSenderId:"579149323868",
    appId:"1:579149323868:web:e8dfd7dc1903fe617a5099",
  })

  const messaging = getMessaging(app)
  return {
    provide: {
      messaging,
    }
  }
})