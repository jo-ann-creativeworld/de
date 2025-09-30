<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-fredoka font-bold text-gray-800 mb-6">
          Willkommen bei <span class="text-sunny-yellow-600">Kreatives für Kinder</span>! ✨
        </h1>
        <p class="text-lg md:text-xl font-fredoka text-grape-purple-800 mb-4">
          Buntpapier Atelier – Wo Ideen ihre Farbe bekommen!
        </p>
        <p class="text-xl md:text-2xl font-comic text-gray-700 mb-8 max-w-3xl mx-auto">
          Hier entstehen wunderbare Lernmaterialien und Kunstprojekte, die Kindern 
          Freude bereiten und ihre Kreativität fördern! 🌟
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/products" class="creative-button inline-flex items-center">
            Zu meinen Produkten
            <ArrowRight class="ml-2 h-5 w-5" />
          </router-link>
          <router-link to="/art-projects" class="creative-button-tertiary inline-flex items-center">
            Kunstprojekte entdecken
            <Palette class="ml-2 h-5 w-5" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Overview Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-fredoka font-bold text-center text-gray-800 mb-12">
          Entdecke alle Bereiche! 🗺️
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sunny-yellow-200 hover:border-sunny-yellow-400 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <div class="text-center">
              <div class="text-6xl mb-4">{{ section.icon }}</div>
              <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4">
                {{ section.title }}
              </h3>
              <p class="text-gray-600 font-comic mb-6 text-lg">
                {{ section.description }}
              </p>
              <router-link
                :to="section.link"
                :class="[section.buttonClass, 'inline-flex items-center']"
              >
                Mehr erfahren
                <ArrowRight class="ml-2 h-5 w-5" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-fredoka font-bold text-gray-800 mb-8">
          Meine Mission 🎯
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/60 rounded-2xl p-6 border border-sky-blue-200">
            <div class="text-4xl mb-4">🤝</div>
            <h3 class="text-xl font-fredoka font-bold text-gray-800 mb-3">
              Partizipation
            </h3>
            <p class="text-gray-600 font-comic">
              Kinder gestalten aktiv mit und bringen ihre eigenen Ideen ein.
            </p>
          </div>
          <div class="bg-white/60 rounded-2xl p-6 border border-grass-green-200">
            <div class="text-4xl mb-4">🌱</div>
            <h3 class="text-xl font-fredoka font-bold text-gray-800 mb-3">
              Nachhaltigkeit
            </h3>
            <p class="text-gray-600 font-comic">
              Das Gelernte und die Projekte bleiben langfristig bestehen und erinnern.
            </p>
          </div>
          <div class="bg-white/60 rounded-2xl p-6 border border-rose-pink-200">
            <div class="text-4xl mb-4">😊</div>
            <h3 class="text-xl font-fredoka font-bold text-gray-800 mb-3">
              Spaß am Lernen
            </h3>
            <p class="text-gray-600 font-comic">
              Spielerisch und mit Freude neue Fähigkeiten entdecken und entwickeln.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Palette } from 'lucide-vue-next';

const sections = [
  {
    title: 'Über mich',
    icon: '👩‍🎨',
    description: 'Lerne mich kennen: Wer ich bin, was mich antreibt.',
    link: '/about',
    buttonClass: 'creative-button',
  },
  {
    title: 'Meine Produkte',
    icon: '📦',
    description: 'Medienführerschein, Portfolio-Vorlagen & mehr.',
    link: '/products',
    buttonClass: 'creative-button-secondary',
  },
  {
    title: 'Meine Kunstprojekte',
    icon: '🎨',
    description: 'Workshops, Auftragsmalerei & Mitmach-Aktionen.',
    link: '/art-projects',
    buttonClass: 'creative-button-tertiary',
  },
  {
    title: 'Kontakt',
    icon: '📬',
    description: 'Schreib mir oder folge mir auf Social Media.',
    link: '/contact',
    buttonClass: 'creative-button-green',
  },
];
</script>

<style scoped>
/* Page-specific styles can be added here */
</style>
