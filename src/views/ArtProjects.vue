<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-6">
          Kunstprojekte & Workshops 🎨
        </h1>
        <p class="text-xl font-comic text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Entdecke kreative Workshops, einzigartige Kunst und Möglichkeiten zur Zusammenarbeit.
          Hier wird Fantasie lebendig! ✨
        </p>
      </div>

      <div class="space-y-16">
        
        <!-- Workshops Section -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sky-blue-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6">Kreativ-Workshops</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <p class="font-comic text-lg text-gray-700 mb-6">Wähle einen Workshop, um verfügbare Termine zu sehen. In den Workshops entdecken wir gemeinsam neue Techniken und Materialien.</p>
              <div class="space-y-4">
                <!-- Custom Dropdown -->
                <div class="relative">
                  <select v-model="selectedWorkshopId" class="w-full appearance-none bg-white border border-gray-300 rounded-full font-comic text-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-blue-400 transition-all">
                    <option :value="null" disabled>Workshop auswählen...</option>
                    <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.id">{{ workshop.title }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <ChevronDown class="h-5 w-5" />
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <button @click="openModal('workshop', 0)"
                    class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center justify-center"
                    :style="{ backgroundColor: '#38bdf8' }">
                    Mehr Infos
                  </button>
                  <a :href="workshopMailtoLink"
                    :class="[{ 'opacity-50 cursor-not-allowed': !selectedWorkshopId } ]"
                    class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center justify-center"
                    :style="{ backgroundColor: '#84cc16' }"
                    :aria-disabled="!selectedWorkshopId"
                    @click="checkWorkshopSelection">
                    Anfrage via E-Mail
                  </a>
                </div>

                <!-- Display Dates -->
                <transition name="fade">
                  <div v-if="selectedWorkshopDates.length > 0" class="mt-4 bg-sky-blue-50 p-4 rounded-xl">
                    <h4 class="font-fredoka font-bold text-sky-blue-800 mb-2">Verfügbare Termine:</h4>
                    <ul class="list-disc list-inside font-comic text-sky-blue-700">
                      <li v-for="date in selectedWorkshopDates" :key="date">{{ date }}</li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>
            <div class="h-64 md:h-full rounded-2xl overflow-hidden shadow-lg">
              <img :src="testbild" alt="Kreativ-Workshops" class="w-full h-full object-cover">
            </div>
          </div>
        </section>

        <!-- Kunstprodukte -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-rose-pink-200">
            <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 text-center">Meine Kunst</h2>
            <p class="font-comic text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">Ein kleiner Einblick in meine Werke. Klicke auf ein Bild, um es in voller Größe zu sehen.</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(image, index) in artPieces" :key="index" class="overflow-hidden rounded-lg cursor-pointer group" @click="openImage(image.src)">
                    <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300">
                </div>
            </div>
        </section>

        <!-- Auftragsmalerei -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-lime-green-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6">Auftragsmalerei</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div class="h-64 md:h-full bg-gradient-to-br from-lime-green-100 to-sunny-yellow-100 rounded-2xl flex items-center justify-center text-6xl">
              🖼️
            </div>
            <div>
              <p class="font-comic text-lg text-gray-700 mb-6">Du hast eine Vision? Ich bringe sie auf die Leinwand. Lass uns gemeinsam dein persönliches Kunstwerk erschaffen.</p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="openModal('auftragsmalerei')"
                  class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center justify-center w-full"
                  :style="{ backgroundColor: '#84cc16' }">
                  Mehr Infos
                </button>
                <a :href="mailtoLinks.auftragsmalerei"
                  class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center justify-center w-full"
                  :style="{ backgroundColor: '#f59e0b' }">
                  Anfrage via E-Mail
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Gemeinschaftsprojekte -->
        <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-grape-purple-200">
          <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6">Gemeinschaftsprojekte</h2>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p class="font-comic text-lg text-gray-700 mb-6">Kunst verbindet! Ob in Schulen, Gemeinden oder Unternehmen – ich gestalte kreative Aktionen, die Menschen zusammenbringen.</p>
              <button @click="openModal('gemeinschaftsprojekte')"
              class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center justify-center w-full"
              :style="{ backgroundColor: '#a855f7' }">
              Mehr Infos
            </button>
            </div>
            <div class="h-64 md:h-full bg-gradient-to-br from-grape-purple-100 to-rose-pink-100 rounded-2xl flex items-center justify-center text-6xl">
              🤝
            </div>
          </div>
        </section>

        <!-- Offene Ideen & Kooperationen -->
        <div class="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-sunny-yellow-200">
            <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-4">Offen für Ideen & Kooperationen?</h2>
            <p class="text-xl font-comic text-gray-700 mb-8 max-w-2xl mx-auto">Du hast eine spannende Idee, eine Anfrage für eine Kollaboration oder ein Projekt? Ich freue mich, von dir zu hören!</p>
            <a :href="mailtoLinks.kooperationen"
               class="text-white font-fredoka font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:brightness-110 inline-flex items-center"
               :style="{ backgroundColor: '#f59e0b' }">
              <Mail class="mr-2 h-5 w-5" />
              Kontakt aufnehmen
            </a>
        </div>
      </div>
    </div>

    <!-- Fullscreen Image Viewer with Arrows (same design as Products) -->
    <transition name="fade">
      <div v-if="imageViewer.isOpen" @click="closeImage" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer">
        <button @click.stop="prevImage" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 z-10">
          <ChevronLeft class="h-8 w-8 text-gray-900" />
        </button>

        <img :src="currentImageSrc" alt="Vollbild Kunstwerk" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop>

        <button @click.stop="nextImage" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 z-10">
          <ChevronRight class="h-8 w-8 text-gray-900" />
        </button>

        <button @click.stop="closeImage" class="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2">
            <X class="h-6 w-6 text-gray-900" />
        </button>
      </div>
    </transition>

    <!-- Generic Modal -->
    <transition name="fade">
        <div v-if="modal.isOpen" @click="closeModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer">
            <div class="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8" @click.stop>

                <!-- Workshop Modal Content -->
                <div v-if="modal.type === 'workshop'">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-2xl font-fredoka font-bold text-gray-800">{{ workshops[modal.contentIndex].title }}</h3>
                        <div class="flex items-center gap-2">
                            <button @click="prevModalContent" class="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition">
                                <ChevronLeft class="h-6 w-6" />
                            </button>
                            <button @click="nextModalContent" class="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition">
                                <ChevronRight class="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <transition name="slide-fade" mode="out-in">
                      <div :key="workshops[modal.contentIndex].id">
                        <img :src="workshops[modal.contentIndex].image" class="w-full h-64 object-cover rounded-lg mb-4"/>
                        <p class="font-comic text-gray-700">{{ workshops[modal.contentIndex].description }}</p>
                      </div>
                    </transition>
                </div>

                <!-- Auftragsmalerei Modal Content -->
                <div v-if="modal.type === 'auftragsmalerei'">
                    <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4">So läuft deine Auftragsarbeit ab</h3>
                    <ul class="space-y-4 font-comic text-gray-700">
                        <li class="flex items-start"><span class="font-bold text-lime-green-600 mr-3">1.</span><div><span class="font-bold">Motiv wählen:</span> Wir besprechen deine Wünsche und Ideen. Du kannst mir Referenzbilder oder eine genaue Beschreibung geben.</div></li>
                        <li class="flex items-start"><span class="font-bold text-lime-green-600 mr-3">2.</span><div><span class="font-bold">Größe der Leinwand wählen:</span> Von kleinen Formaten bis hin zu großen Wandbildern ist alles möglich.</div></li>
                        <li class="flex items-start"><span class="font-bold text-lime-green-600 mr-3">3.</span><div><span class="font-bold">Material wählen:</span> Acryl, Öl, Aquarell oder eine Mischtechnik? Wir finden das passende Material für dein Kunstwerk.</div></li>
                    </ul>
                </div>

                <!-- Gemeinschaftsprojekte Modal Content -->
                <div v-if="modal.type === 'gemeinschaftsprojekte'">
                    <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-4">Detaillierte Infos zu Gemeinschaftsprojekten</h3>
                     <ul class="space-y-4 font-comic text-gray-700">
                        <li class="flex items-start"><span class="font-bold text-grape-purple-600 mr-3">1.</span><div><span class="font-bold">Farbe an die Wand:</span> Gemeinsam gestalten wir Wände in Schulen, Büros oder öffentlichen Räumen zu bunten Kunstwerken.</div></li>
                        <li class="flex items-start"><span class="font-bold text-grape-purple-600 mr-3">2.</span><div><span class="font-bold">Puzzle-Geschichte:</span> Jede:r Teilnehmer:in gestaltet ein Puzzleteil. Am Ende fügen wir alles zu einer großen, gemeinsamen Geschichte zusammen.</div></li>
                    </ul>
                </div>

                 <button @click.stop="closeModal" class="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2">
                    <X class="h-6 w-6 text-gray-900" />
                </button>
            </div>
        </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Mail, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-vue-next';
