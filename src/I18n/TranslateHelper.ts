import { reactive, App } from "vue";
import { I18nOptionObject, I18nInterface } from "@/I18n/TypeI18n";

class I18n implements I18nInterface {
  readonly localeConfig: I18nOptionObject;
  public chosenLocale: string;

  constructor(localeConfig: I18nOptionObject) {
    this.localeConfig = localeConfig;
    this.chosenLocale = localeConfig.defaultLocale;
  }

  tr(key: string) {
    let locale: Record<string, string>;

    if (Object.keys(this.localeConfig.locales).includes(this.chosenLocale)) {
      locale = this.localeConfig.locales[this.chosenLocale];
    } else {
      throw new Error("No locale was found with the set key");
    }

    const result = key.split(".").reduce<object>((o, k, i, a) => {
      if (typeof o === "object" && o !== null && k in o) {
        return o[k as keyof typeof o];
      } else {
        throw new Error(
          `Key path: ${a.slice(0, i + 1).join(".")} is not valid!`
        );
      }
    }, locale);

    if (typeof result !== "string") {
      throw new Error(`Key path: ${key} is not valid!`);
    }

    return result;
  }

  setLocale(this: I18n, localeKey: string) {
    if (Object.keys(this.localeConfig.locales).includes(localeKey)) {
      this.chosenLocale = localeKey;
    } else {
      throw new Error(
        "Locale key was not found in the config object's locales property"
      );
    }
  }
}

export default {
  install(app: App, options: I18nOptionObject): void {
    const i18nInstance = reactive(new I18n(options));
    app.config.globalProperties.$t = (val: string) => i18nInstance.tr(val);
    app.config.globalProperties.$i18n = i18nInstance;

    app.provide("i18n", i18nInstance);
  }
};

export class LocaleHelper {
  getGlobalLocale(currentInstance: any): string {
      return currentInstance?.appContext?.config?.globalProperties?.$globalLocale || "en";
  }
}
