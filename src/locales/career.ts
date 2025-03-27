import type { TranslationDict } from './types';

interface CareerCategoriesTranslation {
  all: string;
  education: string;
  work: string;
  life: string;
}

interface CareerDateTranslation {
  year: string;
  month: string;
}

interface CareerItemTranslation {
  title: string;
  subtitle: string;
  description: string;
}

interface CareerItemsTranslation {
  [key: string]: CareerItemTranslation;
}

interface CareerTranslation {
  categories: CareerCategoriesTranslation;
  date: CareerDateTranslation;
  items: CareerItemsTranslation;
}

export const careerTranslations: TranslationDict<CareerTranslation> = {
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
}; 