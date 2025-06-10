<template>
  <div id="app" class="min-h-screen font-sans">
    <Navbar />
    <main class="container mx-auto px-6 py-8">
      <router-view />
    </main>
    <Footer />
    <WatercolorBackground />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import WatercolorBackground from '@/components/WatercolorBackground.vue';
</script>

<style>
/* Global styles are in main.css */
</style>
