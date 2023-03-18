<template>
  <div
    :class="`mx-auto ${width} z-10 ${position} ${show ? 'fixed' : 'hidden'}`"
  >
    <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
      <div class="flex flex-row">
        <div class="px-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 1792 1792"
            fill="#44C997"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
            />
          </svg>
        </div>
        <div class="ml-2 mr-6">
          <span class="font-semibold">{{ $t(message) }}</span>
          <span v-if="description" class="block text-gray-500">{{
            $t(description)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "top-2 right-0.5 left-0.5",
    },
    width: {
      type: String,
      default: "w-300px",
    },
    message: {
      type: String,
      default: "",
    },
    description: {
      type: String || null,
      default: null,
    },
  },
};
</script>
