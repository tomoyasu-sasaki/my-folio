import type { TranslationDict, BaseTranslationItem } from './types'

/**
 * 経歴セクションの翻訳アイテムの型定義
 */
interface CareerSectionTranslation {
  /** セクションのタイトル */
  title: BaseTranslationItem;
  /** セクションの説明 */
  description: BaseTranslationItem;
}

/**
 * 経歴カテゴリーの翻訳アイテムの型定義
 */
interface CareerCategoryTranslation {
  /** カテゴリー名 */
  name: BaseTranslationItem;
  /** カテゴリーの説明 */
  description: BaseTranslationItem;
}

/**
 * 経歴アイテムの翻訳アイテムの型定義
 */
interface CareerItemTranslation extends BaseTranslationItem {
  /** アイテムのタイトル */
  title: string;
  /** アイテムのサブタイトル */
  subtitle: string;
  /** アイテムの説明 */
  description: string;
}

/**
 * 経歴ページ全体の翻訳アイテムの型定義
 */
interface CareerTranslation {
  /** セクション情報 */
  section: CareerSectionTranslation;
  /** カテゴリー情報 */
  categories: {
    /** すべて */
    all: CareerCategoryTranslation;
    /** 学歴 */
    education: CareerCategoryTranslation;
    /** 職歴 */
    work: CareerCategoryTranslation;
    /** ライフイベント */
    life: CareerCategoryTranslation;
  };
  /** 日付表示 */
  date: {
    /** 年の表示形式 */
    year: BaseTranslationItem;
    /** 月の表示形式 */
    month: BaseTranslationItem;
  };
  /** 経歴アイテム */
  items: {
    [key: `${number}`]: CareerItemTranslation;
  };
}

/**
 * 経歴翻訳データ
 */
