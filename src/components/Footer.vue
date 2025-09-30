<template>
  <footer class="bg-white/80 backdrop-blur-sm border-t border-sunny-yellow-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col items-center space-y-4">
        <div class="flex justify-center space-x-6">
          <a
            href="mailto:kontakt@buntpapier-atelier.de"
            class="text-sunny-yellow-600 hover:text-sunny-yellow-700 font-comic transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            >
            E-Mail
          </a>
          <a
            href="https://www.linkedin.com/in/jo-ann-b-3573682a3/"
            class="text-sky-blue-500 hover:text-sky-blue-600 transition-colors font-comic"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/jo_ann276/"
            class="text-rose-pink-500 hover:text-rose-pink-600 transition-colors font-comic"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <div class="text-center pt-4">
          <p class="text-gray-600 font-comic">
            © {{ currentYear }} Das Buntpapier Atelier – mit Liebe gemacht für kleine Künstlerinnen und Künstler. 🎨
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* No component-specific styles needed */
</style>
