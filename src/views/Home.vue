<template>
  <div class="home relative flex flex-col" @click="translation = ''">
    <control-panel @get-text="getText" />

    <section style="height: calc(100vh - 130px);">
      <div class="h-full flex text text-2xl text-justify leading-relaxed">
        <section class="main flex flex-col w-3/4 bg-white">
          <div class="title-bar py-2 px-4 bg-gray-600 flex items-center justify-between">
            <h2 v-if="json.heRef" class="ml-2 font-bold text-gray-200">{{json.heRef}}</h2>
            <div class="actions flex">
              <icon
                v-if="json.prev"
                @click.native="getText(json.prev)"
                class="text-4xl py-1 ml-2 cursor-pointer transform rotate-180"
                icon="arrowCircleRight"
              />
              <icon
                v-if="json.next"
                @click.native="getText(json.next)"
                class="text-4xl py-1 cursor-pointer"
                icon="arrowCircleRight"
              />
            </div>
          </div>

          <loader v-if="state === STATES.LOADING" />

          <div
            v-else-if="state === STATES.READY"
            class="relative flex-1 flex flex-col main-content"
          >
            <section class="text-content overflow-scroll" style="flex: 8 0 1px;">
              <div class="mx-auto p-6 max-w-screen-sm">
                <span
                  v-for="(segment, i) in text"
                  class="segment"
                  :class="{highlighted: higlightedSegment == i + 1, selected: selectedSegment == i}"
                  :key="segment.length + Math.random()"
                  v-html="segment"
                  @click.stop="handleSegmentClick(i)"
                ></span>
              </div>
            </section>

            <transition name="slideUp" appear mode="out-in">
              <div
                v-if="translation"
                style="height: 120px; flex: 1 3 0px;"
                class="translation m-2 mt-0 text-base text-center bg-gray-800 text-gray-100 py-2 px-6 rounded overflow-auto"
              >
                <span v-html="translation"></span>
              </div>
            </transition>
          </div>

          <p v-else-if="state === STATES.ERROR">חיפוש זה לא העלה שום תוצאות 😕</p>
          <p v-else>חפש משהו למעלה 👆</p>
        </section>

        <div
          class="commentaries bg-gray-100 shadow-md rounded w-1/4 h-full px-6 pt-8 overflow-scroll"
        >
          <loader v-if="commentary.state === STATES.LOADING" />

          <commentary
            v-else-if="commentary.state === STATES.READY"
            v-for="(com, title) in formattedCommentaries"
            :key="com[0].id"
            :commentary="com"
            :title="title"
            @open-link="getText(com.ref)"
          />

          <div v-else class="flex items-center justify-center h-full text-gray-500">
            <p>מפרשים יופיעו כאן</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ControlPanel from "@/components/ControlPanel";
import Commentary from "@/components/Commentary";
import Loader from "@/components/UI/Loader";
import UiButton from "@/components/UI/UiButton";
import Icon from "@/components/UI/Icon";

const SEFARIA_API_URL = "https://www.sefaria.org/api/";
const STATE = {
  EMPTY: 0,
  LOADING: 1,
  READY: 2,
  ERROR: 3
};

export default {
  name: "home",
  components: { ControlPanel, Commentary, UiButton, Loader, Icon },
  data() {
    return {
      lang: "he",
      title: "",
      text: [],
      translation: "",
      categories: [],
      higlightedSegment: null,
      selectedSegment: null,
      state: STATE.EMPTY,
      json: {},
      commentary: {
        state: STATE.EMPTY,
        commentaries: []
      },
      STATES: STATE
    };
  },
  computed: {
    formattedCommentaries() {
      let result = this.commentary.commentaries.reduce((acc, comm) => {
        let commentaryName = comm.collectiveTitle.he;
        let commData = {
          id: comm._id,
          ref: comm.ref,
          he: comm.he,
          en: comm.text
        };
        if (!acc[commentaryName]) {
          acc[commentaryName] = [commData];
        } else {
          acc[commentaryName].push(commData);
        }
        console.log({ acc });

        return acc;
      }, {});
      return result;
    }
  },
  methods: {
    getText(searchQuery) {
      if (!searchQuery) return;
      this.selectedSegment = null;
      this.state = STATE.LOADING;
      this.translation = "";
      this.commentary = {
        commentaries: [],
        state: STATE.EMPTY
      };
      fetch(`${SEFARIA_API_URL}texts/${searchQuery}`).then(data => {
        data.json().then(json => {
          console.log(json);
          if (json.error) {
            this.state = STATE.ERROR;
          } else {
            // console.log(json);

            this.state = STATE.READY;
            this.title = json.heTitle;
            this.text = json[this.lang == "he" && json.he ? "he" : "text"];
            this.categories = json.categories;
            this.json = json;

            let segmentIndex = json.ref.match(/(:)(\d+)$/);
            if (segmentIndex) {
              this.higlightedSegment = segmentIndex[segmentIndex.length - 1];
            } else {
              this.higlightedSegment = null;
            }
          }
        });
      });
    },
    getLinks(ref) {
      ref = this.stripExtraIndex(ref);
      // console.log("ref: ", ref);
      if (!ref) return;

      this.commentary.state = STATE.LOADING;
      fetch(`${SEFARIA_API_URL}links/${ref}`).then(data => {
        data.json().then(json => {
          // console.log(json);
          if (!json.error) {
            this.commentary.state = STATE.READY;
            this.commentary.commentaries = json;
          } else {
            this.commentary.state = STATE.ERROR;
          }
        });
      });
    },
    handleSegmentClick(i) {
      this.translation = this.json.text[i];
      this.selectedSegment = i;
      this.getLinks(`${this.json.ref}:${i + 1}`);
    },
    stripExtraIndex(ref) {
      if (ref.match(/:/g) && ref.match(/:/g).length > 1) {
        ref = ref.replace(/:[^:]+$/, "");
      }
      return ref;
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
      @apply bg-blue-100 text-blue-800;
    }
    &.selected {
      @apply bg-blue-200 text-blue-800;
    }
    &.highlighted {
      @apply bg-blue-600 text-blue-200;
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
