<script setup lang="ts">
import { useScrollStore } from '../../../stores/scroll'
import { useNavigationStore } from '../../../stores/navigation'
import { useLanguageStore } from '../../../stores/language'
import { computed } from 'vue'

const scrollStore = useScrollStore()
const navStore = useNavigationStore()
const languageStore = useLanguageStore()

const isScrolled = computed(() => window.scrollY > 0)
</script>

<template>
    <v-app-bar 
        class="header-bar" 
        elevation="0"
        :color="isScrolled ? 'rgba(var(--v-theme-surface), 0.7)' : 'transparent'"
    >
        <v-container class="px-4">
            <v-row justify="space-between" align="center" no-gutters>
                <v-col cols="auto" class="d-md-none">
                    <v-app-bar-nav-icon
                    :class="{ 'active': navStore.isMobileMenuOpen }"
                    @click="navStore.toggleMobileMenu"
                    />
                </v-col>

                <v-col cols="auto" class="d-none d-md-flex section-buttons">
                    <v-btn
                        v-for="section in scrollStore.sections"
                        :key="section.id"
                        variant="text"
                        :class="{ 'active-section': scrollStore.activeSection === section.id }"
                        @click="scrollStore.scrollToSection(section.id)"
                    >
                        {{ languageStore.t('navigation', section.id, 'text') }}
                    </v-btn>
                </v-col>

                <v-col cols="auto" class="external-links">
                    <v-btn
                        variant="text"
                        class="language-toggle-btn"
                        @click="languageStore.toggleLanguage"
                    >
                        <v-icon icon="mdi-translate" class="mr-1" />
                        {{ languageStore.t('languageSwitch', 'button', 'switchToOther') }}
                    </v-btn>

                    <v-btn
                        v-for="link in navStore.externalLinks"
                        :key="link.id"
                        variant="text"
                        class="external-link"
                        @click="navStore.openExternalLink(link.path)"
                    >
                        <v-icon v-if="link.icon" :icon="link.icon" class="mr-1" />
                        {{ link.title }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>

    <v-navigation-drawer
        v-model="navStore.isMobileMenuOpen"
        location="left"
        temporary
        class="mobile-menu"
        color="background"
    >
        <v-list>
            <v-list-item
                v-for="section in scrollStore.sections"
                :key="section.id"
                :class="{ 'active-section': scrollStore.activeSection === section.id }"
                @click="() => {
                    scrollStore.scrollToSection(section.id);
                    navStore.closeMobileMenu();
                }"
            >
                {{ languageStore.t('navigation', section.id, 'text') }}
            </v-list-item>

            <v-divider class="my-2" />

            <v-list-item @click="languageStore.toggleLanguage">
                <template #prepend>
                    <v-icon icon="mdi-translate" />
                </template>
                {{ languageStore.t('languageSwitch', 'button', 'switchToOther') }}
            </v-list-item>

            <v-list-item
                v-for="link in navStore.externalLinks"
                :key="link.id"
                @click="navStore.openExternalLink(link.path)"
            >
                <template #prepend>
                    <v-icon v-if="link.icon" :icon="link.icon" />
                </template>
                {{ link.title }}
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.header-bar {
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(var(--v-border-color), 0.08);
    transition: all 0.3s ease;
}

.section-buttons {
    display: flex;
    gap: 8px;
}

.v-btn {
    text-transform: none;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.v-btn:hover {
    color: rgb(var(--v-theme-primary));
    transform: translateY(-2px);
}

.active-section {
    color: rgb(var(--v-theme-primary));
    position: relative;
}

.active-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 2px;
    background-color: rgb(var(--v-theme-primary));
    border-radius: 2px;
}

.external-links {
    display: flex;
    gap: 8px;
}

.external-link {
    display: flex;
    align-items: center;
}

.language-toggle-btn {
    display: flex;
    align-items: center;
    background-color: rgba(var(--v-theme-primary), 0.1);
    margin-right: 8px;
    border-radius: 20px;
    padding: 0 12px;
}

.mobile-menu {
    .v-list-item {
        min-height: 48px;
        padding: 0 16px;
        transition: all 0.3s ease;

        &:hover {
            color: rgb(var(--v-theme-primary));
            background-color: rgba(var(--v-theme-primary), 0.1);
        }

        &.active-section {
            color: rgb(var(--v-theme-primary));
            background-color: rgba(var(--v-theme-primary), 0.1);
            font-weight: 500;
        }
    }
}

@media (max-width: 600px) {
    .header-bar {
        height: 56px !important;
    }

    .external-links {
        gap: 4px;
    }

    .v-btn {
        padding: 0 12px;
    }
    
    .language-toggle-btn {
        margin-right: 4px;
    }
}
</style>
