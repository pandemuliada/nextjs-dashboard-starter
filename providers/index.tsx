import React from "react";
import I18nProvider from "@/providers/I18nProvider";
import { ToastProvider } from "@/components/ds/Toast";
import CustomCourierProvider from "@/providers/CourierProvider";

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <>
      <I18nProvider>
        <CustomCourierProvider>
          <ToastProvider>{props.children}</ToastProvider>
        </CustomCourierProvider>
      </I18nProvider>
    </>
  );
};

export default Providers;
