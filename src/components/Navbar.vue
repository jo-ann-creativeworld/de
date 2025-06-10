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
            :class="['px-3 py-2 rounded-md text-sm font-fredoka font-medium transition-colors',
              isActive(item.path) ? 'text-sunny-yellow-600 bg-sunny-yellow-50' : 'text-gray-700 hover:text-sunny-yellow-600 hover:bg-sunny-yellow-50'
            ]"
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
            :class="['block px-3 py-2 rounded-md text-base font-fredoka font-medium transition-colors',
              isActive(item.path) ? 'text-sunny-yellow-600 bg-sunny-yellow-50' : 'text-gray-700 hover:text-sunny-yellow-600 hover:bg-sunny-yellow-50'
            ]"
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
  { name: 'Start', path: '/' },
  { name: 'Über mich', path: '/about' },
  { name: 'Produkte', path: '/products' },
  { name: 'Kunstprojekte', path: '/art-projects' },
  { name: 'Kontakt', path: '/contact' },
  { name: 'Impressum', path: '/impressum' },
  { name: 'Datenschutz', path: '/datenschutz' },
];

const isActive = (path: string) => route.path === path;
</script>
