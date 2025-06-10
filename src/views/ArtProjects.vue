<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-6">
          Meine Kunstprojekte 🎨
        </h1>
        <p class="text-xl font-comic text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
          Ich biete kreative Mitmachformate für Kinder, Kitas und Einrichtungen an. 
          Meine Angebote umfassen:
        </p>
      </div>

      <!-- Projects -->
      <div class="space-y-16">
        <div
          v-for="(project, index) in projects"
          :key="index"
          :class="['bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-sky-blue-200 hover:border-sky-blue-400 transition-all duration-300 hover:shadow-lg flex flex-col lg:flex',
            index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
          ]"
        >
          <!-- Image/Icon -->
          <div class="lg:w-1/2">
            <div class="h-64 lg:h-full bg-gradient-to-br from-rose-pink-100 to-grass-green-100 flex items-center justify-center text-8xl animate-float">
              {{ project.icon }}
            </div>
          </div>

          <!-- Content -->
          <div class="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h3 class="text-3xl font-fredoka font-bold text-gray-800 mb-4">
              {{ project.title }}
            </h3>
            <p class="text-gray-700 font-comic text-lg mb-6 leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Details -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div v-for="(detail, idx) in project.details" :key="idx" class="flex items-center text-gray-600 font-comic">
                <span class="w-2 h-2 bg-rose-pink-400 rounded-full mr-3"></span>
                {{ detail }}
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="creative-button-tertiary flex items-center justify-center">
                <Calendar class="mr-2 h-5 w-5" />
                Termin anfragen
              </button>
              <button class="creative-button-secondary flex items-center justify-center">
                <Lightbulb class="mr-2 h-5 w-5" />
                Mehr Infos
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Info Section -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Pricing Info -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sunny-yellow-200">
          <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4 flex items-center">
            <span class="text-3xl mr-3">💰</span>
            Preise & Konditionen
          </h3>
          <div class="space-y-3 font-comic text-gray-700">
            <p>• <strong>Workshops:</strong> ab 25€ pro Kind (2-4h)</p>
            <p>• <strong>Wandmalerei:</strong> ab 200€ (je nach Größe)</p>
            <p>• <strong>Projektwochen:</strong> Individuelle Absprache</p>
            <p>• <strong>Gruppenprojekte:</strong> ab 150€ pro Tag</p>
          </div>
          <p class="text-sm font-comic text-gray-600 mt-4">
            Alle Materialien und Fahrtkosten (bis 30km) sind inklusive!
          </p>
        </div>

        <!-- Booking Info -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-grass-green-200">
          <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4 flex items-center">
            <span class="text-3xl mr-3">📅</span>
            Buchung & Ablauf
          </h3>
          <div class="space-y-3 font-comic text-gray-700">
            <p>• <strong>Anfrage:</strong> Schreib mir deine Idee</p>
            <p>• <strong>Beratung:</strong> Kostenloses Vorgespräch</p>
            <p>• <strong>Planung:</strong> Gemeinsame Konzeptentwicklung</p>
            <p>• <strong>Umsetzung:</strong> Kunst wird lebendig!</p>
          </div>
          <button class="creative-button-green mt-6 w-full">
            Jetzt Projekt starten!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Lightbulb } from 'lucide-vue-next';

const projects = [
  {
    title: 'Workshops',
    icon: '🎨',
    description: 'Mal- und Bastel-Workshops, angepasst an Alter und Thema. Von Aquarellmalerei bis hin zu Upcycling-Projekten.',
    details: [
      'Altersgruppen 3-16 Jahre',
      '2-4 Stunden Dauer',
      'Alle Materialien inklusive',
      'Max. 12 Teilnehmer'
    ],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=500&h=400&fit=crop'
  },
  {
    title: 'Auftragsmalerei',
    icon: '🖼️',
    description: 'Individuelle Wandbilder für Kinderzimmer & Einrichtungen. Traumhafte Welten, die zum Staunen und Träumen einladen.',
    details: [
      'Wandmalerei vor Ort',
      'Digitale Entwürfe',
      'Nachhaltige Farben',
      'Individuelle Motive'
    ],
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=400&fit=crop'
  },
  {
    title: 'Projekte vor Ort',
    icon: '🏫',
    description: 'Besuche in Kitas/Schulen für Kunsttage und Projektwochen. Ich bringe die Kunst direkt zu euch!',
    details: [
      'Mehrtägige Projekte',
      'Mobile Ausstattung',
      'Gruppenprojekte',
      'Ausstellungen'
    ],
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=400&fit=crop'
  },
  {
    title: 'Kollaborative Kunstaktionen',
    icon: '🤝',
    description: 'Gemeinschaftsbilder, jahreszeitliche Kunstwerke & mehr. Zusammen schaffen wir Großartiges!',
    details: [
      'Große Gruppenprojekte',
      'Jahreszeitliche Themen',
      'Nachbarschaftsaktionen',
      'Fest-Installationen'
    ],
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=500&h=400&fit=crop'
  },
  {
    title: 'Offene Ideen & Kooperationen',
    icon: '💡',
    description: 'Hast du eine Idee? Lass uns gemeinsam kreativ werden! Ich bin offen für neue Projekte und Kooperationen.',
    details: [
      'Individuelle Konzepte',
      'Neue Formate',
      'Kooperationen willkommen',
      'Experimentelle Ansätze'
    ],
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&h=400&fit=crop'
  }
];
</script>

<style scoped>
/* Page-specific styles can be added here */
</style>
