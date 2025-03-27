import type { TranslationDict } from './types';

interface AboutSectionTranslation {
  title: string;
  subtitle: string;
  description: string;
}

interface AboutTranslation {
  intro: AboutSectionTranslation;
  philosophy: AboutSectionTranslation;
  skills: AboutSectionTranslation;
  contact: AboutSectionTranslation;
}

export const aboutTranslations: TranslationDict<AboutTranslation> = {
  ja: {
    intro: {
      title: '自己紹介',
      subtitle: 'プロフィール',
      description: 'はじめまして、佐々木太郎と申します。フロントエンド開発を中心に、バックエンド開発も経験しているフルスタックエンジニアです。React、TypeScript、Node.jsを活用した開発に情熱を持っています。ユーザー体験を向上させる美しく機能的なインターフェースの構築に取り組んでいます。'
    },
    philosophy: {
      title: '開発哲学',
      subtitle: '私の考え方',
      description: '私は、技術は人々の生活を豊かにするためのツールだと考えています。単に動作するだけでなく、使いやすさと美しさを兼ね備えたソフトウェアを作ることが重要です。また、常に新しい技術やアプローチを学び続け、より良いソリューションを提供することを心がけています。'
    },
    skills: {
      title: 'スキルセット',
      subtitle: '技術スタック',
      description: 'フロントエンド開発では、React、TypeScript、Next.js、Tailwind CSSを駆使しています。バックエンドでは、Node.js、Express、NestJSを活用しています。データベースはMySQLとMongoDBを主に使用し、AWSでのデプロイも経験があります。また、GitとGitHubを用いたチーム開発の経験も豊富です。'
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: 'コンタクト情報',
      description: 'プロジェクトや協業の機会についてのご相談は、お気軽にご連絡ください。メールやSNSでのメッセージをお待ちしています。新しい挑戦や学びの機会を常に歓迎しています。'
    }
  },
  en: {
    intro: {
      title: 'Introduction',
      subtitle: 'Profile',
      description: 'Hello, my name is Taro Sasaki. I am a full-stack engineer with a focus on frontend development, but also experienced in backend development. I am passionate about development using React, TypeScript, and Node.js. I strive to build beautiful and functional interfaces that enhance user experience.'
    },
    philosophy: {
      title: 'Development Philosophy',
      subtitle: 'My Approach',
      description: 'I believe that technology is a tool to enrich people\'s lives. It\'s important to create software that is not just functional, but also user-friendly and aesthetically pleasing. I also aim to continuously learn new technologies and approaches to provide better solutions.'
    },
    skills: {
      title: 'Skill Set',
      subtitle: 'Tech Stack',
      description: 'For frontend development, I leverage React, TypeScript, Next.js, and Tailwind CSS. On the backend, I utilize Node.js, Express, and NestJS. I primarily work with MySQL and MongoDB for databases, and I have experience deploying to AWS. I also have extensive experience with team development using Git and GitHub.'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in Touch',
      description: 'If you\'d like to discuss project opportunities or collaboration, please feel free to reach out. I welcome messages via email or social media. I\'m always open to new challenges and learning opportunities.'
    }
  }
}; 