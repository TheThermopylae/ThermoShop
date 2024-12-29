<template>
    <div class="bg-card p-3 rounded-xl h-300 relative">
        <router-link :to="`/TargetProduct/${product[0]}`">
            <img class="w-full" :src="product[1].img" :alt="product[1].name + ' img'">
        </router-link>
        <h4 class="mt-2 mb-3 text-xl">{{ product[1].name }}</h4>
        <div class="flex justify-between absolute w-full left-0 px-3 bottom-4">
            <span class="text-green-500">{{ product[1].price.toLocaleString() }}$</span>
            <span>Count : {{ product[1].count }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["product"],
    setup() {
        return {

        }
    }
}
</script>