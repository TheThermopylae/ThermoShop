<template>
    <div class="border border-primary rounded-xl p-3">
        <div>
            <div>
                <h4 class="font-semibold">Message from : {{ message[1].from }}</h4>
                <h4 class="font-semibold">for : {{ message[1].for }}</h4>
            </div>
            <h5 class="my-2 font-medium" v-if="message[1].date == today">Date : Today</h5>
            <h5 class="my-2 font-medium" v-else>Date : {{ message[1].date }}</h5>
            <p class="">{{ message[1].text }}</p>
        </div>
        <div class="mt-2">
            <div class="tooltip mr-2" data-tip="Delete message">
                <i class="fa-solid fa-trash cursor-pointer transition-all hover:text-red-500"
                    @click="$emit('showDeleteMessageModal')"></i>
            </div>
        </div>
    </div>
</template>

<script>
import DateHook from '../../../hooks/DateHook';
export default {
    props: ["message"],
    setup() {
        let today = DateHook()
        return {
            today
        }
    }
}
</script>