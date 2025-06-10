<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-sunny-yellow-200 to-rose-pink-200 rounded-full flex items-center justify-center text-6xl animate-float">
          👩‍🎨
        </div>
        <h1 class="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-6">
          Hallo! Ich bin [Dein Name] 👋
        </h1>
        <p class="text-xl font-comic text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Kreativpädagogin und leidenschaftliche Künstlerin. Mit meinen Angeboten 
          fördere ich die Fantasie und Medienkompetenz von Kindern auf spielerische 
          und liebevolle Weise. ✨
        </p>
      </div>

      <!-- Main Content -->
      <div class="space-y-16">
        <!-- Werdegang -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sky-blue-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 flex items-center">
            <Award class="mr-3 text-sky-blue-500" />
            Mein Werdegang 📚
          </h2>
          <div class="space-y-4 font-comic text-gray-700 text-lg">
            <p>
              • Studium der Erziehungswissenschaften mit Schwerpunkt Medienpädagogik
            </p>
            <p>
              • Zusatzqualifikation in Kunsttherapie für Kinder und Jugendliche
            </p>
            <p>
              • 8+ Jahre Erfahrung in Kitas, Schulen und Jugendeinrichtungen
            </p>
            <p>
              • Regelmäßige Weiterbildungen in digitaler Bildung und kreativen Methoden
            </p>
          </div>
        </section>

        <!-- Philosophie -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-grass-green-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 flex items-center">
            <Heart class="mr-3 text-grass-green-500" />
            Meine Werte & Philosophie 💫
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4 font-comic text-gray-700 text-lg">
              <p class="font-bold text-grass-green-600">Partizipation:</p>
              <p>
                Jedes Kind hat wertvolle Ideen! Ich schaffe Räume, in denen Kinder 
                ihre Kreativität frei entfalten und eigene Projekte gestalten können.
              </p>
              <p class="font-bold text-grass-green-600 mt-6">Nachhaltigkeit:</p>
              <p>
                Umweltbewusstsein beginnt früh. Wir verwenden natürliche Materialien 
                und upcyceln Gegenstände zu neuen Kunstwerken.
              </p>
            </div>
            <div class="space-y-4 font-comic text-gray-700 text-lg">
              <p class="font-bold text-grass-green-600">Spaß am Lernen:</p>
              <p>
                Lernen soll Freude machen! Durch spielerische Ansätze und 
                altersgerechte Methoden werden neue Fähigkeiten wie von selbst entwickelt.
              </p>
              <p class="font-bold text-grass-green-600 mt-6">Individualität:</p>
              <p>
                Jedes Kind ist einzigartig. Ich gehe auf die Bedürfnisse und 
                Interessen jedes einzelnen Kindes ein.
              </p>
            </div>
          </div>
        </section>

        <!-- Warum ich -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-rose-pink-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 flex items-center">
            <Star class="mr-3 text-rose-pink-500" />
            Warum ich? 🌟
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-4xl mb-3">❤️</div>
              <h3 class="font-fredoka font-bold text-gray-800 mb-2">Empathie</h3>
              <p class="font-comic text-gray-600">
                Einfühlsam und geduldig im Umgang mit Kindern jeden Alters
              </p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-3">🎓</div>
              <h3 class="font-fredoka font-bold text-gray-800 mb-2">Erfahrung</h3>
              <p class="font-comic text-gray-600">
                Langjährige Praxis in verschiedenen pädagogischen Bereichen
              </p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-3">🎨</div>
              <h3 class="font-fredoka font-bold text-gray-800 mb-2">Individualität</h3>
              <p class="font-comic text-gray-600">
                Maßgeschneiderte Angebote für jede Gruppe und jedes Kind
              </p>
            </div>
          </div>
        </section>

        <!-- Workshop Galerie -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sunny-yellow-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 text-center">
            Einblicke in meine Workshops 📸
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(item, index) in galleryItems" :key="index" class="aspect-square bg-gradient-to-br from-sunny-yellow-100 to-sky-blue-100 rounded-2xl flex items-center justify-center text-4xl hover:scale-105 transition-transform cursor-pointer">
              {{ item.emoji }}
            </div>
          </div>
          <p class="text-center font-comic text-gray-600 mt-6">
            Hier entstehen täglich kleine Kunstwerke und große Ideen! 
            Klicke auf die Bilder für eine größere Ansicht.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart, Award, Star } from 'lucide-vue-next';

const galleryItems = [
  { emoji: '🎨' },
  { emoji: '✂️' },
  { emoji: '🖍️' },
  { emoji: '📝' },
];
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
