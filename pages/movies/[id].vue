<template>
  <nav class="navbar test navbar-expand-lg navbar-dark p-md-3">
    <div class="container-fluid">
      <a class="navbar-brand">MovieApp</a>
      <div class="d-flex">
        <NuxtLink class="btn custom-btm" to="/"><i class="bi bi-arrow-return-left"></i></NuxtLink>
      </div>
    </div>
  </nav>
  <div class="movie-card">
    <div class="container">
      <a href="#"><img :src="imgUrl" alt="poster" class="cover" /></a>
      <div class="back-cover">
        <div class="back-cover__overlay" :style="{ 'background-image': `url(${imgBg})`, 'background-repeat': 'no-repeat', 'background-size': 'cover' }">
        </div>

        <div class="details">
          <div class="title1">{{ data?.title }} <span class="fs-5"> ({{ getReleaseYear(data?.release_date) }})</span></div>
          <div class="title2">{{ data?.runtime }} min</div>
        </div>
      </div>
      <div class="about-movie">
        <div class="colum-one">
          <span class="likes">{{ data?.vote_count }}</span><br>
          <span class="star">{{ parseInt(data?.vote_average) }}</span>

          <div class="column-category" v-for="genre in data?.genres">
            <span class="tag " >{{ genre.name }}</span>
            <div></div>
          </div>
        </div>
        <div class="colum-second">
          <p>{{ data?.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { Movie } from 'types/Movie';

  const getReleaseYear = (releaseDate: string | undefined) => {
    if (releaseDate) {
      const year = new Date(releaseDate).getFullYear();
      return year.toString();
    }
    return '';
  };

  const route = useRoute();
  const config = useRuntimeConfig();
  const movieId = computed(() => route.params.id);
  
  const { data }  = await useFetch<Movie>(`/api/movies/${movieId.value}`);

  const imgUrl = computed(() => 
  data.value?.poster_path 
    ? `${config.public.imgBaseUrl}/${data.value.poster_path}` 
    : 'https://via.placeholder.com/300x500'
  );

  const imgBg = computed(() =>
  data.value?.backdrop_path
    ? `${config.public.imgBaseUrl}${data.value.backdrop_path}`
    : 'https://via.placeholder.com/300x500'
  );
</script>

<style lang="scss">

@import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

body {
  background: #221f1f;
}

.back {
  font-size: 30px;
}

.back:hover {
  color: red;
}

@media (max-width: 768px) {
  .container {
    width: 250px !important;
    height: 950px !important;
    overflow: hidden;
    .about-movie {
      display: inline-block !important;
      p {
        width: 49% !important;
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }
}

.movie-card {
  font: 14px/22px "Lato", Arial, sans-serif;
  color: #A9A8A3;
  padding: 40px 0;
  .container {
    margin: 0 auto;
    width: 680px;
    padding-left: 0;
    padding-right: 0;
    height: 640px;
    background: black;
    border-radius: 5px;
    position: relative;
    a {
      img {
        max-width: 550px;
        max-height: 250px;
      }
    }
    .back-cover {
      height: 342px;
      margin: 0;
      position: relative;
      overflow: hidden;
      z-index: 1;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url(${imgBg});
    }
    .back-cover__overlay {
      content: " ";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-size: 100% 100%;
      transform: skewY(-3.2deg);
      transform-origin: 0 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 2;
      filter: brightness(0.6);
  }
    .back-cover .details {
      position: relative;
      z-index: 3;
    }
    .cover {
      position: absolute;
      top: 160px;
      left: 40px;
      z-index: 2;
      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
    .details {
      padding: 238px 0 0 268px;
      position: relative;
      
      .title1 {
        font-weight: bolder;
        font-size: 33px;
        margin-bottom: 16px;
        position: relative;
        color: white;
      }
    } 
    .title2 {
      color: white;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .likes {
      margin-left: 30px;
      display: inline-block;
      padding-bottom: 19px;
      &:before {
        content: url("../../assets/img/hearth.ico");
        position: relative;
        top: 2px;
        padding-right: 7px;
      }
    }
    .star {
      margin-left: 30px;
      display: inline-block;
      padding-bottom: 19px;
      &:before {
        content: url("../../assets//img/star-icon.ico");
        position: relative;
        top: 2px;
        padding-right: 7px;
      }
    }
    .about-movie {
      display: inline-flex;
      bottom: 0px;
      height: 200px;
      font-size: 16px;
      line-height: 26px;
      color: #fefefe;
      .colum-one {
        padding-left: 50px;
        padding-top: 90px;
        width: 220px;
        float: left;
        text-align: left;
        .column-category {
          margin-left: 28px;
          span {
            padding: 1px 8px;
            font-size: 14px;
            background: #221f1f;
            border-radius: 10px;
            margin-left: 2px;
            &:hover {
              background: red;
              color: white;
              cursor: pointer;
            }
          }
        }
      }
      .colum-second {
        padding-left: 68px;
        padding-top: 21px;
        margin-left: -39px;
        width: 480px;
        float: left;
        p {
          width: 76%;
        }
      }
    }
  }
}
</style>