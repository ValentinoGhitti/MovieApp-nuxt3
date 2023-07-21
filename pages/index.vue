<template>
    <nav class="navbar bg-body-tertiary p-3">
      <div class="container-fluid">
        <a class="navbar-brand">Navbar</a>
        <div class="d-flex">
          <input 
            class="form-control me-2" 
            type="text" 
            placeholder="Busca tu película"
            v-model="searchTerm"
          >
          <button class="btn btn-outline-success" @click="searchMovies">Search</button>
        </div>
      </div>
    </nav>

  <div class="flex flex-col py-10">
    <div>
      <Ticket></Ticket>

    </div>


    <!-- Cargador -->
    <div v-if="loading" class="text-center">
      <p>Cargando...</p>
    </div>

    <!-- Películas -->
    <div v-else id="new-releases" class="category">
      <h2 id="new-release-title" class="category-header"></h2>
      <div id="new-release-content"  class="content">
        <div class="" v-for="movie in data?.results" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </div>
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

<style lang="scss">

html, body {

background: #292929;

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



.content {
display: flex;
flex-wrap: wrap;
justify-content: center;
transition: 300ms all ease-in-out; /*HZ??*/
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