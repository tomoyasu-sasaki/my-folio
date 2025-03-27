import type { TranslationDict } from './types';

interface ContactFormTranslation {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  requiredField: string;
  invalidEmail: string;
  messageTooShort: string;
  successMessage: string;
  errorMessage: string;
}

interface ContactSocialTranslation {
  title: string;
  subtitle: string;
  githubLabel: string;
  twitterLabel: string;
  linkedinLabel: string;
}

interface ContactTranslation {
  form: ContactFormTranslation;
  social: ContactSocialTranslation;
}

export const contactTranslations: TranslationDict<ContactTranslation> = {
  ja: {
    form: {
      title: 'お問い合わせ',
      subtitle: 'ご質問やプロジェクトのご相談などお気軽にお問い合わせください',
      nameLabel: 'お名前',
      namePlaceholder: '山田太郎',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'yamada@example.com',
      messageLabel: 'メッセージ',
      messagePlaceholder: 'お問い合わせ内容をご記入ください',
      submitButton: '送信する',
      requiredField: 'この項目は必須です',
      invalidEmail: '有効なメールアドレスを入力してください',
      messageTooShort: 'メッセージは10文字以上入力してください',
      successMessage: 'お問い合わせありがとうございます。早急にご返信いたします。',
      errorMessage: '送信中にエラーが発生しました。後ほど再度お試しください。'
    },
    social: {
      title: 'SNS',
      subtitle: '各種SNSでもご連絡いただけます',
      githubLabel: 'GitHub',
      twitterLabel: 'Twitter',
      linkedinLabel: 'LinkedIn'
    }
  },
  en: {
    form: {
      title: 'Contact',
      subtitle: 'Feel free to contact me with any questions or project inquiries',
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Please enter your message here',
      submitButton: 'Submit',
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      messageTooShort: 'Message must be at least 10 characters',
      successMessage: 'Thank you for your message. I will respond as soon as possible.',
      errorMessage: 'An error occurred while sending your message. Please try again later.'
    },
    social: {
      title: 'Social Media',
      subtitle: 'You can also reach me on these platforms',
      githubLabel: 'GitHub',
      twitterLabel: 'Twitter',
      linkedinLabel: 'LinkedIn'
    }
  }
}; 