<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="text-8xl mb-8 animate-wiggle">📬</div>
        <h1 class="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-6">
          Kontakt 💫
        </h1>
        <p class="text-xl font-comic text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Ich freue mich auf deine Nachricht! Ob Fragen zu meinen Produkten, 
          Ideen für Workshops oder einfach ein nettes Hallo - schreib mir gerne! ✨
        </p>
      </div>

      <!-- Contact Options -->
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 mb-16">
        <div
          v-for="(contact, index) in contactButtons"
          :key="index"
          class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sunny-yellow-200 hover:border-sunny-yellow-400 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        >
          <div class="text-center">
            <div class="text-6xl mb-4 animate-float">{{ contact.icon }}</div>
            <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4">
              {{ contact.title }}
            </h3>
            <p class="text-gray-700 font-comic text-lg mb-6 leading-relaxed">
              {{ contact.description }}
            </p>
            <button
              @click="handleContact(contact.action)"
              :class="[contact.buttonClass, 'inline-flex items-center']"
            >
              {{ contact.buttonText }}
              <Mail v-if="contact.action.startsWith('mailto:')" class="ml-2 h-5 w-5" />
              <ExternalLink v-else class="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Response Times -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sky-blue-200">
          <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4 flex items-center">
            <span class="text-3xl mr-3">⏰</span>
            Antwortzeiten
          </h3>
          <div class="space-y-3 font-comic text-gray-700">
            <p>• <strong>E-Mail:</strong> Meist innerhalb von 24h</p>
            <p>• <strong>Dringende Anfragen:</strong> Bitte als solche markieren</p>
            <p>• <strong>Workshops:</strong> Buchung mind. 2 Wochen im Voraus</p>
            <p>• <strong>Große Projekte:</strong> Längere Vorlaufzeit nötig</p>
          </div>
        </div>

        <!-- Working Areas -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-grass-green-200">
          <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4 flex items-center">
            <span class="text-3xl mr-3">📍</span>
            Aktionsradius
          </h3>
          <div class="space-y-3 font-comic text-gray-700">
            <p>• <strong>Hauptbereich:</strong> Berlin + 30 Kilometer Umkreis</p>
            <p>• <strong>Weitere Entfernungen:</strong> Nach Absprache</p>
            <p>• <strong>Digitale Produkte:</strong> Im Deutschsprachigem Bereich verfügbar</p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-rose-pink-200">
        <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-4">
          Lass uns kreativ werden! 🎨
        </h2>
        <p class="text-xl font-comic text-gray-700 mb-8 max-w-2xl mx-auto">
          Jede große Idee beginnt mit einem ersten Schritt. 
          Ich bin gespannt auf deine Nachricht und freue mich darauf, 
          gemeinsam etwas Wunderbares zu erschaffen!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="handleContact('mailto:kontakt@buntpapier-atelier.de')"
            class="creative-button inline-flex items-center"
          >
            <Mail class="mr-2 h-5 w-5" />
            Nachricht schreiben
          </button>
          <button
            @click="handleContact('https://www.instagram.com/jo_ann276/')"
            class="creative-button-tertiary inline-flex items-center"
          >
            <ExternalLink class="mr-2 h-5 w-5" />
            Instagram besuchen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, ExternalLink } from 'lucide-vue-next';

const contactButtons = [
  {
    title: 'E-Mail schreiben',
    icon: '✉️',
    description: 'Schreib mir direkt eine Nachricht! Ich antworte meist innerhalb von 24 Stunden.',
    action: 'mailto:kontakt@buntpapier-atelier.de',
    buttonClass: 'creative-button',
    buttonText: 'E-Mail öffnen'
  },
  {
    title: 'LinkedIn besuchen',
    icon: '🔗',
    description: 'Folge mir auf LinkedIn für professionelle Updates und Einblicke in meine Arbeit.',
    action: 'https://www.linkedin.com/in/jo-ann-b-3573682a3/',
    buttonClass: 'creative-button-secondary',
    buttonText: 'LinkedIn öffnen'
  },
  {
    title: 'Instagram folgen',
    icon: '📸',
    description: 'Entdecke neue Kunstwerke, Workshop-Einblicke, Aktuelles und kreative Inspiration!',
    action: 'https://www.instagram.com/jo_ann276/',
    buttonClass: 'creative-button-tertiary',
    buttonText: 'Instagram besuchen'
  }
];

const handleContact = (action: string) => {
  if (action.startsWith('mailto:')) {
    window.location.href = action;
  } else {
    window.open(action, '_blank', 'noopener noreferrer');
  }
};
</script>

<style scoped>
/* Page-specific styles can be added here */
</style>
