export type I18nOptionObject = {
  [index: string]: any;
  locales: Record<string, any>;
  defaultLocale: string;
};

export type locale = Record<string, string>;

export interface I18nInterface {
  readonly localeConfig: I18nOptionObject;
  chosenLocale: string;
  tr(key: string): string;
  setLocale(locale: string): void;
}
