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
      <div class="space-y-16">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          :class="['bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-sunny-yellow-200 transition-all duration-300 hover:shadow-lg flex flex-col lg:flex',
            index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
          ]"
        >
          <!-- Image Gallery -->
          <div class="lg:w-1/2 relative group">
            <div class="h-80 lg:h-full w-full overflow-hidden">
              <img 
                :src="product.images[galleryState[product.id].currentIndex]" 
                :alt="product.title"
                class="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                @click="openFullscreen(product.images, galleryState[product.id].currentIndex)"
              />
            </div>
            <!-- Gallery Controls -->
            <button @click="prevImage(product.id)" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 transition-opacity opacity-0 group-hover:opacity-100">
              <ChevronLeft class="h-6 w-6 text-gray-800" />
            </button>
            <button @click="nextImage(product.id)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 transition-opacity opacity-0 group-hover:opacity-100">
              <ChevronRight class="h-6 w-6 text-gray-800" />
            </button>
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
                <span :style="{ backgroundColor: product.buttonColor }" class="w-2 h-2 rounded-full mr-3"></span>
                {{ feature }}
              </div>
            </div>

            <!-- Action Button -->
            <a :href="generateMailto(product)" 
               :style="{ backgroundColor: product.buttonColor }"
               class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 flex items-center justify-center">
              <Mail class="mr-2 h-5 w-5" />
              Anfrage via E-Mail
            </a>
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
        <a :href="individualRequestMailto" class="creative-button-green inline-flex items-center">
          <Mail class="mr-2 h-5 w-5" />
          Kontakt aufnehmen
        </a>
      </div>
    </div>

    <!-- Fullscreen Image Viewer -->
    <transition name="fade">
      <div v-if="fullscreenState.isOpen" @click="closeFullscreen" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer">
        <button @click.stop="prevFullscreenImage" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 z-10">
          <ChevronLeft class="h-8 w-8 text-gray-900" />
        </button>
        
        <img :src="fullscreenState.images[fullscreenState.currentIndex]" alt="Vollbild" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop>
        
        <button @click.stop="nextFullscreenImage" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 z-10">
          <ChevronRight class="h-8 w-8 text-gray-900" />
        </button>

        <button @click.stop="closeFullscreen" class="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2">
            <X class="h-6 w-6 text-gray-900" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Mail, ChevronLeft, ChevronRight, X } from 'lucide-vue-next';
import testbild from '@/assets/testbild.jpg';

const products = ref([
  {
    id: 1,
    title: 'Medienführerschein',
    description: 'Spielerisch den sicheren Umgang mit Smartphone & Co. lernen. Altersgerechte Übungen und Aufgaben für Kinder von 6-12 Jahren.',
    features: ['Interactive Übungen', 'Eltern-Guide', 'Zertifikat', 'Altersgerecht'],
    buttonColor: '#84cc16', // lime-500
    images: [ testbild, testbild, testbild ]
  },
  {
    id: 2,
    title: 'Portfolio-Vorlagen',
    description: 'Schöne Layouts für Kita- und Schulprojekte. Einfach zum Ausdrucken und Gestalten - perfekt für kleine Künstler!',
    features: ['15+ Vorlagen', 'Druckfertig', 'Individualisierbar', 'Verschiedene Themen'],
    buttonColor: '#3b82f6', // blue-500
    images: [ testbild, testbild ]
  },
  {
    id: 3,
    title: 'Kita-Kalender',
    description: 'Ausdruckbarer Bastelkalender für jede Jahreszeit. Mit kreativen Ideen und Anregungen für das ganze Jahr.',
    features: ['12 Monatsblätter', 'Bastelideen', 'Jahreszeitlich', 'Farbig illustriert'],
    buttonColor: '#f43f5e', // rose-500
    images: [ testbild, testbild, testbild ]
  },
  {
    id: 4,
    title: 'Kreisspiele',
    description: 'Ideen für Bewegungsspiele im Kreis. Fördern Gemeinschaftsgefühl, Koordination und machen dabei richtig Spaß!',
    features: ['20+ Spiele', 'Altersgruppen 3-8', 'Einfache Regeln', 'Ohne Material'],
    buttonColor: '#f97316', // orange-500
    images: [ testbild, testbild ]
  },
]);

// Gallery State
const galleryState = reactive<Record<number, { currentIndex: number }>>({});
products.value.forEach(p => {
  galleryState[p.id] = { currentIndex: 0 };
});

const nextImage = (productId: number) => {
  const product = products.value.find(p => p.id === productId);
  if (product) {
    const state = galleryState[productId];
    state.currentIndex = (state.currentIndex + 1) % product.images.length;
  }
};

const prevImage = (productId: number) => {
  const product = products.value.find(p => p.id === productId);
  if (product) {
    const state = galleryState[productId];
    state.currentIndex = (state.currentIndex - 1 + product.images.length) % product.images.length;
  }
};

// Fullscreen Viewer State
const fullscreenState = reactive({
  isOpen: false,
  images: [] as string[],
  currentIndex: 0,
});

const openFullscreen = (images: string[], startIndex: number) => {
  fullscreenState.images = images;
  fullscreenState.currentIndex = startIndex;
  fullscreenState.isOpen = true;
};

const closeFullscreen = () => {
  fullscreenState.isOpen = false;
};

const nextFullscreenImage = () => {
  fullscreenState.currentIndex = (fullscreenState.currentIndex + 1) % fullscreenState.images.length;
};

const prevFullscreenImage = () => {
  fullscreenState.currentIndex = (fullscreenState.currentIndex - 1 + fullscreenState.images.length) % fullscreenState.images.length;
};

// Mailto Links
const generateMailto = (product: typeof products.value[0]) => {
  const subject = encodeURIComponent(`Anfrage für Produkt: ${product.title}`);
  const body = encodeURIComponent(`Hallo Jo-Ann,\n\nich interessiere mich für das Produkt "${product.title}" und würde gerne mehr darüber erfahren.\n\nViele Grüße`);
  return `mailto:hallo@kik-creations.de?subject=${subject}&body=${body}`;
};

const individualRequestMailto = computed(() => {
  const subject = encodeURIComponent('Anfrage für individuelle Wünsche');
  const body = encodeURIComponent(`Hallo Jo-Ann,\n\nich habe eine Idee für ein individuelles Projekt und würde gerne die Möglichkeiten mit dir besprechen.\n\nViele Grüße`);
  return `mailto:hallo@kik-creations.de?subject=${subject}&body=${body}`;
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
