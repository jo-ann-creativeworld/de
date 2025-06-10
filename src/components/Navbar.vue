<template>
  <nav class="bg-white/90 backdrop-blur-sm border-b border-sunny-yellow-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0">
            <h1 class="text-2xl font-fredoka font-bold text-sunny-yellow-600 hover:text-sunny-yellow-700 transition-colors">
              Kreatives für Kinder
            </h1>
          </router-link>
        </div>

        <!-- Desktop menu -->
        <div class="hidden lg:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="getLinkClasses(item)"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            @click="isOpen = !isOpen"
            class="text-gray-700 hover:text-sunny-yellow-600"
          >
            <X v-if="isOpen" class="h-6 w-6" />
            <Menu v-else class="h-6 w-6" />
          </Button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="isOpen" class="lg:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-sunny-yellow-200">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="isOpen = false"
            :class="getMobileLinkClasses(item)"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const isOpen = ref(false);
const route = useRoute();

const navItems = [
  { name: 'Start', path: '/', color: 'sunny-yellow' },
  { name: 'Über mich', path: '/about', color: 'sky-blue' },
  { name: 'Produkte', path: '/products', color: 'rose-pink' },
  { name: 'Kunstprojekte', path: '/art-projects', color: 'lime-green' },
  { name: 'Kontakt', path: '/contact', color: 'grape-purple' },
  { name: 'Impressum', path: '/impressum', color: 'teal' },
  { name: 'Datenschutz', path: '/datenschutz', color: 'orange' },
];

const isActive = (path: string) => route.path === path;

const getLinkClasses = (item: typeof navItems[0]) => {
  const active = isActive(item.path);
  return [
    'px-3 py-2 rounded-md text-sm font-fredoka font-medium transition-colors',
    active
      ? `text-${item.color}-600 bg-${item.color}-50`
      : `text-gray-700 hover:text-${item.color}-600 hover:bg-${item.color}-50`,
  ];
};

const getMobileLinkClasses = (item: typeof navItems[0]) => {
  const active = isActive(item.path);
  return [
    'block px-3 py-2 rounded-md text-base font-fredoka font-medium transition-colors',
    active
      ? `text-${item.color}-600 bg-${item.color}-50`
      : `text-gray-700 hover:text-${item.color}-600 hover:bg-${item.color}-50`,
  ];
};

</script>

<style>
/* Safelist for Tailwind CSS to generate dynamic classes */
.text-sunny-yellow-600 { --tw-text-opacity: 1; color: rgb(234 179 8 / var(--tw-text-opacity)); }
.bg-sunny-yellow-50 { --tw-bg-opacity: 1; background-color: rgb(254 252 232 / var(--tw-bg-opacity)); }
.hover\:text-sunny-yellow-600:hover { --tw-text-opacity: 1; color: rgb(234 179 8 / var(--tw-text-opacity)); }
.hover\:bg-sunny-yellow-50:hover { --tw-bg-opacity: 1; background-color: rgb(254 252 232 / var(--tw-bg-opacity)); }

.text-sky-blue-600 { --tw-text-opacity: 1; color: rgb(2 132 199 / var(--tw-text-opacity)); }
.bg-sky-blue-50 { --tw-bg-opacity: 1; background-color: rgb(240 249 255 / var(--tw-bg-opacity)); }
.hover\:text-sky-blue-600:hover { --tw-text-opacity: 1; color: rgb(2 132 199 / var(--tw-text-opacity)); }
.hover\:bg-sky-blue-50:hover { --tw-bg-opacity: 1; background-color: rgb(240 249 255 / var(--tw-bg-opacity)); }

.text-rose-pink-600 { --tw-text-opacity: 1; color: rgb(225 29 72 / var(--tw-text-opacity)); }
.bg-rose-pink-50 { --tw-bg-opacity: 1; background-color: rgb(255 241 242 / var(--tw-bg-opacity)); }
.hover\:text-rose-pink-600:hover { --tw-text-opacity: 1; color: rgb(225 29 72 / var(--tw-text-opacity)); }
.hover\:bg-rose-pink-50:hover { --tw-bg-opacity: 1; background-color: rgb(255 241 242 / var(--tw-bg-opacity)); }

.text-lime-green-600 { --tw-text-opacity: 1; color: rgb(101 163 13 / var(--tw-text-opacity)); }
.bg-lime-green-50 { --tw-bg-opacity: 1; background-color: rgb(247 254 231 / var(--tw-bg-opacity)); }
.hover\:text-lime-green-600:hover { --tw-text-opacity: 1; color: rgb(101 163 13 / var(--tw-text-opacity)); }
.hover\:bg-lime-green-50:hover { --tw-bg-opacity: 1; background-color: rgb(247 254 231 / var(--tw-bg-opacity)); }

.text-grape-purple-600 { --tw-text-opacity: 1; color: rgb(147 51 234 / var(--tw-text-opacity)); }
.bg-grape-purple-50 { --tw-bg-opacity: 1; background-color: rgb(250 245 255 / var(--tw-bg-opacity)); }
.hover\:text-grape-purple-600:hover { --tw-text-opacity: 1; color: rgb(147 51 234 / var(--tw-text-opacity)); }
.hover\:bg-grape-purple-50:hover { --tw-bg-opacity: 1; background-color: rgb(250 245 255 / var(--tw-bg-opacity)); }

.text-teal-600 { --tw-text-opacity: 1; color: rgb(13 148 136 / var(--tw-text-opacity)); }
.bg-teal-50 { --tw-bg-opacity: 1; background-color: rgb(240 253 250 / var(--tw-bg-opacity)); }
.hover\:text-teal-600:hover { --tw-text-opacity: 1; color: rgb(13 148 136 / var(--tw-text-opacity)); }
.hover\:bg-teal-50:hover { --tw-bg-opacity: 1; background-color: rgb(240 253 250 / var(--tw-bg-opacity)); }

.text-orange-600 { --tw-text-opacity: 1; color: rgb(234 88 12 / var(--tw-text-opacity)); }
.bg-orange-50 { --tw-bg-opacity: 1; background-color: rgb(255 247 237 / var(--tw-bg-opacity)); }
.hover\:text-orange-600:hover { --tw-text-opacity: 1; color: rgb(234 88 12 / var(--tw-text-opacity)); }
.hover\:bg-orange-50:hover { --tw-bg-opacity: 1; background-color: rgb(255 247 237 / var(--tw-bg-opacity)); }
</style>
