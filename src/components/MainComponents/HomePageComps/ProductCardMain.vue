<template>
    <div class="bg-card rounded-xl h-300 relative rolg">
        <router-link :to="`/TargetProduct/${product[0]}`">
            <img class="w-full border-4 border-card border-b-0 rounded-2xl" :src="product[1].img"
                :alt="product[1].name + ' img'">
        </router-link>
        <div class="p-3">
            <h4 class="mt-2 mb-3 text-xl">{{ product[1].name }}</h4>
            <div class="absolute w-full left-0 px-3 bottom-4">
                <span class="text-green-500">{{ product[1].price.toLocaleString() }}$</span>
            </div>
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