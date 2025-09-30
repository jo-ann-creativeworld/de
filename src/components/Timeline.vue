<template>
  <section class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sky-blue-200">
    <h2 class="text-3xl font-fredoka font-bold text-gray-800 mb-6 flex items-center">
      <Award class="mr-3 text-sky-blue-500" />
      Mein Werdegang ⏳
    </h2>

    <!-- Horizontal timeline -->
    <div class="relative">
      <div class="overflow-x-auto timeline-scroll pb-6">
        <ol class="timeline-track flex items-center gap-10 min-w-max">
          <li
            v-for="(item, idx) in items"
            :key="item.id"
            class="timeline-node text-center min-w-[120px] sm:min-w-[140px]"
          >
            <button
              class="mx-auto rounded-full border-2 flex items-center justify-center"
              :style="dotStyle(idx, item.color)"
              @click="activeIndex = idx"
              :aria-label="`Abschnitt anzeigen: ${item.title}`"
            >
              <span class="sr-only">{{ item.title }}</span>
              <span :style="iconStyle(idx)" aria-hidden="true">{{ item.dotEmoji }}</span>
            </button>
            <div class="mt-2 font-fredoka text-gray-700 whitespace-normal leading-tight text-xs sm:text-sm max-w-[140px] mx-auto">{{ item.period }}</div>
          </li>
        </ol>
      </div>

      <!-- Active content -->
      <transition name="slide-fade" mode="out-in">
        <div :key="active.id" class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <!-- Top box: plain text, no bullets -->
          <div class="border border-gray-200 rounded-2xl p-6" :style="topGradientStyle">
            <h3 class="text-2xl font-fredoka font-bold text-gray-800 mb-2">{{ active.title }}</h3>
            <p class="text-gray-600 font-comic mb-4">{{ active.subtitle }}</p>
            <p class="font-comic text-gray-700 leading-relaxed whitespace-pre-line">{{ active.topText || active.description }}</p>
          </div>

          <!-- Bottom box: optional gallery + optional content icon -->
          <div v-if="hasMedia" class="border border-gray-200 rounded-2xl p-0 overflow-hidden" :style="bottomGradientStyle">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="text-4xl" v-if="active.contentEmoji">{{ active.contentEmoji }}</div>
                <div class="flex-1"></div>
                <div v-if="active.media && active.media.length > 1" class="flex gap-2">
                  <button @click="prevMedia" class="bg-white/80 hover:bg-white rounded-full px-3 py-1 text-sm font-fredoka">Zurück</button>
                  <button @click="nextMedia" class="bg-white/80 hover:bg-white rounded-full px-3 py-1 text-sm font-fredoka">Weiter</button>
                </div>
              </div>

              <!-- Media viewport -->
              <div class="relative w-full aspect-video bg-white/40 rounded-xl overflow-hidden">
                <template v-if="currentMedia?.type === 'image'">
                  <img :src="currentMedia.src" :alt="currentMedia.alt || 'Medieninhalt'" class="w-full h-full object-cover" />
                </template>
                <template v-else-if="currentMedia?.type === 'video'">
                  <video :src="currentMedia.src" controls class="w-full h-full object-cover"></video>
                </template>
              </div>

              <!-- Thumbnails -->
              <div v-if="active.media && active.media.length > 1" class="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                <button v-for="(m, i) in active.media" :key="i" @click="mediaIndex = i" class="rounded-lg overflow-hidden border" :class="i === mediaIndex ? 'border-gray-800' : 'border-white/40'">
                  <img v-if="m.type==='image'" :src="m.src" :alt="m.alt || 'Vorschau'" class="w-full h-14 object-cover" />
                  <div v-else class="w-full h-14 flex items-center justify-center bg-black/10 text-xs font-fredoka">Video</div>
                </button>
              </div>

              <!-- Description under media -->
              <p class="mt-4 font-comic text-gray-700 leading-relaxed">{{ active.description }}</p>
            </div>
          </div>
          <div v-else class="border border-gray-200 rounded-2xl p-6" :style="bottomGradientStyle">
            <div v-if="active.contentEmoji" class="text-6xl mb-4">{{ active.contentEmoji }}</div>
            <p class="font-comic text-gray-700 leading-relaxed">{{ active.description }}</p>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Award } from 'lucide-vue-next';

