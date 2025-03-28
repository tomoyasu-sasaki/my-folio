<script setup lang="ts">
import { useSocialStore } from '../../stores/social'
import { computed } from 'vue'

const store = useSocialStore()

const currentYear = computed(() => new Date().getFullYear())

const openSocialLink = (link: string): void => {
    window.open(link, '_blank', 'noopener,noreferrer')
}
</script>

<template>
    <v-footer color="background" class="footer">
        <div class="social-links">
            <v-tooltip
                v-for="link in store.socialLinks"
                :key="link.id"
                :text="link.label"
                location="top"
            >
                <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="text"
                        :icon="link.logo"
                        size="x-large"
                        class="social-button"
                        @click.stop="openSocialLink(link.link)"
                    />
                </template>
            </v-tooltip>
        </div>
        <div class="copyright">
            Copyright© {{ currentYear }} — <strong>ssk-tmysのポートフォリオ</strong>
        </div>
    </v-footer>
</template>

<style scoped>
.footer {
    text-align: center;
    display: flex;
    padding: 16px 0;
    flex-direction: column;
    gap: 12px;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 8px;
}

.social-button {
    transition: transform 0.2s ease-in-out;
}

.social-button:hover {
    transform: translateY(-2px);
    color: rgb(var(--v-theme-primary));
}

.copyright {
    font-size: 0.9rem;
    opacity: 0.8;
}

@media (max-width: 600px) {
    .footer {
        padding: 12px 0;
        gap: 8px;
    }

    .social-links {
        gap: 4px;
    }

    .copyright {
        font-size: 0.8rem;
    }
}
</style>