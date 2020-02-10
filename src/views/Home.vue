<template>
  <div class="home relative flex flex-col" @click="translation = ''">
    <control-panel @get-text="getText" />

    <section style="height: calc(100vh - 130px);">
      <loader v-if="state === 1" />

      <div
        v-else-if="state === 2"
        class="h-full flex text pb-2 text-2xl text-justify leading-relaxed"
      >
        <div class="relative main-content pt-8 w-3/4 h-full px-6 overflow-scroll">
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
            @click.stop="handleSegmentClick(i)"
          ></span>

          <transition name="slideUp">
            <div
              v-show="translation"
              style="max-width: 80%; max-height: 120px; overflow: auto; margin: auto;"
              class="translation absolute bottom-0 right-0 left-0 mb-8 text-base text-center bg-gray-800 text-gray-100 py-2 px-6 rounded"
            >
              <span v-html="translation"></span>
            </div>
          </transition>
        </div>

        <div class="commentaries w-1/4 h-full px-6 pt-8 overflow-scroll">
          <loader v-if="commentary.state === 1" />

          <div
            v-else-if="commentary.state === 2"
            v-for="com in commentaries"
            :key="com._id"
            class="mb-6 border-b border-gray-500"
          >
            <h2 class="font-bold">{{com.heTitle}}</h2>
            <p class="text-sm" v-html="com.he.length ? com.he : com.text"></p>
          </div>
        </div>
      </div>

      <p v-else-if="state === 3">חיפוש זה לא העלה שום תוצאות 😕</p>
      <p v-else>חפש משהו למעלה 👆</p>
    </section>
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
  READY: 2,
  ERROR: 3
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
      json: {},
      commentary: {
        state: STATE.EMPTY,
        commentaries: []
      }
    };
  },
  methods: {
    getText(searchQuery) {
      if (!searchQuery) return;
      this.state = STATE.LOADING;
      this.translation = "";
      fetch(`${SEFARIA_API_URL}texts/${searchQuery}`).then(data => {
        data.json().then(json => {
          // console.log(json);
          if (json.error) {
            this.state = STATE.ERROR;
          } else {
            this.state = STATE.READY;
            this.title = json.heTitle;
            this.text = json[this.lang == "he" ? "he" : "text"];
            this.categories = json.categories;
            this.json = json;
          }
        });
      });
    },
    getLinks(ref) {
      if (!ref) return;
      this.commentary.state = STATE.LOADING;
      fetch(`${SEFARIA_API_URL}links/${ref}`).then(data => {
        data.json().then(json => {
          console.log(json);
          if (!json.error) {
            this.commentary.state = STATE.READY;
            this.commentaries = json;
          }
        });
      });
    },
    handleSegmentClick(i) {
      this.translation = this.json.text[i];
      this.getLinks(`${this.json.ref}:${i + 1}`);
    }
  }
};
</script>

<style lang="scss">
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
