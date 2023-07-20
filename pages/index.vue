<template>
  <div class="flex flex-col py-10">
    <div>
      <h2 class="text-2xl font-bold text-center">Nuxt Movies App</h2>
    </div>
    <div class="search-container">
      <input
        type="text"
        placeholder="Busca tu película"
        v-model="searchTerm"
      />
      <button @click="searchMovies">Search</button>
    </div>

    <!-- Cargador -->
    <div v-if="loading" class="text-center">
      <p>Cargando...</p>
    </div>

    <!-- Películas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 self-center gap-x-10 gap-6-10 mb-10">
      <div v-for="movie in data?.results" :key="movie.id">
        <MovieCard :movie="movie"></MovieCard>
      </div>
    </div>

    <div v-if="data?.results.length" class="flex justify-center">
      <button v-if="!disabledPrevious" @click="goToFirstPage" class="px-4 py-2 text-m border rounded-lg">First</button>
      <button v-if="!disabledPrevious" @click="prevPage" class="px-4 py-2 text-m border rounded-lg">Previous</button>
      <div class="px-4 py-2 text-m border rounded-lg">{{ page }}</div>
      <button v-if="!disabledNext" @click="nextPage" class="px-4 py-2 text-m border rounded-lg">Next</button>
      <button v-if="!disabledNext" @click="goToLastPage" class="px-4 py-2 text-m border rounded-lg">Last</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { APIResponse } from '../types/APIResponse';

interface MovieData extends APIResponse {
  results: Array<any>;
}

const searchTerm = ref('');
const page = ref(1);
const data = ref<MovieData | null>(null);
const loading = ref(true);

const debouncedSearchTerm = refDebounced(searchTerm, 700);

const fetchData = async () => {
  loading.value = true;
  const url = `api/movies/search?query=${debouncedSearchTerm.value}&page=${page.value}`;
  const response = await fetch(url);
  const responseData = await response.json();
  data.value = responseData;
  loading.value = false;
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchData();
  }
};

const nextPage = () => {
  if (data.value && page.value < data.value.total_pages) {
    page.value++;
    fetchData();
  }
};

const goToFirstPage = () => {
  page.value = 1;
  fetchData();
};

const goToLastPage = () => {
  if (data.value) {
    page.value = data.value.total_pages;
    fetchData();
  }
};

const searchMovies = () => {
  page.value = 1; // Reset the page to 1 when initiating a new search
  fetchData();
};

onMounted(fetchData);
</script>
