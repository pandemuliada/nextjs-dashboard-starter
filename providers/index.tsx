import React from "react";
import I18nProvider from "@/providers/I18nProvider";
import { ToastProvider } from "@/components/ds/Toast";

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <>
      <I18nProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </I18nProvider>
    </>
  );
};

export default Providers;
