<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-6">
          Meine Produkte 🛍️
        </h1>
        <p class="text-xl font-comic text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Liebevoll gestaltete Materialien und kreative Vorlagen, die Kinder Freude am Lernen vermitteln und Pädagog*innen den Alltag erleichtern.
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
            <div class="flex flex-wrap gap-6 mb-8">
              <div v-for="(feature, idx) in product.features" :key="idx" class="flex items-center text-gray-600 font-comic whitespace-nowrap">
                <span :style="{ backgroundColor: product.buttonColor }" class="w-3 h-3 rounded-full mr-3 flex-shrink-0 min-w-[12px] min-h-[12px]"></span>
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

      <!-- Wunderboxen Section -->
      <section class="mt-20 bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-lime-green-200">
        <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 text-center">Wunderboxen</h2>
        <p class="font-comic text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          Entdecke alle Wunderboxen in der Übersicht. Mit einem Klick auf „Mehr Infos“ vergrößert sich die Box und zeigt dir alle Details – inklusive Versand.
        </p>

        <!-- Übersicht: Karten im 2-Spalten-Layout -->
        <div v-if="!selectedBox" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div
            v-for="box in boxes"
            :key="box.id"
            class="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-sunny-yellow-200 transition-all duration-300 hover:shadow-lg lg:flex"
          >
            <div class="lg:w-1/2 relative group">
              <div class="h-56 lg:h-full w-full overflow-hidden">
                <img :src="box.images[0]" :alt="box.title" class="w-full h-full object-cover">
              </div>
            </div>
            <div class="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-3">{{ box.title }}</h3>
              <p class="text-gray-700 font-comic mb-4">{{ box.description }}</p>
              <button
                :style="{ backgroundColor: box.color }"
                class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center justify-center"
                @click="() => { selectedBoxId = box.id; boxShowMore = false; boxGalleryIndex = 0; }"
              >
                Mehr Infos
                <ChevronRight class="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Expanded Box Detail View -->
        <transition name="slide-fade">
          <div v-if="selectedBox" class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-sunny-yellow-200">
            <div class="flex flex-col lg:flex-row gap-8 items-start">
              <!-- Bild/Galerie -->
              <div class="lg:w-1/2 relative group rounded-2xl overflow-hidden border border-gray-200">
                <img :src="selectedBox.images[boxGalleryIndex]" :alt="selectedBox.title" class="w-full h-80 object-cover cursor-pointer" @click="openFullscreen(selectedBox.images, boxGalleryIndex)">
                <button @click="prevBoxImage" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition">
                  <ChevronLeft class="h-6 w-6 text-gray-800" />
                </button>
                <button @click="nextBoxImage" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition">
                  <ChevronRight class="h-6 w-6 text-gray-800" />
                </button>
              </div>

              <!-- Inhalte / Infos -->
              <div class="lg:w-1/2">
                <h3 class="text-3xl font-fredoka font-bold text-gray-800 mb-3">{{ selectedBox.title }}</h3>
                <p class="text-gray-700 font-comic text-lg mb-6 leading-relaxed">{{ selectedBox.description }}</p>

                <div class="flex flex-wrap gap-6 mb-6">
                  <div v-for="(feature, idx) in selectedBox.features" :key="idx" class="flex items-center text-gray-600 font-comic whitespace-nowrap">
                    <span :style="{ backgroundColor: selectedBox.color }" class="w-3 h-3 rounded-full mr-3 flex-shrink-0 min-w-[12px] min-h-[12px]"></span>
                    {{ feature }}
                  </div>
                </div>

                <div class="bg-lime-50 border border-lime-200 rounded-xl p-4 mb-6 font-comic text-gray-700">
                  <p class="mb-1">+ Versand ohne Versicherung 4,19 Euro</p>
                  <p>+ Versand mit Versicherung 6,19 Euro</p>
                </div>

                <!-- Link 'Mehr Infos' als farbige Schrift -->
                <button @click="toggleBoxMore" class="font-fredoka font-bold underline transition-opacity hover:opacity-80"
                        :style="{ color: selectedBox.color }">
                  Mehr Infos
                </button>

                <!-- Navigation: Vorherige | Zur Übersicht | Nächste -->
                <div class="flex items-center gap-3 w-full mt-4">
                  <button
                    class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center"
                    :style="{ backgroundColor: '#3b82f6' }"
                    @click="prevBox"
                  >
                    Vorherige Box
                  </button>
                  <button
                    class="text-gray-800 bg-white/80 border border-gray-300 font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg inline-flex items-center mx-auto"
                    @click="backToOverview"
                  >
                    Zur Übersicht
                  </button>
                  <button
                    class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center"
                    :style="{ backgroundColor: '#84cc16' }"
                    @click="nextBox"
                  >
                    Nächste Box
                  </button>
                </div>

                <transition name="fade">
                  <div v-if="boxShowMore" class="mt-6 space-y-3 font-comic text-gray-700">
                    <p><strong>Inhalte:</strong> {{ selectedBox.more.inhalte }}</p>
                    <p><strong>Zielgruppe:</strong> {{ selectedBox.more.zielgruppe }}</p>
                    <p><strong>Hinweise:</strong> {{ selectedBox.more.hinweise }}</p>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </transition>
      </section>

      <!-- Bottom CTA -->
      <div class="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-rose-pink-200">
        <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-4">
          Individuelle Wünsche? 💭
        </h2>
        <p class="text-xl font-comic text-gray-700 mb-8 max-w-2xl mx-auto">
          Du hast eine spezielle Idee oder brauchst etwas persönlich Zugeschnittenes? Ich entwickle gerne individuelle Materialien für deine Bedürfnisse!
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
import { Mail, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-vue-next';
import testbild from '@/assets/testbild.jpg';

const products = ref([
  {
    id: 1,
    title: 'Medienführerschein',
    description: 'Spielerisch den sicheren Umgang mit digitalen Medien lernen. Altersgerechte Übungen und Aufgaben für Kinder von 6-12 Jahren.',
    features: ['Kindgerechtes Lernpaket', 'Inkl. Praxisleitfaden für Eltern/Fachkräfte', 'Mitmach-Zertifikat', 'Altersgerecht'],
    buttonColor: '#84cc16', // lime-500
    images: [ testbild, testbild, testbild ]
  },
  {
    id: 2,
    title: 'Portfolio-Vorlagen',
    description: 'Schöne Layouts für die Portfolioarbeit in Kitas. Einfach zum Ausdrucken und Gestalten - perfekt für kleine Entdecker*innen.',
    features: ['30+ Vorlagen', 'Druckfertig', 'Platz zum Malen, kleben und ausfüllen', 'Verschiedene Themen'],
    buttonColor: '#3b82f6', // blue-500
    images: [ testbild, testbild ]
  },
  {
    id: 3,
    title: 'Kita- und Schul-Kalender',
    description: 'Vorgefertigter Kalender für jede Jahreszeit. Im A6-Format zum idealen Gebrauch im Kita- und Schulalltag.',
    features: ['12 Monatsblätter', 'Jahreszeitlich', 'Feste und Feiertage', 'Farbig illustriert'],
    buttonColor: '#f43f5e', // rose-500
    images: [ testbild, testbild, testbild ]
  },
  {
    id: 4,
    title: 'Kreisspiele',
    description: 'Ideen und Impulse für das Zusammenkommen im Kreis. Die Kreisspiele fördern das Gemeinschaftsgefühl, Koordination und machen dabei richtig Spaß!',
    features: ['20+ Spiele', 'Altersgruppe 3-8 Jahre', 'Einfache Regeln und Individuell anpassbar', 'Praktisches A6-Format'],
    buttonColor: '#f97316', // orange-500
    images: [ testbild, testbild ]
  },
]);

// Wunderboxen
type Box = {
  id: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  images: string[];
  more: { inhalte: string; zielgruppe: string; hinweise: string };
};

const boxes = ref<Box[]>([
  { id: 'zahlen1', title: 'Zahlen 1', description: 'Grundbegriffe der Zahlenwelt spielerisch entdecken.', features: ['Zahlenposter', 'Übungsblätter', 'Kreativaufgaben'], color: '#84cc16', images: [testbild, testbild], more: { inhalte: 'Platzhalter – bitte Inhalte liefern.', zielgruppe: 'Platzhalter – bitte Zielgruppe liefern.', hinweise: 'Platzhalter – bitte Hinweise liefern.' } },
  { id: 'abc1', title: 'ABC 1', description: 'Buchstaben kennenlernen und kreativ umsetzen.', features: ['Alphabetkarten', 'Mal- & Schreibübungen'], color: '#3b82f6', images: [testbild], more: { inhalte: 'Platzhalter – bitte Inhalte liefern.', zielgruppe: 'Platzhalter – bitte Zielgruppe liefern.', hinweise: 'Platzhalter – bitte Hinweise liefern.' } },
  { id: 'englisch1', title: 'Englisch 1', description: 'Erste englische Wörter und spielerisches Lernen.', features: ['Vokabelkarten', 'Spiele & Aufgaben'], color: '#f59e0b', images: [testbild, testbild, testbild], more: { inhalte: 'Platzhalter – bitte Inhalte liefern.', zielgruppe: 'Platzhalter – bitte Zielgruppe liefern.', hinweise: 'Platzhalter – bitte Hinweise liefern.' } },
  { id: 'kunst1', title: 'Kunst 1', description: 'Kreative Projekte zum Malen, Basteln und Gestalten.', features: ['Projektkarten', 'Materialliste'], color: '#f43f5e', images: [testbild], more: { inhalte: 'Platzhalter – bitte Inhalte liefern.', zielgruppe: 'Platzhalter – bitte Zielgruppe liefern.', hinweise: 'Platzhalter – bitte Hinweise liefern.' } },
  { id: 'tiere1', title: 'Tiere 1', description: 'Die Tierwelt entdecken – mit Spaß und Bewegung.', features: ['Tierkarten', 'Mitmachideen'], color: '#10b981', images: [testbild, testbild], more: { inhalte: 'Platzhalter – bitte Inhalte liefern.', zielgruppe: 'Platzhalter – bitte Zielgruppe liefern.', hinweise: 'Platzhalter – bitte Hinweise liefern.' } },
]);

const selectedBoxId = ref<string | null>(null);
const selectedBox = computed(() => boxes.value.find(b => b.id === selectedBoxId.value) || null);
const boxShowMore = ref(false);
const boxGalleryIndex = ref(0);

const toggleBoxMore = () => { boxShowMore.value = !boxShowMore.value; };
const nextBoxImage = () => { if (selectedBox.value) { boxGalleryIndex.value = (boxGalleryIndex.value + 1) % selectedBox.value.images.length; } };
const prevBoxImage = () => { if (selectedBox.value) { boxGalleryIndex.value = (boxGalleryIndex.value - 1 + selectedBox.value.images.length) % selectedBox.value.images.length; } };

// Navigation zwischen Boxen & zurück zur Übersicht
const backToOverview = () => { selectedBoxId.value = null; boxShowMore.value = false; boxGalleryIndex.value = 0; };
const nextBox = () => {
  if (!selectedBox.value) return;
  const idx = boxes.value.findIndex(b => b.id === selectedBox.value!.id);
  const next = (idx + 1) % boxes.value.length;
  selectedBoxId.value = boxes.value[next].id;
  boxShowMore.value = false;
  boxGalleryIndex.value = 0;
};
const prevBox = () => {
  if (!selectedBox.value) return;
  const idx = boxes.value.findIndex(b => b.id === selectedBox.value!.id);
  const prev = (idx - 1 + boxes.value.length) % boxes.value.length;
  selectedBoxId.value = boxes.value[prev].id;
  boxShowMore.value = false;
  boxGalleryIndex.value = 0;
};

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

/* Animation for expanding Wunderbox detail */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
