<template>
    <div>
        <img v-if="!data[1].profile" src="/public/img/profile.png" alt="without profile" class="rounded-full w-40 h-40">
        <img v-else :src="data[1].profile" alt="user profile" class="rounded-full w-40 h-40 mb-4">
        <ul class="text-xl leading-10">
            <li>User ID : <b>{{ data[0] }}</b></li>
            <li>Username : <b>{{ data[1].username }}</b></li>
            <li>Password : <b>{{ data[1].password }}</b></li>
            <li>Phone : <b>{{ data[1].telephoneNum }}</b></li>
            <li>Rule : <b>{{ data[1].rule }}</b></li>
            <li>Is BANNED? : <b :class="{'text-red-500' : data[1].isBanned , 'text-green-500' : !data[1].isBanned}">{{ data[1].isBanned }}</b></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["data"],
    setup() {
        return {

        }
    }
}
</script>