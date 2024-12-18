<script setup lang="ts">
import { format } from "date-fns";

const videoId = ref("F6WjICjSJO0");
const video = ref();
const automationData = ref();
const selectedSubject = ref("");

const subjects = [
  { value: "contentstack", text: "Contentstack" },
  { value: "live-contentstack", text: "Contentstack Livestreams" },
  { value: "uniform", text: "Uniform" },
  { value: "mp", text: "MP" },
  { value: "tim", text: "Tim" },
  { value: "headless-creator", text: "Headless Creator" },
  { value: "hygraph", text: "Hygraph" },
  { value: "live-uniform", text: "Uniform Livestreams" },
  { value: "misc-streams", text: "Misc Livestreams" },
  { value: "live-hygraph", text: "Hygraph Livestreams" },
  { value: "alive-and-kicking", text: "Alive and Kicking" },
];
async function fetchVideo() {
  if (!videoId.value) return;

  const data = await $fetch(`/api/yt?video_id=${videoId.value}`);
  video.value = data;
}

function removeTag(tag: string) {
  if (!video.value) return;

  const newTags = video.value.tags.filter((t: string) => t !== tag);
  video.value.tags = newTags;
}

function setSubject() {
  if (!selectedSubject.value) return;
  video.value.subject = selectedSubject.value;
}

async function triggerAutomate() {
  if (!video.value) {
    return;
  }

  const callData = await $fetch(
    "https://eu-app.contentstack.com/automations-api/run/01a7fbbfed9f4805a78fd0d63c55aec5",
    {
      method: "POST",
      body: { entry: { ...video.value } },
    }
  );

  automationData.value = callData;
}

const date = computed(() => {
  return format(new Date(video.value.date), "MM/dd/yyyy");
});
</script>

<template>
  <div class="w-full p-12">
    <header
      class="flex space-x-8 mb-4 items-center justify-between bg-[#1b1d39]"
    >
      <span class="title inline-block text-3xl">YouTube import</span>
      <img
        src="/tim.svg"
        width="43"
        height="61"
        alt="tim"
        class="w-[43px] h-[61px]"
      />
    </header>

    <main class="max-w-6xl">
      <p class="mb-8 max-w-2xl">
        This app accepts a YouTube video ID, enables enrichment with a subject
        and tags, and initiates an automation to create a Contentstack entry via
        a webhook.
      </p>

      <div class="flex space-x-4 items-end mb-8">
        <div>
          <label class="block text-slate-400 text-sm mb-1" for="videoid"
            >Enter YouTube Video ID</label
          >
          <input
            class="input"
            id="videoid"
            v-model="videoId"
            type="text"
            placeholder="Video ID"
          />
        </div>
        <button class="cta" @click="fetchVideo">Fetch Video</button>
      </div>

      <div v-if="video" class="flex">
        <div class="w-[600px] mb-8 mr-8">
          <img
            class="w-[600px] aspect-video fancy-image mb-2"
            :src="video.image"
            loading="lazy"
            :alt="video.title"
            width="1920"
            height="1080"
          />
        </div>

        <div class="w-[500px]">
          <p class="text-slate-400 text-xs">{{ date }}</p>
          <p class="font-bold text-xl line-clamp-2 mb-2">{{ video.title }}</p>
          <p class="text-slate-400 text-sm line-clamp-2 mb-4">
            {{ video.description }}
          </p>
          <p class="text-sm mb-2">Tags</p>
          <ul class="flex flex-wrap mb-4">
            <li
              v-for="tag in video.tags"
              :key="tag"
              class="mr-3 mb-2 pr-1 flex items-center space-x-1 bg-black"
            >
              <span class="tag block">{{ tag }}</span>
              <span
                class="rotate-45 font-black block text-xl cursor-pointer"
                @click="removeTag(tag)"
                >+</span
              >
            </li>
          </ul>

          <select
            v-model="selectedSubject"
            class="tag !lowercase"
            @change="setSubject"
          >
            <option value="" disabled>subject</option>
            <option
              v-for="subject in subjects"
              :key="subject.value"
              :value="subject.value"
            >
              {{ subject.text }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="video" class="flex">
        <div class="w-[600px] mb-8 mr-8">
          <json-editor
            height="400"
            :statusBar="false"
            mode="text"
            :readOnly="true"
            :darkTheme="true"
            v-model="video"
          />
        </div>
        <div>
          <p class="text-slate-400 text-sm mb-4">
            Happy with the data on the left? Did you remove the needed tags?
            Subject selected?
          </p>
          <button class="cta mb-4" @click="triggerAutomate">
            Import via Automate
          </button>
          <pre
            class="p-4 text-xs text-slate-300 bg-slate-900 fancy-image-alt overflow-auto"
            v-if="automationData"
          >
data: {{ automationData }}</pre
          >
        </div>
      </div>
    </main>
  </div>
</template>
