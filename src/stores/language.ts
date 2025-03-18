import { defineStore } from 'pinia'
import { ref } from 'vue'

// 言語設定を管理するストア
export const useLanguageStore = defineStore('language', () => {
    // 現在の言語（初期値は日本語）
    const currentLanguage = ref<'ja' | 'en'>('ja')
    
    // 各セクションの翻訳データ
    const translations = {
        // ナビゲーションメニュー
        navigation: {
            ja: {
                about: 'このサイトについて',
                project: '成果物',
                skill: '技術一覧',
                gallery: '生成画像',
                career: '経歴'
            },
            en: {
                about: 'About',
                project: 'Projects',
                skill: 'Skills',
                gallery: 'Gallery',
                career: 'Career'
            }
        },
        
        // プロジェクトセクション
        project: {
            ja: {
                status: {
                    completed: '完了',
                    'in-progress': '開発中',
                    planned: '計画中',
                    end: '終了'
                },
                details: '詳細'
            },
            en: {
                status: {
                    completed: 'Completed',
                    'in-progress': 'In Progress',
                    planned: 'Planned',
                    end: 'Ended'
                },
                details: 'Details'
            }
        },
        
        // ギャラリーセクション
        gallery: {
            ja: {
                prompt: 'プロンプト',
                close: '閉じる',
                all: 'すべて'
            },
            en: {
                prompt: 'Prompt',
                close: 'Close',
                all: 'All'
            }
        },

        // Aboutセクション
        about: {
            ja: {
                title: 'このサイトについて',
                description: [
                    '勉強の内容や成果物を公開するサイトです。',
                    '経歴やスキルなども公開しています。'
                ]
            },
            en: {
                title: 'About This Site',
                description: [
                    'This is a site where I publish my studies and projects.',
                    'I also share my career and skills information.'
                ]
            }
        },

        // スキルセクション
        skill: {
            ja: {
                experienceLevel: '経験レベル',
                likeLevel: '好き度',
                categories: {
                    frontend: 'フロントエンドスキル',
                    backend: 'バックエンドスキル',
                    database: 'データベーススキル',
                    aws: 'AWSサービススキル'
                },
                descriptions: {
                    frontend: 'Web開発のフロントエンド技術',
                    backend: 'サーバーサイド開発技術',
                    database: 'データベース関連技術',
                    aws: 'AWSクラウドサービス'
                }
            },
            en: {
                experienceLevel: 'Experience Level',
                likeLevel: 'Interest Level',
                categories: {
                    frontend: 'Frontend Skills',
                    backend: 'Backend Skills',
                    database: 'Database Skills',
                    aws: 'AWS Services'
                },
                descriptions: {
                    frontend: 'Frontend technologies for web development',
                    backend: 'Server-side development technologies',
                    database: 'Database related technologies',
                    aws: 'AWS cloud services'
                }
            }
        },

        // 経歴セクション
        career: {
            ja: {
                categories: {
                    all: 'すべて',
                    education: '学歴',
                    work: '職歴',
                    life: 'ライフイベント'
                },
                date: {
                    year: '年',
                    month: '月'
                },
                items: {
                    '01': {
                        title: '生まれる',
                        subtitle: '埼玉県',
                        description: '埼玉県で生まれる。当時のことはあまり記憶にない。'
                    },
                    '03': {
                        title: '高校卒業',
                        subtitle: 'いざ東京へ',
                        description: '高校卒業して数日後に上京。日経新聞社の奨学生として、大田区の販売店に配属。早朝の仕事と学業の両立に挑戦。'
                    },
                    '04': {
                        title: '専門学校入学',
                        subtitle: '本格的な IT 学習開始',
                        description: '日本工学院専門学校 情報処理科システム開発コースに入学。Java、C#などのプログラミング言語やデータベース、ネットワークの基礎を学ぶ。'
                    },
                    '05': {
                        title: '専門学校卒業',
                        subtitle: 'いざ札幌へ',
                        description: '日本工学院専門学校を無事卒業。同時に新聞奨学生としての活動も終了し、新たなステージへ。専門学生の期間の記憶がほどんどない。睡眠の重要性を実感する'
                    },
                    '06': {
                        title: '第三者検証の企業に就職',
                        subtitle: '札幌での新生活開始',
                        description: '日本ナレッジ株式会社札幌支社に入社。基幹業務システムの仕様追加や検証業務を担当。品質管理の重要性とシステム開発の実務を学ぶ。'
                    },
                    '07': {
                        title: '転職',
                        subtitle: 'キャリアアップ',
                        description: 'より幅広い経験を積むため株式会社エスプランニングへ転職。WEBアプリケーションのフロントエンド開発に従事。'
                    },
                    '08': {
                        title: '資格取得',
                        subtitle: 'スキルアップ',
                        description: 'AWSのCertified Cloud Practitionerを取得。AWSの基礎を学び、クラウド環境の理解を深める。'
                    },
                    '09': {
                        title: 'ポートフォリオサイト作成',
                        subtitle: '個人プロジェクト',
                        description: '暇だったのでポートフォリオサイトを作成。Vue.jsとTypeScriptを使用。デザインセンスはない。'
                    }
                }
            },
            en: {
                categories: {
                    all: 'All',
                    education: 'Education',
                    work: 'Work Experience',
                    life: 'Life Events'
                },
                date: {
                    year: '',
                    month: ''
                },
                items: {
                    '01': {
                        title: 'Born',
                        subtitle: 'Saitama Prefecture',
                        description: 'Born in Saitama Prefecture. I don\'t remember much from that time.'
                    },
                    '03': {
                        title: 'High School Graduation',
                        subtitle: 'Moving to Tokyo',
                        description: 'Moved to Tokyo a few days after graduating from high school. Assigned to a sales store in Ota Ward as a scholarship student of Nikkei Newspaper. Challenged to balance early morning work and studies.'
                    },
                    '04': {
                        title: 'Enrolled in Technical School',
                        subtitle: 'Started formal IT learning',
                        description: 'Enrolled in the System Development Course at Japan Engineering College. Learned programming languages such as Java and C#, as well as database and network basics.'
                    },
                    '05': {
                        title: 'Technical School Graduation',
                        subtitle: 'Moving to Sapporo',
                        description: 'Successfully graduated from Japan Engineering College. Also ended activities as a newspaper scholarship student and moved to a new stage. I barely remember the period as a technical student. Realized the importance of sleep.'
                    },
                    '06': {
                        title: 'Joined Third-party Verification Company',
                        subtitle: 'New life in Sapporo',
                        description: 'Joined Nihon Knowledge Co., Ltd. Sapporo Branch. In charge of specification additions and verification of core business systems. Learned the importance of quality control and practical system development.'
                    },
                    '07': {
                        title: 'Career Change',
                        subtitle: 'Career advancement',
                        description: 'Changed jobs to S Planning Co., Ltd. to gain broader experience. Engaged in frontend development of web applications.'
                    },
                    '08': {
                        title: 'Certification',
                        subtitle: 'Skill enhancement',
                        description: 'Obtained AWS Certified Cloud Practitioner. Learned AWS basics and deepened understanding of cloud environments.'
                    },
                    '09': {
                        title: 'Portfolio Website Creation',
                        subtitle: 'Personal project',
                        description: 'Created a portfolio website because I had free time. Used Vue.js and TypeScript. I have no design sense.'
                    }
                }
            }
        },

        // プロジェクトデータ
        projectData: {
            ja: {
                '01': {
                    title: 'GastronomeJourney',
                    subtitle: '行った居酒屋の記録用Webアプリ',
                    description: '訪れた居酒屋の情報や感想を記録・共有できるWebアプリケーション'
                },
                '02': {
                    title: 'Blogfy',
                    subtitle: '日記アプリ',
                    description: 'マークダウン対応の日記作成・管理アプリケーション'
                },
                '03': {
                    title: 'TeamFlow',
                    subtitle: 'プロジェクト管理Webアプリ',
                    description: 'チームのタスク管理とコミュニケーションを効率化するWebアプリ'
                },
                '04': {
                    title: 'CodeLearner',
                    subtitle: '勉強進捗管理Webアプリ',
                    description: 'プログラミング学習の進捗を可視化・管理するWebアプリ'
                },
                '05': {
                    title: 'ConnectSphere',
                    subtitle: 'Twitter風SNSWebアプリ',
                    description: 'プログラマー向けのSNSプラットフォーム'
                }
            },
            en: {
                '01': {
                    title: 'GastronomeJourney',
                    subtitle: 'Web app for recording visited izakayas',
                    description: 'Web application that allows recording and sharing information and impressions of visited izakayas'
                },
                '02': {
                    title: 'Blogfy',
                    subtitle: 'Diary app',
                    description: 'Markdown-compatible diary creation and management application'
                },
                '03': {
                    title: 'TeamFlow',
                    subtitle: 'Project management web app',
                    description: 'Web app that streamlines team task management and communication'
                },
                '04': {
                    title: 'CodeLearner',
                    subtitle: 'Study progress management web app',
                    description: 'Web app for visualizing and managing programming learning progress'
                },
                '05': {
                    title: 'ConnectSphere',
                    subtitle: 'Twitter-like SNS web app',
                    description: 'SNS platform for programmers'
                }
            }
        },

        // ギャラリーデータ
        galleryData: {
            ja: {
                common: {
                    description: 'DALL-E2で生成したアート作品'
                },
                items: {
                    '1': {
                        title: 'AI生成イメージ 1'
                    },
                    '2': {
                        title: 'AI生成イメージ 2'
                    },
                    '3': {
                        title: 'AI生成イメージ 3'
                    },
                    '4': {
                        title: 'AI生成イメージ 4'
                    },
                    '5': {
                        title: 'AI生成イメージ 5'
                    },
                    '6': {
                        title: 'AI生成イメージ 6'
                    },
                    '7': {
                        title: 'AI生成イメージ 7'
                    },
                    '8': {
                        title: 'AI生成イメージ 8'
                    },
                    '9': {
                        title: 'AI生成イメージ 9'
                    },
                    '10': {
                        title: 'AI生成イメージ 10'
                    },
                    '11': {
                        title: 'AI生成イメージ 11'
                    },
                    '12': {
                        title: 'AI生成イメージ 12'
                    },
                    '13': {
                        title: 'AI生成イメージ 13'
                    },
                    '14': {
                        title: 'AI生成イメージ 14'
                    },
                    '15': {
                        title: 'AI生成イメージ 15'
                    },
                }
            },
            en: {
                common: {
                    description: 'Artwork generated with DALL-E2'
                },
                items: {
                    '1': {
                        title: 'AI Generated Image 1'
                    },
                    '2': {
                        title: 'AI Generated Image 2'
                    },
                    '3': {
                        title: 'AI Generated Image 3'
                    },
                    '4': {
                        title: 'AI Generated Image 4'
                    },
                    '5': {
                        title: 'AI Generated Image 5'
                    },
                    '6': {
                        title: 'AI Generated Image 6'
                    },
                    '7': {
                        title: 'AI Generated Image 7'
                    },
                    '8': {
                        title: 'AI Generated Image 8'
                    },
                    '9': {
                        title: 'AI Generated Image 9'
                    },
                    '10': {
                        title: 'AI Generated Image 10'
                    },
                    '11': {
                        title: 'AI Generated Image 11'
                    },
                    '12': {
                        title: 'AI Generated Image 12'
                    },
                    '13': {
                        title: 'AI Generated Image 13'
                    },
                    '14': {
                        title: 'AI Generated Image 14'
                    },
                    '15': {
                        title: 'AI Generated Image 15'
                    },
                }
            }
        },

        // 言語切り替えボタン
        languageSwitch: {
            ja: {
                switchToOther: 'EN',
                otherLanguage: 'English'
            },
            en: {
                switchToOther: '日本語',
                otherLanguage: '日本語'
            }
        }
    } as const
    
    // 言語を切り替える関数
    const toggleLanguage = () => {
        currentLanguage.value = currentLanguage.value === 'ja' ? 'en' : 'ja'
    }
    
    // 特定のキーに対応する翻訳テキストを取得する関数
    const t = (section: 'navigation' | 'project' | 'gallery' | 'about' | 'skill' | 'career' | 'languageSwitch' | 'projectData' | 'galleryData', key: string, subKey?: string, itemId?: string) => {
        const lang = currentLanguage.value
        
        // プロジェクトステータスの特殊処理
        if (section === 'project' && key === 'status' && subKey) {
            return translations.project[lang].status[subKey as keyof typeof translations.project.ja.status] || subKey
        }
        
        // navigation セクションの場合
        if (section === 'navigation') {
            return translations.navigation[lang][key as keyof typeof translations.navigation.ja] || key
        }
        
        // gallery セクションの場合
        if (section === 'gallery') {
            return translations.gallery[lang][key as keyof typeof translations.gallery.ja] || key
        }
        
        // project セクションの場合
        if (section === 'project') {
            if (key === 'details') {
                return translations.project[lang].details
            }
        }

        // about セクションの場合
        if (section === 'about') {
            if (key === 'title') {
                return translations.about[lang].title
            }
            if (key === 'description' && subKey) {
                const index = parseInt(subKey)
                if (!isNaN(index) && translations.about[lang].description[index]) {
                    return translations.about[lang].description[index]
                }
            }
        }

        // skill セクションの場合
        if (section === 'skill') {
            if (key === 'categories' && subKey) {
                return translations.skill[lang].categories[subKey as keyof typeof translations.skill.ja.categories] || subKey
            }
            if (key === 'descriptions' && subKey) {
                return translations.skill[lang].descriptions[subKey as keyof typeof translations.skill.ja.descriptions] || subKey
            }
            return translations.skill[lang][key as keyof typeof translations.skill.ja] || key
        }

        // career セクションの場合
        if (section === 'career') {
            if (key === 'categories' && subKey) {
                return translations.career[lang].categories[subKey as keyof typeof translations.career.ja.categories] || subKey
            }
            if (key === 'date' && subKey) {
                return translations.career[lang].date[subKey as keyof typeof translations.career.ja.date] || subKey
            }
            if (key === 'items' && itemId && subKey) {
                const item = translations.career[lang].items[itemId as keyof typeof translations.career.ja.items]
                if (item) {
                    return item[subKey as keyof typeof item] || subKey
                }
            }
        }

        // 言語切り替えボタンの場合
        if (section === 'languageSwitch') {
            return translations.languageSwitch[lang][key as keyof typeof translations.languageSwitch.ja] || key
        }

        // プロジェクトデータの場合
        if (section === 'projectData' && itemId && key) {
            const projectItem = translations.projectData[lang][itemId as keyof typeof translations.projectData.ja]
            if (projectItem) {
                return projectItem[key as keyof typeof projectItem] || key
            }
        }

        // ギャラリーデータの場合
        if (section === 'galleryData') {
            if (key === 'common' && subKey) {
                return translations.galleryData[lang].common[subKey as keyof typeof translations.galleryData.ja.common] || subKey
            }
            if (key === 'items' && itemId && subKey) {
                const galleryItem = translations.galleryData[lang].items[itemId as keyof typeof translations.galleryData.ja.items]
                if (galleryItem) {
                    return galleryItem[subKey as keyof typeof galleryItem] || subKey
                }
            }
        }
        
        return key
    }
    
    return {
        currentLanguage,
        toggleLanguage,
        translations,
        t
    }
}, {
    persist: true
}) 