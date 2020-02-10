<template>
  <div class="home relative flex flex-col" @click="translation = ''">
    <control-panel @get-text="getText" />

    <main class="pt-8 overflow-scroll">
      <loader v-if="state === 1" />

      <div v-else-if="state === 2" class="text pb-2 text-2xl text-justify leading-relaxed">
        <div class="title-bar flex items-center justify-between">
          <h2 class="ml-2 font-bold text-gray-600">{{json.heRef}}</h2>
          <div class="actions flex">
            <ui-button
              v-if="json.prev"
              @click.native="getText(json.prev)"
              classes="text-sm py-1 ml-1"
            >הקודם</ui-button>
            <ui-button
              v-if="json.next"
              @click.native="getText(json.next)"
              classes="text-sm py-1"
            >הבא</ui-button>
          </div>
        </div>
        <span
          v-for="(segment, i) in text"
          class="segment"
          :key="segment.length + Math.random()"
          v-html="segment"
          @click.stop="translation = json.text[i]"
        ></span>
      </div>

      <p v-else>חפש משהו למעלה 👆</p>
    </main>

    <transition name="slideUp">
      <div
        v-show="translation"
        style="max-width: 80%; max-height: 120px; overflow: auto; margin: auto;"
        class="translation absolute bottom-0 right-0 left-0 mb-8 text-center bg-gray-800 text-gray-100 py-2 px-6 rounded"
      >
        <span v-html="translation"></span>
      </div>
    </transition>
  </div>
</template>

<script>
import ControlPanel from "@/components/ControlPanel";
import Loader from "@/components/UI/Loader";
import UiButton from "@/components/UI/UiButton";

const SEFARIA_API_URL = "https://www.sefaria.org/api/";
const STATE = {
  EMPTY: 0,
  LOADING: 1,
  READY: 2
};

export default {
  name: "home",
  components: { ControlPanel, UiButton, Loader },
  data() {
    return {
      lang: "he",
      title: "",
      text: [],
      translation: "",
      categories: [],
      state: STATE.EMPTY,
      json: {}
    };
  },
  methods: {
    getText(searchQuery) {
      if (!searchQuery) return;
      this.state = STATE.LOADING;
      this.translation = "";
      fetch(`${SEFARIA_API_URL}texts/${searchQuery}`).then(data => {
        data.json().then(json => {
          console.log(json);

          this.state = STATE.READY;
          this.title = json.heTitle;
          this.text = json[this.lang == "he" ? "he" : "text"];
          this.categories = json.categories;
          this.json = json;
        });
      });
    }
  }
};
</script>

<style lang="scss">
main.overflow-scroll {
  height: calc(100vh - 130px);
}
.text {
  span.segment {
    @apply px-1 cursor-pointer rounded;
    transition: all 0.15s ease-in;
    &:hover {
      @apply bg-blue-200 text-gray-900;
    }
  }
  big {
    font-size: inherit;
    padding: 0 6px;
  }
  img {
    float: left;
    margin: 8px 12px 4px 0;
  }
}
</style>
