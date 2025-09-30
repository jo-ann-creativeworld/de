<template>
  <header class="main-header">
    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-content">
          <div class="logo-container">
            <router-link to="/" class="logo-link">
              <h1 class="logo-text">Das Buntpapier Atelier</h1>
            </router-link>
          </div>

          <!-- Desktop Menu -->
          <div class="desktop-menu">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="nav-link"
              :class="{ 'is-active': isActive(item.path) }"
              :data-color="item.color"
            >
              {{ item.name }}
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <div class="mobile-menu-toggle-wrapper">
            <button class="mobile-menu-toggle" @click="isOpen = true" aria-label="Menü öffnen">
              <Menu class="icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition name="fade">
    <div v-if="isOpen" @click="isOpen = false" class="mobile-menu-overlay" aria-hidden="true"></div>
  </Transition>

  <Transition name="slide-from-right">
    <div v-if="isOpen" class="mobile-menu-panel">
      <div class="mobile-menu-header">
        <button class="mobile-menu-close" @click="isOpen = false" aria-label="Menü schließen">
          <X class="icon" />
        </button>
      </div>
      <div class="mobile-menu-body">
        <nav class="mobile-nav">
          <ul class="mobile-nav-list">
            <li v-for="item in navItems" :key="item.path">
              <router-link
                :to="item.path"
                @click="isOpen = false"
                class="mobile-nav-link"
                :class="{ 'is-active': isActive(item.path) }"
                :data-color="item.color"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, X } from 'lucide-vue-next';

const isOpen = ref(false);
const route = useRoute();

watch(isOpen, (is) => {
  if (is) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

const navItems = [
  { name: 'Start', path: '/', color: 'sunny-yellow' },
  { name: 'Über mich', path: '/about', color: 'sky-blue' },
  { name: 'Produkte', path: '/products', color: 'rose-pink' },
  { name: 'Kunstprojekte', path: '/art-projects', color: 'lime-green' },
  { name: 'Kontakt', path: '/contact', color: 'grape-purple' },
  { name: 'Impressum', path: '/imprint', color: 'teal' },
  { name: 'Datenschutz', path: '/privacy', color: 'orange' },
];

const isActive = (path: string) => route.path === path;
</script>

<style scoped>
/* ========================================================================
   MAIN HEADER & NAVIGATION
   ======================================================================== */
.main-header {
  position: sticky;
  top: 0;
  z-index: 50;
}

.main-nav {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid var(--sunny-yellow-light);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem; /* 64px */
}

.logo-link {
  text-decoration: none;
}

.logo-text {
  font-family: var(--font-family-fredoka);
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: var(--sunny-yellow-dark);
  transition: color 0.2s ease-in-out;
}

.logo-link:hover .logo-text {
  color: var(--sunny-yellow-darker);
}

/* ========================================================================
   DESKTOP NAVIGATION
   ======================================================================== */
.desktop-menu {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-menu {
    display: flex;
    align-items: center;
    gap: 0.25rem; /* 4px */
  }
}

.nav-link {
  padding: 0.5rem 0.75rem; /* 8px 12px */
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-fredoka);
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  text-decoration: none;
  color: var(--color-gray-700);
  transition: color 0.2s, background-color 0.2s;
}

/* ========================================================================
   MOBILE NAVIGATION
   ======================================================================== */
.mobile-menu-toggle-wrapper {
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  .mobile-menu-toggle-wrapper {
    display: none;
  }
}

.mobile-menu-toggle, .mobile-menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-gray-700);
  padding: 0.5rem;
}

.mobile-menu-toggle:hover, .mobile-menu-close:hover {
  color: var(--sunny-yellow-dark);
}

.mobile-menu-toggle .icon, .mobile-menu-close .icon {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
}

.mobile-menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  max-width: 20rem; /* 320px */
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  flex-direction: column;
}

.mobile-menu-header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.mobile-menu-body {
  flex-grow: 1;
  padding: 0 1rem 1rem;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}

.mobile-nav-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem; /* 12px 16px */
  border-radius: var(--border-radius-lg);
  font-size: 1.125rem; /* 18px */
  font-family: var(--font-family-fredoka);
  font-weight: 500;
  text-decoration: none;
  color: var(--color-gray-800);
  transition: color 0.2s, background-color 0.2s;
}

/* ========================================================================
   DYNAMIC LINK COLORS
   ======================================================================== */

/* Base Hover for non-active links */
.nav-link:hover:not(.is-active),
.mobile-nav-link:hover:not(.is-active) {
  color: var(--color-gray-900);
}

/* Sunny Yellow */
.nav-link.is-active[data-color='sunny-yellow'],
.mobile-nav-link.is-active[data-color='sunny-yellow'] { background-color: var(--sunny-yellow-light); color: var(--sunny-yellow-darker); }
.nav-link:hover[data-color='sunny-yellow'],
.mobile-nav-link:hover[data-color='sunny-yellow'] { background-color: var(--sunny-yellow-x-light); color: var(--sunny-yellow-darker); }

/* Sky Blue */
.nav-link.is-active[data-color='sky-blue'],
.mobile-nav-link.is-active[data-color='sky-blue'] { background-color: var(--sky-blue-light); color: var(--sky-blue-darker); }
.nav-link:hover[data-color='sky-blue'],
.mobile-nav-link:hover[data-color='sky-blue'] { background-color: var(--sky-blue-x-light); color: var(--sky-blue-darker); }

/* Rose Pink */
.nav-link.is-active[data-color='rose-pink'],
.mobile-nav-link.is-active[data-color='rose-pink'] { background-color: var(--rose-pink-light); color: var(--rose-pink-darker); }
.nav-link:hover[data-color='rose-pink'],
.mobile-nav-link:hover[data-color='rose-pink'] { background-color: var(--rose-pink-x-light); color: var(--rose-pink-darker); }

/* Lime Green */
.nav-link.is-active[data-color='lime-green'],
.mobile-nav-link.is-active[data-color='lime-green'] { background-color: var(--lime-green-light); color: var(--lime-green-darker); }
.nav-link:hover[data-color='lime-green'],
.mobile-nav-link:hover[data-color='lime-green'] { background-color: var(--lime-green-x-light); color: var(--lime-green-darker); }

/* Grape Purple */
.nav-link.is-active[data-color='grape-purple'],
.mobile-nav-link.is-active[data-color='grape-purple'] { background-color: var(--grape-purple-light); color: var(--grape-purple-darker); }
.nav-link:hover[data-color='grape-purple'],
.mobile-nav-link:hover[data-color='grape-purple'] { background-color: var(--grape-purple-x-light); color: var(--grape-purple-darker); }

/* Teal */
.nav-link.is-active[data-color='teal'],
.mobile-nav-link.is-active[data-color='teal'] { background-color: var(--teal-light); color: var(--teal-darker); }
.nav-link:hover[data-color='teal'],
.mobile-nav-link:hover[data-color='teal'] { background-color: var(--teal-x-light); color: var(--teal-darker); }

/* Orange */
.nav-link.is-active[data-color='orange'],
.mobile-nav-link.is-active[data-color='orange'] { background-color: var(--orange-light); color: var(--orange-darker); }
.nav-link:hover[data-color='orange'],
.mobile-nav-link:hover[data-color='orange'] { background-color: var(--orange-x-light); color: var(--orange-darker); }


/* ========================================================================
   TRANSITIONS
   ======================================================================== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(100%);
}
</style>
