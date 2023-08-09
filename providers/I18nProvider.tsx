"use client";

import { I18nProvider as ReactAriaI18nProvider, useLocale } from "react-aria";

type I18nProviderProps = {
  children: React.ReactNode;
};

const I18nProvider = (props: I18nProviderProps) => {
  return <ReactAriaI18nProvider>{props.children}</ReactAriaI18nProvider>;
};

export default I18nProvider;