type TimelineItem = {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string; // fallback text
  dotEmoji: string; // icon used for the dot only
  contentEmoji?: string | null; // optional icon in bottom box
  color: string;
  topText?: string; // plain text for the top box
  media?: Array<{ type: 'image' | 'video'; src: string; alt?: string }>; // optional media gallery for bottom box
  inactiveColored?: boolean; // if true, use item color also when inactive for the dot
};

// Base/inactive colors for dots
const baseDotColor = '#dbeafe'; // sky-100
const baseDotBorder = '#93c5fd'; // sky-300

const dotStyle = (idx: number, activeColor: string) => {
  const isActive = idx === activeIndex.value;
  const size = isActive ? 50 : 45; // larger to give icons more room
  const translateY = -(size / 2 - 1) + 18; // move ~1px further up
  const item = items.value[idx];
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: isActive ? activeColor : (item?.inactiveColored ? activeColor : baseDotColor),
    borderColor: isActive ? activeColor : (item?.inactiveColored ? activeColor : baseDotBorder),
    transform: `translateY(${translateY}px)`,
    lineHeight: `${size}px`,
  } as Record<string, string>;
};

const iconStyle = (idx: number) => {
  const isActive = idx === activeIndex.value;
  const fs = isActive ? 35 : 25; // bump emoji font-size for larger dots
  return {
    fontSize: `${fs}px`,
    filter: isActive ? 'none' : 'grayscale(70%) opacity(0.7)',
  } as Record<string, string>;
};

