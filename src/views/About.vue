<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="relative w-48 h-48 mx-auto mb-8 animate-gentle-float">
          <div class="absolute inset-0 bg-white p-3 rounded-lg shadow-lg transform -rotate-2 transition-transform duration-500 hover:rotate-0">
            <img :src="profileImage" alt="Jo-Ann Bachhuber" class="w-full h-full object-cover rounded-md">
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-6">
          Hallo! Ich bin Jo-Ann 👋
        </h1>
        <p class="text-xl font-comic text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Ich bin Jo-Ann Bachhuber, Kindheitspädagogin, leidenschaftliche Künstlerin und kreative Freidenkerin. Mit meinen Projekten und Angeboten fördere ich die Fantasie und Kreativität von Kindern auf spielerische und liebevolle Weise.
        </p>
      </div>

      <!-- Main Content -->
      <div class="space-y-16">
        <!-- Werdegang Timeline -->
        <Timeline />

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
                Jedes Kind hat wertvolle Ideen! Ich möchte Räume schaffen, in denen Kindern ihre Kreativität frei entfalten und eigene Projekte gestalten können.
              </p>
              <p class="font-bold text-grass-green-600 mt-6">Nachhaltigkeit:</p>
              <p>
                Das Gelernte bleibt langfristig bestehen: Wir gestalten Dinge, die genutzt und erinnert werden. Gebastelte und gewerkte Materialien kommen im Alltag weiter zum Einsatz. Der Großteil jeder Wunderbox kann anschließend als freies Spiel- und Lernmaterial weiterverwendet werden.
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
                Jedes Kind ist einzigartig. Aufgaben und Materialien passe ich altersgerecht an und berücksichtige Bedürfnisse – barrierearm, persönlich und wertschätzend.
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
              <div class="text-4xl mb-3">🌸</div>
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
                Kreative und individuelle Förderung, die begeistert
              </p>
            </div>
          </div>
        </section>

        <!-- Einblicke in meine Workshops -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sunny-yellow-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 text-center">
            Einblicke in meine Workshops 📸
          </h2>
          <div v-if="isProd && !isWorkshopsComplete" class="text-center py-12">
            <p class="font-fredoka text-xl text-gray-700">Kommt demnächst</p>
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in workshopImages" :key="index" class="overflow-hidden rounded-lg cursor-pointer group" @click="openViewer(index)">
              <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300">
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Fullscreen Image Viewer with Arrows (same style as Products) -->
    <transition name="fade">
      <div v-if="!isProd || isWorkshopsComplete ? viewer.isOpen : false" @click="closeViewer" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer">
        <button @click.stop="prevViewerImage" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 z-10">
          <ChevronLeft class="h-8 w-8 text-gray-900" />
        </button>

        <img :src="currentViewerSrc" alt="Vollbild" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop>

        <button @click.stop="nextViewerImage" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 z-10">
          <ChevronRight class="h-8 w-8 text-gray-900" />
        </button>

        <button @click.stop="closeViewer" class="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2">
          <X class="h-6 w-6 text-gray-900" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Heart, Star, ChevronLeft, ChevronRight, X } from 'lucide-vue-next';
import Timeline from '@/components/Timeline.vue';
import testbild from '@/assets/testbild.jpg';

const profileImage = testbild;

const isProd = import.meta.env.PROD;
// Markiere als true, sobald echte Workshop-Daten/Bilder final sind
const isWorkshopsComplete = false;

const workshopImages = ref([
  { src: testbild, alt: 'Einblick in Workshop 1' },
  { src: testbild, alt: 'Einblick in Workshop 2' },
  { src: testbild, alt: 'Einblick in Workshop 3' },
  { src: testbild, alt: 'Einblick in Workshop 4' },
]);

// Fullscreen viewer state with arrows
const viewer = ref<{ isOpen: boolean; index: number }>({ isOpen: false, index: 0 });
const currentViewerSrc = computed(() => workshopImages.value[viewer.value.index]?.src ?? '');

const openViewer = (index: number) => {
  viewer.value.index = index;
  viewer.value.isOpen = true;
};

const closeViewer = () => {
  viewer.value.isOpen = false;
};

const nextViewerImage = () => {
  viewer.value.index = (viewer.value.index + 1) % workshopImages.value.length;
};

const prevViewerImage = () => {
  viewer.value.index = (viewer.value.index - 1 + workshopImages.value.length) % workshopImages.value.length;
};
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(-3deg); }
  50% { transform: translateY(-20px) rotate(-3deg); }
  100% { transform: translateY(0px) rotate(-3deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