export const careerTranslations: TranslationDict<CareerTranslation> = {
  ja: {
    section: {
      title: {
        text: '経歴',
        description: '学歴、職歴、その他の重要なライフイベント'
      },
      description: {
        text: '私のこれまでの経歴をタイムライン形式で紹介します',
        description: '経歴の概要説明'
      }
    },
    categories: {
      all: {
        name: {
          text: 'すべて',
          description: 'すべてのカテゴリーを表示'
        },
        description: {
          text: 'すべての経歴アイテムを表示します',
          description: 'すべてのカテゴリーの説明'
        }
      },
      education: {
        name: {
          text: '学歴',
          description: '教育に関する経歴'
        },
        description: {
          text: '学校教育に関する経歴を表示します',
          description: '教育カテゴリーの説明'
        }
      },
      work: {
        name: {
          text: '職歴',
          description: '仕事に関する経歴'
        },
        description: {
          text: '職務経験に関する経歴を表示します',
          description: '職歴カテゴリーの説明'
        }
      },
      life: {
        name: {
          text: 'ライフイベント',
          description: '人生の重要なイベント'
        },
        description: {
          text: '人生の重要なイベントを表示します',
          description: 'ライフイベントカテゴリーの説明'
        }
      }
    },
    date: {
      year: {
        text: '年',
        description: '年の表示単位'
      },
      month: {
        text: '月',
        description: '月の表示単位'
      }
    },
    items: {
      '01': {
        text: '誕生',
        title: '生まれる',
        subtitle: '埼玉県',
        description: '埼玉県で生まれる。当時のことはあまり記憶にない。'
      },
      '03': {
        text: '高校卒業',
        title: '高校卒業',
        subtitle: 'いざ東京へ',
        description: '高校卒業して数日後に上京。日経新聞社の奨学生として、大田区の販売店に配属。早朝の仕事と学業の両立に挑戦。'
      },
      '04': {
        text: '専門学校入学',
        title: '専門学校入学',
        subtitle: '本格的な IT 学習開始',
        description: '日本工学院専門学校 情報処理科システム開発コースに入学。Java、C#などのプログラミング言語やデータベース、ネットワークの基礎を学ぶ。'
      },
      '05': {
        text: '専門学校卒業',
        title: '専門学校卒業',
        subtitle: 'いざ札幌へ',
        description: '日本工学院専門学校を無事卒業。同時に新聞奨学生としての活動も終了し、新たなステージへ。専門学生の期間の記憶がほどんどない。睡眠の重要性を実感する'
      },
      '06': {
        text: '就職',
        title: '第三者検証の企業に就職',
        subtitle: '札幌での新生活開始',
        description: '日本ナレッジ株式会社札幌支社に入社。基幹業務システムの仕様追加や検証業務を担当。品質管理の重要性とシステム開発の実務を学ぶ。'
      },
      '07': {
        text: '転職',
        title: '転職',
        subtitle: 'キャリアアップ',
        description: 'より幅広い経験を積むため株式会社エスプランニングへ転職。WEBアプリケーションのフロントエンド開発に従事。'
      },
      '08': {
        text: '資格取得',
        title: '資格取得',
        subtitle: 'スキルアップ',
        description: 'AWSのCertified Cloud Practitionerを取得。AWSの基礎を学び、クラウド環境の理解を深める。'
      },
      '09': {
        text: 'ポートフォリオ作成',
        title: 'ポートフォリオサイト作成',
        subtitle: '個人プロジェクト',
        description: '暇だったのでポートフォリオサイトを作成。Vue.jsとTypeScriptを使用。デザインセンスはない。'
      }
    }
  },
  en: {
    section: {
      title: {
        text: 'Career',
        description: 'Education, work experience, and other significant life events'
      },
      description: {
        text: 'A timeline of my career journey',
        description: 'Overview of career history'
      }
    },
    categories: {
      all: {
        name: {
          text: 'All',
          description: 'Show all categories'
        },
        description: {
          text: 'Display all career items',
          description: 'Description for all categories'
        }
      },
      education: {
        name: {
          text: 'Education',
          description: 'Educational background'
        },
        description: {
          text: 'Display educational history',
          description: 'Description for education category'
        }
      },
      work: {
        name: {
          text: 'Work Experience',
          description: 'Professional experience'
        },
        description: {
          text: 'Display work history',
          description: 'Description for work experience category'
        }
      },
      life: {
        name: {
          text: 'Life Events',
          description: 'Significant life events'
        },
        description: {
          text: 'Display important life events',
          description: 'Description for life events category'
        }
      }
    },
    date: {
      year: {
        text: '',
        description: 'Year unit display'
      },
      month: {
        text: '',
        description: 'Month unit display'
      }
    },
    items: {
      '01': {
        text: 'Birth',
        title: 'Born',
        subtitle: 'Saitama Prefecture',
        description: 'Born in Saitama Prefecture. I don\'t remember much from that time.'
      },
      '03': {
        text: 'High School Graduation',
        title: 'High School Graduation',
        subtitle: 'Moving to Tokyo',
        description: 'Moved to Tokyo a few days after graduating from high school. Assigned to a sales store in Ota Ward as a scholarship student of Nikkei Newspaper. Challenged to balance early morning work and studies.'
      },
      '04': {
        text: 'Technical School Enrollment',
        title: 'Enrolled in Technical School',
        subtitle: 'Started formal IT learning',
        description: 'Enrolled in the System Development Course at Japan Engineering College. Learned programming languages such as Java and C#, as well as database and network basics.'
      },
      '05': {
        text: 'Technical School Graduation',
        title: 'Technical School Graduation',
        subtitle: 'Moving to Sapporo',
        description: 'Successfully graduated from Japan Engineering College. Also ended activities as a newspaper scholarship student and moved to a new stage. I barely remember the period as a technical student. Realized the importance of sleep.'
      },
      '06': {
        text: 'First Job',
        title: 'Joined Third-party Verification Company',
        subtitle: 'New life in Sapporo',
        description: 'Joined Nihon Knowledge Co., Ltd. Sapporo Branch. In charge of specification additions and verification of core business systems. Learned the importance of quality control and practical system development.'
      },
      '07': {
        text: 'Career Change',
        title: 'Career Change',
        subtitle: 'Career advancement',
        description: 'Changed jobs to S Planning Co., Ltd. to gain broader experience. Engaged in frontend development of web applications.'
      },
      '08': {
        text: 'Certification',
        title: 'Certification',
        subtitle: 'Skill enhancement',
        description: 'Obtained AWS Certified Cloud Practitioner. Learned AWS basics and deepened understanding of cloud environments.'
      },
      '09': {
        text: 'Portfolio Creation',
        title: 'Portfolio Website Creation',
        subtitle: 'Personal project',
        description: 'Created a portfolio website because I had free time. Used Vue.js and TypeScript. I have no design sense.'
      }
    }
  }
}; 