const items = ref<TimelineItem[]>([
  {
    id: 'studium-start',
    period: 'Okt. 2022 – laufend',
    title: 'Studium Kindheitspädagogik',
    subtitle: 'Katholische Hochschule für Sozialwesen Berlin (KHSB)',
    description:
      'Vollzeitstudium im Präsenzformat mit Schwerpunkten kreative Didaktik, Entwicklungspsychologie und Inklusion. Praxiserfahrung in einer Berliner Kindertagesstätte (5 Monate). Zusatzqualifikationen: Deutsche Gebärdensprache DGS 1 & 2.',
    dotEmoji: '🎓',
    contentEmoji: '🎓',
    color: '#0ea5e9',
    topText:
      'Studium mit enger Verzahnung von Theorie und Praxis. Fokus: Kreative Bildung, Sprache, Diversität und nachhaltige Projekte.'
  },
  {
    id: 'praevention-2023',
    period: 'Nov. 2023',
    title: 'Seminar Prävention sexualisierte Gewalt',
    subtitle: 'Erzbistum Berlin',
    description:
      'Zertifikatskurs (1 SWS) zu Definition, Formen, Folgen und Strategien. Themen: institutionelles Schutzkonzept, Verhaltenskodex, Beschwerdemanagement, Nähe & Distanz. Erfahrungen in der Schutzkonzept-Entwicklung.',
    dotEmoji: '🔐',
    contentEmoji: '🔐',
    color: '#a855f7',
    topText:
      'Vertiefung im Bereich Präventionsarbeit und Kinderschutz mit Praxisbezug.'
  },
  {
    id: 'ndt-2024',
    period: 'Aug. – Okt. 2024',
    title: 'Norddeutschland-Tour',
    subtitle: 'Persönliches Reiseprojekt',
    description: null,
    dotEmoji: '🛵',
    contentEmoji: '🛵',
    color: '#f43f5e',
    topText: 'Zu weit mit einer Vespa von Berlin über Swinemünde, Rügen, Lübeck, Kiel bis Flensburg und Ribe. Station bei Großeltern in Brunsbüttel, Rückweg über Bremerhaven, Bremen, Celle, Harz und Erzgebirge. Regen & Kälte führten zum früheren Abbruch – unvergessliche Erfahrungen. Aktuell in Arbeit: Buchprojekt zur Reise.',
    media: [
      { type: 'image', src: '/src/assets/testbild.jpg', alt: 'Tour Impression 1' },
      { type: 'image', src: '/src/assets/testbild.jpg', alt: 'Tour Impression 2' }
    ]
  },
  {
    id: 'villa-pixie-honorar',
    period: 'Aug. 2024 – Mai 2025',
    title: 'Honorartätigkeit Kita',
    subtitle: 'Kita Villa Pixie, Berlin',
    description:
      'Begleitung von 1–3-Jährigen (12 Kinder) und 3–6-Jährigen (18 Kinder). Aufgaben: Sprachlerntagebuch, Beobachtungen, Entwicklungsgespräche, Mitgestaltung der Einrichtung und des pädagogischen Alltags. Ø 10 Std./Woche.',
    dotEmoji: '🖍️',
    contentEmoji: '🖍️',
    color: '#fbbf24',
    topText:
      'Kreative Impulse setzen, Kinder begleiten, Team- und Elternarbeit unterstützen.'
  },
  {
    id: 'gruen-projekt',
    period: 'Okt. 2024 – Jul. 2025',
    title: 'Projekt „Für starke Kinder – Begleiter auf vier Pfoten“',
    subtitle: 'Mit Stützrad gGmbH Berlin',
    description:
      'Tiergestütztes Projekt zur emotionalen Stärkung von Kindern in der stationären Kinder- und Jugendhilfe. Einsatz von Tierschutz-Tieren (u.a. Schwein, Alpaka, Emu). Durchführung auf Kinderbauern- und Lebenshöfen. Evaluation über Gespräche, Austausch mit Fachpersonal und Beobachtungen.',
    dotEmoji: '🐾',
    contentEmoji: '🐾',
    color: '#22c55e',
    topText:
      'Natur- und tiergestützte Erfahrungen als Ressource für Resilienz und Alltag.'
  },
  {
    id: 'profil-1',
    period: 'Okt. 2024 – Feb. 2025',
    title: 'Profilbildung I',
    subtitle: 'Kunst- und Gestaltungstherapie',
    description:
      'Arbeit unteranderem mit Farben, Ton, Holzspänen; Ausdruck über Kunstwerke, Reflexion von Gestaltungsprozessen. Theoretische Grundlagen aus Kunstwissenschaft, Psychologie und Pädagogik. Abschluss: 18-seitiges Portfolio.',
    dotEmoji: '🎨',
    contentEmoji: '🎨',
    color: '#a855f7',
    topText:
      'Künstlerische Prozesse gezielt zur Stärkung kindlicher Ausdrucksfähigkeit nutzen.'
  },
  {
    id: 'profil-2',
    period: 'Apr. 2025 – Jul. 2025',
    title: 'Profilbildung II',
    subtitle: 'Medienpädagogik',
    description:
      'Kreative Medienarbeit mit Magix Music Maker. Abschlussprojekt: Medienführerschein mit Arbeitsblättern und Leporello zum sicheren Umgang mit Medien.',
    dotEmoji: '🎥',
    contentEmoji: '🎥',
    color: '#f59e0b',
    topText:
      'Reflektierte und kreative Mediennutzung kindgerecht gestalten.'
  },
  {
    id: 'lehrkraft-2025-2026',
    period: 'Sep. 2025 – Jul. 2026',
    title: 'Lehrkraft Kunstunterricht',
    subtitle: 'Grundschule am Bürgerpark Marzahn, Berlin',
    description:
      'Als Lehrkraft für Kunstunterricht gestalte ich kreative Lernräume. Neben der Vermittlung ästhetischer Grundlagen lege ich den Schwerpunkt auf projektorientiertes Arbeiten, gemeinsames Gestalten und das Präsentieren von Ergebnissen in selbstaufgebauten Galerien. Meine kunstpädagogische Arbeit fördert Ausdrucksfähigkeit, Teamgeist und die Freude am schöpferischen Prozess.',
    dotEmoji: '👩🏼‍🏫',
    contentEmoji: '👩🏼‍🏫',
    color: '#0ea5e9',
    topText:
      'Kunstpädagogische Arbeit und Lehrkraftstätigkeit mit Fokus auf kreative Lernräume und Präsentationsformate in den Klassenstufen 4 & 6 (je 2 UE pro Klasse). 20 Std./Woche.'
  },
  {
    id: 'profil-3',
    period: 'Okt. 2025 – Feb. 2026',
    title: 'Profilbildung III',
    subtitle: 'Ko-kreative künstlerische Praxis',
    description:
      'Teilnahme am Seminar „Gemeinschaft(-lich) gestalten“. Fokus: Kunst als Mittel für Begegnung, Teilhabe und Kooperation. Verbindung von Praxisübungen mit Konzepten kollektiver Gestaltung.',
    dotEmoji: '👩🏼‍🎓',
    contentEmoji: '👩🏼‍🎓',
    color: '#10b981',
    topText:
      'Kunst als gemeinschaftliches Handeln – Methoden, Reflexion und Praxis.'
  },
  {
    id: 'sage-profession',
    period: 'Okt. 2025 – Feb. 2026',
    title: 'SAGE-Profession',
    subtitle: 'Blockseminar mit Zertifikat',
    description:
      'Durch die Teilnahme am Seminar erlangte ich fundierte Methoden, wie Design Thinking und Co-Kreation zu sozialer Innovation. Die Entwicklung eines Kompetenz-Kits für die Berufspraxis in den SAGE-Professionen standen dabei im Fokus.',
    dotEmoji: '🧘🏼‍♀️',
    contentEmoji: '🧘🏼‍♀️',
    color: '#facc15',
    topText:
      'Kreative und kollaborative Methoden für sozialen Wandel praktisch erprobt. Die SAGE-Profession (Soziale Arbeit, Gesundheit und Erziehung) beschreibt ein Berufsfeld, in dem Fachkräfte gesellschaftliche Verantwortung übernehmen und sozialen Wandel aktiv mitgestalten.'
  },
  {
    id: 'bachelor-2025-2026',
    period: 'Okt. 2025 – Jan. 2026',
    title: 'Bachelor-Thesis',
    subtitle: 'Kreative Kinder',
    description:
      'Zum Abschluss meines Studiums schrieb ich meine Bachelor-Thesis über das Thema "Kreative Kinder" mit dem Untertitel „Kreativitätsförderung bei 6–8-Jährigen“. Im Fokus stand die Frage, wie künstlerische Projektarbeit zentrale Bildungs- und Entwicklungsbereiche stärkt. Exemplarisch zeigte ich dies am Projekt „Kollektives Mosaikbild“, das ich praktisch untermauerte – ohne empirische Forschung, dafür mit einem klaren Praxisbezug.',
    dotEmoji: '📖',
    contentEmoji: null,
    color: '#ef4444',
    topText:
      'Abschlussarbeit zur Rolle von Kreativität in der kindlichen Entwicklung.'
  }
]);