import testbild from '@/assets/testbild.jpg';

// --- Data ---
const workshops = ref([
  { id: 1, title: 'Aquarell-Zauber', description: 'Wir malen mit fließenden Farben und entdecken die Magie des Wassers. Für Anfänger und Fortgeschrittene.', image: testbild, dates: ['15. Juli 2024', '22. Juli 2024'] },
  { id: 2, title: 'Digitale Kunst am Tablet', description: 'Lerne die Grundlagen des digitalen Zeichnens. Eigene Tablets können mitgebracht werden.', image: testbild, dates: ['05. August 2024', '12. August 2024'] },
  { id: 3, title: 'Upcycling-Skulpturen', description: 'Aus Alt mach Neu! Wir bauen fantastische Skulpturen aus Recycling-Materialien.', image: testbild, dates: ['10. September 2024'] },
]);

const artPieces = ref([
  { src: testbild, alt: 'Abstraktes Gemälde in Blautönen' },
  { src: testbild, alt: 'Porträtzeichnung mit Kohle' },
  { src: testbild, alt: 'Landschaft in Acryl' },
  { src: testbild, alt: 'Digitale Illustration eines Fabelwesens' },
]);

// --- Workshop Dropdown ---
const selectedWorkshopId = ref<number | null>(null);
const selectedWorkshopDates = computed(() => {
  if (!selectedWorkshopId.value) return [];
  const workshop = workshops.value.find(w => w.id === selectedWorkshopId.value);
  return workshop ? workshop.dates : [];
});

