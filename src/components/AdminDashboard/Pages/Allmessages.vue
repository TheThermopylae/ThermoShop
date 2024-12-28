<template>
    <div>
        <h2 class="text-2xl my-5">All messages</h2>
        <div class="grid grid-cols-3 gap-5">
            <MessageCard @showDeleteMessageModal="showModalFunc(item)" v-for="item in messages" :key="item[0]"
                :message="item"></MessageCard>
        </div>
        <Transition>
            <DeleteMessageModal @error="showAlertFunc('Cannot delete message :(', 'bg-red-500')"
                @success="showAlertFunc('Deleted Message!', 'bg-green-500')" :message="targetMessage"
                @closeModal="showModal = false" v-if="showModal">
            </DeleteMessageModal>
        </Transition>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import MessageCard from '../AdminDashComponents/MessageCard.vue';
import DeleteMessageModal from '../AdminDashComponents/DeleteMessageModal.vue';
import AlertHook from '../../../hooks/AlertHook';
import AlertBox from '../../MainComponents/AlertBox.vue';

export default {
    components: {
        MessageCard,
        DeleteMessageModal,
        AlertBox
    },
    setup() {
        let messages = inject("messages")

        let showModal = ref(false)

        let targetMessage = ref("")

        function showModalFunc(item) {
            showModal.value = true
            targetMessage.value = item
        }

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        return {
            messages,
            showModal,
            showModalFunc,
            targetMessage,
            showAlert, alertText, alertBackground, showAlertFunc
        }
    }
}
</script>