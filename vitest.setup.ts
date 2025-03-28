import { vi } from 'vitest'

// CSSモジュールのモック
vi.mock('*.css', () => ({}))

// Vuetifyのコンポーネントのモック
vi.mock('vuetify/components', () => ({
  VContainer: {
    name: 'VContainer',
    template: '<div><slot /></div>'
  },
  VRow: {
    name: 'VRow',
    template: '<div><slot /></div>'
  },
  VCol: {
    name: 'VCol',
    template: '<div><slot /></div>'
  },
  VCard: {
    name: 'VCard',
    template: '<div><slot /></div>'
  },
  VAlert: {
    name: 'VAlert',
    template: '<div><slot /></div>'
  },
  VTextField: {
    name: 'v-text-field',
    props: {
      modelValue: String,
      'onUpdate:modelValue': Function
    },
    template: '<div><input type="text" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" /><slot name="append" /></div>'
  },
  VTextarea: {
    name: 'v-textarea',
    props: {
      modelValue: String,
      'onUpdate:modelValue': Function
    },
    template: '<div><textarea :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" /><slot name="append" /></div>'
  },
  VBtn: {
    name: 'v-btn',
    template: '<button v-bind="$attrs"><slot /></button>'
  },
  VForm: {
    name: 'v-form',
    template: '<form v-bind="$attrs" @submit.prevent><slot /></form>'
  }
}))

// Vuetifyのディレクティブのモック
vi.mock('vuetify/directives', () => ({
  Ripple: {},
  Scroll: {},
  Touch: {},
  Intersect: {},
  Mutate: {},
  Resize: {},
  Click: {},
  Outside: {}
})) 