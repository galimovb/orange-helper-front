<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  src: String,
  type: String,
  index: Number,
  name: String,
});

const showPlayer = ref(false);


const BASE_URL = 'https://orangehelper.ru';

const audioPreviews = [
  '/img/audio_1.svg',
  '/img/audio_2.svg',
  '/img/audio_3.svg'
];

const videoPreviews = [
  '/img/video_1.svg',
  '/img/video_2.svg',
  '/img/video_3.svg'
];


const fullSrc = computed(() => {
  return BASE_URL + props.src;
});

const previewImage = computed(() => {
  return props.type === 'audio' ? audioPreviews[props.index % audioPreviews.length] : videoPreviews[props.index % videoPreviews.length];
});
</script>

<template>
  <div class="media-card">
    <div
        v-if="!showPlayer"
        class="preview-wrapper"
    >
      <a
          v-if="props.type === 'audio'"
         :href="fullSrc" target="_blank"
      >
        <img
            :src="previewImage"
            alt="preview"
            class="preview-image"
        />
        <div class="play-icon">
          ▶
        </div>
      </a>

      <div
          v-if="props.type !== 'audio'"
          @click="showPlayer = true"
      >
        <img
            :src="previewImage"
            alt="preview"
            class="preview-image"
        />
        <div class="play-icon">
          ▶
        </div>
      </div>
    </div>
    <div
        v-if="showPlayer"
        class="player-wrapper"
    >
      <div
          v-if="props.type === 'audio'"
      >
        <audio
            controls
            class="w-full"
            :src="fullSrc">
        </audio>
      </div>
      <div v-if="props.type === 'video'">
        <video
            controls
            class="w-full"
            :src="fullSrc">
        </video>
      </div>
    </div>
    <p class="text-3xl leading-[100%] text-center mt-4">
      {{ name }}
    </p>
  </div>
</template>

<style scoped>
.media-card {
  position: relative;
  width: 100%;
  max-width: 319px;
  margin: 0 auto;
}

.preview-wrapper {
  position: relative;
  cursor: pointer;
}

.preview-image {
  width: 100%;
  border-radius: 8px;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.media-name {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.player-wrapper {
  margin-top: 10px;
}

audio,
video {
  width: 100%;
  border-radius: 8px;
}
</style>
