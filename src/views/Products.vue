<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-6">
          Meine Produkte 🛍️
        </h1>
        <p class="text-xl font-comic text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Liebevoll gestaltete Lernmaterialien und kreative Vorlagen, die Kindern 
          Freude am Lernen vermitteln und Pädagogen den Alltag erleichtern! ✨
        </p>
      </div>

      <!-- Products Grid -->
      <div class="space-y-12">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          :class="['bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-sunny-yellow-200 hover:border-sunny-yellow-400 transition-all duration-300 hover:shadow-lg flex flex-col lg:flex',
            index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
          ]"
        >
          <!-- Image -->
          <div class="lg:w-1/2">
            <div class="h-64 lg:h-full bg-gradient-to-br from-sunny-yellow-100 to-sky-blue-100 flex items-center justify-center text-8xl animate-float">
              {{ product.icon }}
            </div>
          </div>

          <!-- Content -->
          <div class="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h3 class="text-3xl font-fredoka font-bold text-gray-800 mb-4">
              {{ product.title }}
            </h3>
            <p class="text-gray-700 font-comic text-lg mb-6 leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Features -->
            <div class="grid grid-cols-2 gap-3 mb-8">
              <div v-for="(feature, idx) in product.features" :key="idx" class="flex items-center text-gray-600 font-comic">
                <span class="w-2 h-2 bg-sunny-yellow-400 rounded-full mr-3"></span>
                {{ feature }}
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button :class="[product.buttonClass, 'flex items-center justify-center']">
                <Download class="mr-2 h-5 w-5" />
                Download / Kaufen
              </button>
              <button class="bg-white/80 hover:bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-200 hover:shadow-md flex items-center justify-center">
                <FileText class="mr-2 h-5 w-5" />
                Vorschau
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-rose-pink-200">
        <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-4">
          Individuelle Wünsche? 💭
        </h2>
        <p class="text-xl font-comic text-gray-700 mb-8 max-w-2xl mx-auto">
          Du hast eine spezielle Idee oder brauchst etwas Maßgeschneidertes? 
          Ich entwickle gerne individuelle Materialien für deine Bedürfnisse!
        </p>
        <button class="creative-button-green">
          Kontakt aufnehmen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, FileText } from 'lucide-vue-next';

const products = [
  {
    id: 1,
    title: 'Medienführerschein',
    icon: '📱',
    description: 'Spielerisch den sicheren Umgang mit Smartphone & Co. lernen. Altersgerechte Übungen und Aufgaben für Kinder von 6-12 Jahren.',
    features: ['Interactive Übungen', 'Eltern-Guide', 'Zertifikat', 'Altersgerecht'],
    buttonClass: 'creative-button',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Portfolio-Vorlagen',
    icon: '📁',
    description: 'Schöne Layouts für Kita- und Schulprojekte. Einfach zum Ausdrucken und Gestalten - perfekt für kleine Künstler!',
    features: ['15+ Vorlagen', 'Druckfertig', 'Individualisierbar', 'Verschiedene Themen'],
    buttonClass: 'creative-button-secondary',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Kita-Kalender',
    icon: '📅',
    description: 'Ausdruckbarer Bastelkalender für jede Jahreszeit. Mit kreativen Ideen und Anregungen für das ganze Jahr.',
    features: ['12 Monatsblätter', 'Bastelideen', 'Jahreszeitlich', 'Farbig illustriert'],
    buttonClass: 'creative-button-tertiary',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Kreisspiele',
    icon: '🎯',
    description: 'Ideen für Bewegungsspiele im Kreis. Fördern Gemeinschaftsgefühl, Koordination und machen dabei richtig Spaß!',
    features: ['20+ Spiele', 'Altersgruppen 3-8', 'Einfache Regeln', 'Ohne Material'],
    buttonClass: 'creative-button-green',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: 'Tischsprüche & Reime',
    icon: '🍽️',
    description: 'Kurze Sprüche und Reime für den Essensbeginn. Schaffen Rituale und machen das gemeinsame Essen zu etwas Besonderem.',
    features: ['30+ Sprüche', 'Verschiedene Anlässe', 'Illustriert', 'Leicht merkbar'],
    buttonClass: 'creative-button',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'
  }
];
</script>

<style scoped>
/* Page-specific styles can be added here */
</style>
