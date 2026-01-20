<template>
  <v-app>
    <!-- HERO -->
    <v-container fluid class="hero">
      <div class="hero-content text-center">
        <p class="opening animate-fade-down">The Wedding Of</p>
        <h1 class="names animate-scale">Ahmad & Aisyah</h1>
        <p class="date animate-fade-up">10 Agustus 2026</p>
        <!-- Decorative Floating Hearts -->
        <div v-for="i in 8" :key="i" class="floating-heart">❤️</div>
      </div>
    </v-container>

    <!-- QUOTE -->
    <v-container class="section text-center fade-up">
      <p class="quote animate-fade-up">
        “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan-pasangan untukmu agar kamu merasa tenteram kepadanya.”
      </p>
      <small>QS. Ar-Rum : 21</small>
    </v-container>

    <!-- DETAIL -->
    <v-container class="section bg-soft fade-up">
      <h2 class="section-title animate-fade-up">Detail Acara</h2>

      <v-row justify="center" class="mt-6">
        <v-col cols="12" md="4" class="text-center animate-fade-left">
          <v-icon size="36">mdi-calendar-heart</v-icon>
          <p>Senin, 10 Agustus 2026</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center animate-fade-up">
          <v-icon size="36">mdi-clock-outline</v-icon>
          <p>10.00 WIB – Selesai</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center animate-fade-right">
          <v-icon size="36">mdi-map-marker</v-icon>
          <p>Bale Kambang, Bandung</p>

          <v-btn
            class="map-btn mt-3 animate-scale-hover"
            href="https://www.google.com/maps/dir/?api=1&destination=Bale+Kambang+Bandung"
            target="_blank"
          >
            <v-icon start>mdi-map</v-icon>
            Lihat Lokasi
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- COUNTDOWN -->
    <v-container class="section text-center fade-up">
      <h2 class="section-title animate-fade-up">Menuju Hari Bahagia</h2>
      <div class="countdown animate-countdown">{{ countdown }}</div>
    </v-container>

    <!-- GALERI -->
    <v-container class="section bg-soft fade-up">
      <h2 class="section-title animate-fade-up">Galeri</h2>
      <v-row class="mt-6">
        <v-col cols="6" md="3" v-for="i in 8" :key="i">
          <v-img
            :src="`https://picsum.photos/400/600?random=${i}`"
            class="gallery-img animate-scale-hover"
            cover
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- BUKU TAMU -->
    <v-container class="section fade-up">
      <h2 class="section-title text-center animate-fade-up">Buku Tamu & Ucapan</h2>

      <v-form class="guest-form" @submit.prevent="submitUcapan">
        <v-text-field
          v-model="guestName"
          label="Nama"
          variant="outlined"
        />
        <v-textarea
          v-model="guestMessage"
          label="Ucapan & Doa"
          variant="outlined"
        />
        <v-btn block size="large" class="gold-btn animate-scale-hover" type="submit">
          Kirim Ucapan
        </v-btn>
      </v-form>

      <v-card
        v-for="item in guestbook"
        :key="item.id"
        class="guest-card animate-fade-up"
      >
        <strong>{{ item.name }}</strong>
        <p>{{ item.message }}</p>
      </v-card>
    </v-container>

    <!-- FOOTER -->
    <v-footer class="footer">
      <p>Terima kasih atas doa & kehadiran Anda 🤍</p>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore'
const db = useFirestore()

/* COUNTDOWN */
const countdown = ref('')
const target = new Date('2026-08-10T10:00:00').getTime()

setInterval(() => {
  const diff = target - new Date().getTime()
  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const m = Math.floor((diff / (1000 * 60)) % 60)
  const s = Math.floor((diff / 1000) % 60)
  countdown.value = `${d} hari ${h} jam ${m} menit ${s} detik`
}, 1000)

/* BUKU TAMU */
const guestName = ref('')
const guestMessage = ref('')
const guestbook = ref<any[]>([])