// --- Image Viewer ---
const imageViewer = reactive({ isOpen: false, index: 0 });
const currentImageSrc = computed(() => artPieces.value[imageViewer.index]?.src ?? '');
const openImage = (src: string) => {
  const idx = artPieces.value.findIndex(p => p.src === src);
  imageViewer.index = idx >= 0 ? idx : 0;
  imageViewer.isOpen = true;
};
const closeImage = () => { imageViewer.isOpen = false; };
const nextImage = () => { imageViewer.index = (imageViewer.index + 1) % artPieces.value.length; };
const prevImage = () => { imageViewer.index = (imageViewer.index - 1 + artPieces.value.length) % artPieces.value.length; };

// --- Generic Modal ---
const modal = reactive<{ isOpen: boolean; type: string | null; contentIndex: number }>({ isOpen: false, type: null, contentIndex: 0 });

const openModal = (type: string, startIndex = 0) => {
  modal.type = type;
  modal.contentIndex = startIndex;
  modal.isOpen = true;
};
const closeModal = () => { modal.isOpen = false; };

const nextModalContent = () => {
    if (modal.type === 'workshop') {
        modal.contentIndex = (modal.contentIndex + 1) % workshops.value.length;
    }
};
const prevModalContent = () => {
    if (modal.type === 'workshop') {
        modal.contentIndex = (modal.contentIndex - 1 + workshops.value.length) % workshops.value.length;
    }
};

// --- Workshop Mailto Link ---
const workshopMailtoLink = computed(() => {
    if (!selectedWorkshopId.value) {
        return '#';
    }
    const workshop = workshops.value.find(w => w.id === selectedWorkshopId.value);
    if (!workshop) {
        return '#';
    }

    const subject = `Anfrage für Workshop: ${workshop.title}`;
    const dates = selectedWorkshopDates.value.join(', ');
    const body = `Hallo Jo-Ann,\n\nich interessiere mich für den Workshop "${workshop.title}".\n\nDie von mir gesehenen Termine sind: ${dates}\n\nBitte sende mir bei Gelegenheit weitere Informationen zu.\n\nViele Grüße`;
    
    return `mailto:hallo@kik-creations.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const checkWorkshopSelection = (event: MouseEvent) => {
    if (!selectedWorkshopId.value) {
        event.preventDefault();
        alert('Bitte wähle zuerst einen Workshop aus, um eine Anfrage zu senden.');
    }
};

// --- Mailto Links ---
const mailtoLinks = computed(() => {
    const createMailto = (subject: string, body: string) => `mailto:hallo@kik-creations.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    return {
        auftragsmalerei: createMailto(
            'Anfrage für Auftragsmalerei',
            'Hallo Jo-Ann,\n\nich interessiere mich für eine Auftragsmalerei und würde gerne die Details besprechen.\n\nViele Grüße'
        ),
        kooperationen: createMailto(
            'Anfrage für Kooperation / Offene Ideen',
            'Hallo Jo-Ann,\n\nich habe eine Idee für eine Kooperation und würde diese gerne mit dir teilen.\n\nViele Grüße'
        ),
    };
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
