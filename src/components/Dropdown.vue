<template>
  <div class="dropdown-wrapper relative">
    <button
      class="bg-white px-8 uppercase whitespace-no-wrap transition duration-300"
      @click="show = !show"
    >
      <span class="flex items-center">
        {{ selected }}
        <i :class="show ? 'rotate-180' : ''" class="gg-chevron-down ml-2"></i>
      </span>
    </button>
    <transition :name="animation">
      <div
        v-if="show"
        class="bg-white px-4 dropdown-menu mt-1 rounded absolute z-10 shadow-lg w-40 max-w-xs"
      >
        <ul class="list-none overflow-hidden rounded">
          <li v-for="option in options" :key="option.code">
            <nuxt-link
              v-if="langSwitch"
              :class="'theme-' + color"
              class="flex py-2 px-4 transition duration-300"
              :to="switchLocalePath(option.code)"
              >{{ option?.name }}</nuxt-link
            >
            <a
              v-else
              href=""
              class="flex py-2 px-4 transition duration-300"
              :class="'theme-' + color"
              >{{ option?.name }}</a
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      default: "Unkown",
    },
    langSwitch: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "light",
    },
    animation: {
      type: String,
      default: "fade",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
<style>
button {
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Slide-in-up animation */
.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transition: all 0.5s;
  transform: translateY(0);
}

.slide-in-up-enter,
.slide-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Slide-in-right animation */
.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: all 0.5s;
  transform: translateX(0);
}

.slide-in-right-enter,
.slide-in-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Slide-in-left animation */
.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition: all 0.5s;
  transform: translateX(0);
}

.slide-in-left-enter,
.slide-in-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Scale animation */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
  transform: scale(1);
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* Rotate animation */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s;
  transform: scale(1) rotate(-360deg);
}

.rotate-enter,
.rotate-leave-to {
  opacity: 0;
  transform: scale(0) rotate(360deg);
}
</style>
