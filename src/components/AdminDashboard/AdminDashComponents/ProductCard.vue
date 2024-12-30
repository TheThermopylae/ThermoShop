<template>
    <div class="bg-card rounded-lg relative">
        <img :src="product[1].img" class="border-4 border-card border-b-0 rounded-2xl" :alt="product[1].name">
        <div class="mb-7 p-3">
            <h4 class="mt-2 mb-1 text-xl">{{ product[1].name }}</h4>
            <div class="flex justify-between text-md">
                <span class="text-green-500">{{ product[1].price.toLocaleString() }}$</span>
                <span>Count : {{ product[1].count }}</span>
            </div>
        </div>
        <div class="mt-2 absolute bottom-2">
            <div class="tooltip" data-tip="Delete Product">
                <i class="fa-solid fa-trash hover:text-red-500 transition-all cursor-pointer"
                    @click="$emit('showDeleteModal')"></i>
            </div>
            <div class="tooltip ml-3" data-tip="Edit Product">
                <i class="fa-solid fa-pen hover:text-gray-500 transition-all cursor-pointer"
                    @click="$emit('showEditModal')"></i>
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