<template>
  <nav class="navbar test navbar-expand-lg navbar-dark p-md-3">
    <div class="container-fluid">
      <a class="navbar-brand">MovieApp</a>
      <div class="d-flex">
        <input 
          class="form-control me-2 test2 custom-input" 
          type="text" 
          placeholder="Busca tu película"
          v-model="searchTerm"
        >
        <button class="btn custom-btm " @click="searchMovies">Search</button>
      </div>
    </div>
  </nav>

  <div class="flex flex-col py-10">
    <div>
      <Ticket :searchTerm="searchTerm"></Ticket>
    </div>

    <!-- Cargador -->
    <div v-if="loading" class="text-center">
      <Loader />
    </div>

    <div v-else id="new-releases" class="category">
      <h2 id="new-release-title" class="category-header"></h2>
      <!-- Condición para mostrar el mensaje si no se encontraron películas -->
      <div v-if="showNoResultsMessage" class="d-flex">
        <div class="col-10">
        </div>
        <div class="col-12">
          <h2 class="text-white">The movie you searched for does not exist</h2>
        </div>
      </div>
      <div v-else class="content">
        <div v-for="movie in data?.results" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation example" v-if="data?.results.length">
      <ul class="pagination justify-content-center netflix-pagination">
        <li class="page-item">
          <button class="page-link" v-if="!disabledPrevious" @click="goToFirstPage"><i class="bi bi-chevron-double-left"></i></button>
        </li>
        <li class="page-item">
          <button class="page-link" v-if="!disabledPrevious" @click="prevPage"><i class="bi bi-chevron-left"></i></button>
        </li>
        <li class="page-item"><a class="page-link" href="#">{{ page }}</a></li>
        <li class="page-item">
          <button class="page-link" v-if="!disabledNext" @click="nextPage"><i class="bi bi-chevron-right"></i></button>
        </li>
        <li class="page-item">
          <button class="page-link" v-if="!disabledNext" @click="goToLastPage"><i class="bi bi-chevron-double-right"></i></button>
        </li>
      </ul>
    </nav>
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
const showNoResultsMessage = ref(false);
const debouncedSearchTerm = refDebounced(searchTerm, 700);

const fetchData = async () => {
  loading.value = true;
  const url = `api/movies/search?query=${debouncedSearchTerm.value}&page=${page.value}`;
  const response = await fetch(url);
  const responseData = await response.json();
  data.value = responseData;
  loading.value = false;
  showNoResultsMessage.value = debouncedSearchTerm.value !== '' && data.value?.results.length === 0;
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
  page.value = 1;
  fetchData();
};

onMounted(fetchData);
</script>

<style lang="scss">

html, body {
  background: #221f1f;
}

.netflix-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}

.page-link:hover {
  background-color: #e74c3c;
  color: #fff;
}

.page-link:active {
  background-color: #e74c3c;
  color: #fff;
}

.page-link:focus {
  background-color: red;

  box-shadow: none;
}

.page-link i {
  font-size: 24px;
  color: #fff;
}

.page-link a {
  text-decoration: none;
  color: #fff;
}

.page-item.active .page-link {
  font-weight: bold;
  color: #e74c3c;
}

.category {
  display: flex;
  align-items: center;
}

h5 {
  margin-left: 13px;
  margin-top: 3px;
  width: 13em;
  overflow: hidden;
  font-size: .9em;
  letter-spacing: .05em;
  font-family: lato;
  font-weight: 200;
  smoothing: antialiased;
}

.navbars {
  background-color: #3e3e53;
}

.test {
  width: 100%;
  padding: 20px 40px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 100;
}

.custom-input {
  background-color: #333;
  border-color: #333;
  color: #fff;
  outline: none;
}

.custom-input:focus {
  background-color: #333;
  border-color: #e74c3c;
  color: #fff;
  box-shadow: none;
}

.custom-btm {
  background-color: transparent;
  border: none;
  color: #fff;
  transition: 0.3s;
}

.custom-btm:hover {
  background-color: #e74c3c;
  border: 1px solid #e74c3c;
  color: #fff;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 300ms all ease-in-out;
}

.movie {
  display: block;
  height: 380px;
  weight: 200px;
  margin-right: 10px;  
  flex-direction: column;
  align-items: center;
}

.movie-img { 
  border-radius: 7px;
  margin: 12px 12px 12px 12px;
  filter: contrast(.9) saturate(30%);
  transition: .3s transform cubic-bezier(.16,.88,.3,1.8)
}

.movie-img:hover { 
  filter: contrast(1.1) saturate(100%);
  transform: scale(1.08);
  box-shadow: 0 7px 33px #000;
  cursor: pointer;
}

.movie-title {   
  color: #B0BEC5;
  font-family: Raleway;
}

</style>