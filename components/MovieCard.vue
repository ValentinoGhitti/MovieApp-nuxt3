<template>
  <div class="h-110 w-70  flex flex-col p-3">
    <NuxtLink :to="`/movies/${movie?.id}`" class="movie">
      <img :src="imgURL" class="movie-img" alt="poster">
      <h5 class="movie-title">{{movie?.title}}</h5>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Movie } from '../types/Movie';

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>
  }
})

const config = useRuntimeConfig();
const imgURL = computed(() => props.movie?.poster_path != null ? 
  `${config.public.imgBaseUrl}/${props.movie.poster_path}` :
  'https://via.placeholder.com/300x450'
);
  
</script>

<style lang="scss">
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

a {
  color: white;
  text-decoration: none;
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
  margin-right: 20px;  
  flex-direction: column;
  align-items: center;

}

.movie-img { 
  border-radius: 7px;
  filter: contrast(.9) saturate(30%);
  transition: .3s transform cubic-bezier(.16,.88,.3,1.8);
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