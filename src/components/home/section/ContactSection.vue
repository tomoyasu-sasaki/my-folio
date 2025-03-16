<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

// useFormの引数に渡されるバリデーションスキーマの定義
const validationSchema = {
    name(value: string) {
        if (value && value.length >= 2) return true
        return 'Name needs to be at least 2 characters.'
    },
    phone(value: string) {
        if (value && value.length > 9 && /[0-9-]+/.test(value)) return true
        return 'Phone number needs to be at least 9 digits.'
    },
    email(value: string) {
        if (value && /^([a-z.A-Z.0-9._.-.]+)@([a-z.A-Z.0-9.-.].+)+[a-z.A-Z.0-9]{2,}$/i.test(value))
            return true
        return 'Must be a valid e-mail.'
    },
    checkbox(value: boolean) {
        if (value) return true
        return 'Must be checked.'
    }
}

const { handleSubmit, handleReset } = useForm({ validationSchema })

const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const select = useField('select')
const checkbox = useField('checkbox')
const isValid = ref(false)

const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2))
})
</script>
<template>
    <v-container>
        <h1 class="display-2 font-weight-bold mb-4">お問い合わせ</h1>
        <v-form @submit.prevent="onSubmit" v-model="isValid">
            <v-text-field
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                label="氏名または企業名"
            ></v-text-field>

            <v-text-field
                v-model="phone.value.value"
                :error-messages="phone.errorMessage.value"
                label="電話番号"
            ></v-text-field>

            <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="メールアドレス"
            ></v-text-field>

            <v-textarea
                v-model="select.value.value"
                :error-messages="select.errorMessage.value"
                label="問い合わせ内容"
            ></v-textarea>

            <v-checkbox
                v-model="checkbox.value.value"
                :error-messages="checkbox.errorMessage.value"
                label="内容を確認しました"
            ></v-checkbox>

            <v-btn type="submit" class="me-4" :disabled="!isValid"> 送信 </v-btn>

            <v-btn @click="handleReset"> クリア </v-btn>
        </v-form>
    </v-container>
</template>