const activeIndex = ref(0);
const active = computed(() => items.value[activeIndex.value]);

// Gallery state
const mediaIndex = ref(0);
const hasMedia = computed(() => Boolean(active.value.media && active.value.media.length));
const currentMedia = computed(() => hasMedia.value ? active.value.media![mediaIndex.value] : null);
const nextMedia = () => {
  if (!hasMedia.value) return;
  mediaIndex.value = (mediaIndex.value + 1) % active.value.media!.length;
};
const prevMedia = () => {
  if (!hasMedia.value) return;
  mediaIndex.value = (mediaIndex.value - 1 + active.value.media!.length) % active.value.media!.length;
};

// Gradient styles mirrored from bottom to top using active color
const topGradientStyle = computed(() => ({
  background: `linear-gradient(180deg, ${active.value.color}1a, transparent 60%)`
}));
const bottomGradientStyle = computed(() => ({
  background: `linear-gradient(180deg, ${active.value.color}1a, ${active.value.color}0d 60%, transparent)`
}));
</script>

<style scoped>
.timeline-scroll { padding-top: 6px; }
.timeline-scroll::-webkit-scrollbar { height: 6px; }
.timeline-scroll::-webkit-scrollbar-thumb { background: #bae6fd; border-radius: 15px; }
.timeline-track { position: relative; }
.timeline-track::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 20px; /* center line; dotStyle translates by half height to sit on this line */
  height: 2px;
  background-image: linear-gradient(90deg, #0ea5e9 66%, transparent 0);
  background-size: 10px 2px;
}

/* Avoid clipping of enlarged dots */
.timeline-track { overflow: visible; }

.slide-fade-enter-active { transition: all 0.25s ease-out; }
.slide-fade-leave-active { transition: all 0.25s ease-in; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(6px); }
</style>
