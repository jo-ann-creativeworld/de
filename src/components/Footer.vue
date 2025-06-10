<template>
  <footer class="bg-white/80 backdrop-blur-sm border-t border-sunny-yellow-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="text-center md:text-left">
          <p class="text-gray-600 font-comic">
            © 2024 Kreatives für Kinder. Mit Liebe gemacht für kleine Künstler! 🎨
          </p>
        </div>
        
        <div class="flex space-x-6">
          <router-link
            to="/impressum"
            class="text-gray-600 hover:text-sunny-yellow-600 font-comic transition-colors"
          >
            Impressum
          </router-link>
          <router-link
            to="/datenschutz"
            class="text-gray-600 hover:text-sunny-yellow-600 font-comic transition-colors"
          >
            Datenschutz
          </router-link>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <div class="flex justify-center space-x-4">
          <a
            href="#"
            class="text-sky-blue-500 hover:text-sky-blue-600 transition-colors text-sm font-comic"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 LinkedIn
          </a>
          <a
            href="#"
            class="text-rose-pink-500 hover:text-rose-pink-600 transition-colors text-sm font-comic"
            target="_blank"
            rel="noopener noreferrer"
          >
            📸 Instagram
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script logic needed for the footer
</script>

<style scoped>
/* No component-specific styles needed */
</style>
