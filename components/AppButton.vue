<template>
    <a target="_blank" :href="link" download>
        <button class="mt-4 px-6">{{text}}</button>
    </a>
</template>
<script>
export default ({
    props: {
        link: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: 'Click here'
        }
    }
})
</script>
