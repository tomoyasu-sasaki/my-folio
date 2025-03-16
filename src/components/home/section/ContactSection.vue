<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { computed } from 'vue'

// バリデーションメッセージを日本語化
const validationMessages = {
    required: '必須項目です',
    minLength: (min: number) => `${min}文字以上で入力してください`,
    phone: '正しい電話番号を入力してください',
    email: '正しいメールアドレスを入力してください',
    checkbox: 'チェックが必要です'
}

// バリデーションスキーマの定義
const validationSchema = {
    name(value: string) {
        if (!value) return validationMessages.required
        if (value.length < 2) return validationMessages.minLength(2)
        return true
    },
    phone(value: string) {
        if (!value) return validationMessages.required
        if (!/^[0-9-]{10,}$/.test(value)) return validationMessages.phone
        return true
    },
    email(value: string) {
        if (!value) return validationMessages.required
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
            return validationMessages.email
        return true
    },
    message(value: string) {
        if (!value) return validationMessages.required
        if (value.length < 10) return validationMessages.minLength(10)
        return true
    },
    privacy(value: boolean) {
        if (!value) return validationMessages.checkbox
        return true
    }
}

const { handleSubmit, handleReset } = useForm({
    validationSchema,
    initialValues: {
        name: '',
        phone: '',
        email: '',
        message: '',
        privacy: false
    }
})

// フォームフィールドの設定
const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const message = useField('message')
const privacy = useField('privacy')

// フォームの状態管理
const isSubmitting = ref(false)
const showSuccessAlert = ref(false)

// 送信ボタンの無効化状態を計算
const isSubmitDisabled = computed(() => {
    return (
        !name.value.value ||
        !phone.value.value ||
        !email.value.value ||
        !message.value.value ||
        !privacy.value.value ||
        isSubmitting.value
    )
})

// フォーム送信処理
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSubmit = handleSubmit(async (values) => {
    try {
        isSubmitting.value = true
        // TODO: 実際のAPI呼び出しをここに実装
        await new Promise(resolve => setTimeout(resolve, 1000)) // 送信シミュレーション
        showSuccessAlert.value = true
        handleReset()
        setTimeout(() => {
            showSuccessAlert.value = false
        }, 5000)
    } catch (error) {
        console.error('送信エラー:', error)
    } finally {
        isSubmitting.value = false
    }
})
</script>

<template>
    <v-container id="contactSection" class="contact-section">
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <!-- ヘッダーセクション -->
                <div class="text-center mb-8">
                    <h1 class="text-h3 font-weight-bold mb-4">お問い合わせ</h1>
                    <p class="text-subtitle-1">
                        ご質問やお問い合わせは、以下のフォームからお気軽にご連絡ください。
                    </p>
                </div>

                <!-- フォームセクション -->
                <v-form @submit.prevent="onSubmit" class="contact-form">
                    <v-card class="pa-6" elevation="2">
                        <!-- 成功メッセージ -->
                        <v-alert
                            v-if="showSuccessAlert"
                            type="success"
                            variant="tonal"
                            class="mb-4"
                        >
                            お問い合わせを送信しました。確認次第ご連絡いたします。
                        </v-alert>

                        <!-- 入力フィールド -->
                        <v-text-field
                            v-model="name.value.value"
                            :error-messages="name.errorMessage.value"
                            label="氏名または企業名"
                            variant="outlined"
                            density="comfortable"
                            class="mb-4"
                            :disabled="isSubmitting"
                        ></v-text-field>

                        <v-text-field
                            v-model="phone.value.value"
                            :error-messages="phone.errorMessage.value"
                            label="電話番号"
                            variant="outlined"
                            density="comfortable"
                            class="mb-4"
                            :disabled="isSubmitting"
                            placeholder="例: 090-1234-5678"
                        ></v-text-field>

                        <v-text-field
                            v-model="email.value.value"
                            :error-messages="email.errorMessage.value"
                            label="メールアドレス"
                            variant="outlined"
                            density="comfortable"
                            class="mb-4"
                            :disabled="isSubmitting"
                            placeholder="例: example@email.com"
                        ></v-text-field>

                        <v-textarea
                            v-model="message.value.value"
                            :error-messages="message.errorMessage.value"
                            label="お問い合わせ内容"
                            variant="outlined"
                            density="comfortable"
                            class="mb-4"
                            :disabled="isSubmitting"
                            rows="5"
                        ></v-textarea>

                        <v-checkbox
                            v-model="privacy.value.value"
                            :error-messages="privacy.errorMessage.value"
                            label="プライバシーポリシーに同意する"
                            :disabled="isSubmitting"
                            class="mb-6"
                        ></v-checkbox>

                        <!-- ボタングループ -->
                        <div class="d-flex flex-wrap gap-4">
                            <v-btn
                                type="submit"
                                color="primary"
                                :loading="isSubmitting"
                                :disabled="isSubmitDisabled"
                                min-width="120"
                            >
                                送信する
                            </v-btn>

                            <v-btn
                                @click="handleReset"
                                variant="outlined"
                                :disabled="isSubmitting"
                                min-width="120"
                            >
                                クリア
                            </v-btn>
                        </div>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.contact-section {
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.contact-form {
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 600px) {
    .contact-section {
        padding-top: 60px;
        padding-bottom: 60px;
        min-height: auto;
    }

    .text-h3 {
        font-size: 2rem !important;
    }

    .v-card {
        padding: 16px !important;
    }

    .d-flex {
        justify-content: center;
    }

    .v-btn {
        width: 100%;
    }
}
</style>