const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'))
onSnapshot(q, snap => {
  guestbook.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
})

async function submitUcapan() {
  if (!guestName.value || !guestMessage.value) return
  await addDoc(collection(db, 'guestbook'), {
    name: guestName.value,
    message: guestMessage.value,
    createdAt: serverTimestamp()
  })
  guestName.value = ''
  guestMessage.value = ''
}
</script>

<style scoped>
/* HERO */
.hero {
  height: 100vh;
  background: linear-gradient(135deg, rgba(255,223,186,0.6), rgba(255,238,245,0.6)),
    url('https://picsum.photos/1200/1800');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  position: relative;
  overflow: hidden;
}

.hero-content {
  z-index: 2;
}

.names {
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  color: #b85c38;
}

/* Floating hearts */
.floating-heart {
  position: absolute;
  font-size: 24px;
  animation: floatHeart 6s infinite;
  opacity: 0.7;
}
.floating-heart:nth-child(1) { left: 10%; animation-delay: 0s; }
.floating-heart:nth-child(2) { left: 30%; animation-delay: 1s; }
.floating-heart:nth-child(3) { left: 50%; animation-delay: 2s; }
.floating-heart:nth-child(4) { left: 70%; animation-delay: 3s; }
.floating-heart:nth-child(5) { left: 20%; animation-delay: 4s; }
.floating-heart:nth-child(6) { left: 40%; animation-delay: 5s; }
.floating-heart:nth-child(7) { left: 60%; animation-delay: 6s; }
.floating-heart:nth-child(8) { left: 80%; animation-delay: 7s; }

@keyframes floatHeart {
  0% { transform: translateY(100vh) scale(1); opacity: 0.7; }
  50% { opacity: 1; }
  100% { transform: translateY(-50px) scale(1.2); opacity: 0; }
}

/* SECTION */
.section {
  padding: 80px 24px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  text-align: center;
  color: #b85c38;
}

.bg-soft {
  background: #fff4f0;
}

.countdown {
  font-size: 24px;
  font-weight: bold;
  color: #b85c38;
}

/* GALLERY */
.gallery-img {
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* GUESTBOOK */
.guest-form {
  max-width: 480px;
  margin: auto;
}

.guest-card {
  max-width: 650px;
  margin: 16px auto;
  padding: 20px;
  border-left: 5px solid #b85c38;
  background: #fff9f5;
}

/* BUTTON */
.gold-btn,
.map-btn {
  background: linear-gradient(135deg,#b85c38,#f5caa0);
  color: black;
  border-radius: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* HOVER ANIMATIONS */
.animate-scale-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0,0,0,.25);
}

/* FOOTER */
.footer {
  background: #b85c38;
  color: white;
  padding: 32px;
  display: flex;
  justify-content: center;
  font-size: 18px;
}

/* ANIMATIONS */
.animate-fade-up {
  animation: fadeUp 1s ease forwards;
}
.animate-fade-down {
  animation: fadeDown 1s ease forwards;
}
.animate-fade-left {
  animation: fadeLeft 1s ease forwards;
}
.animate-fade-right {
  animation: fadeRight 1s ease forwards;
}
.animate-scale {
  animation: scaleUp 1s ease forwards;
}
.animate-countdown {
  animation: pulse 1.5s infinite;
}

/* KEYFRAMES */
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
@keyframes fadeDown { from { opacity: 0; transform: translateY(-30px) } to { opacity: 1; transform: translateY(0) } }
@keyframes fadeLeft { from { opacity: 0; transform: translateX(-30px) } to { opacity: 1; transform: translateX(0) } }
@keyframes fadeRight { from { opacity: 0; transform: translateX(30px) } to { opacity: 1; transform: translateX(0) } }
@keyframes scaleUp { from { opacity: 0; transform: scale(0.8) } to { opacity: 1; transform: scale(1) } }
@keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.05) } }
</style>
