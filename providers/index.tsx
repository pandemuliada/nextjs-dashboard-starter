import React from "react";
import I18nProvider from "@/providers/I18nProvider";

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <>
      <I18nProvider>{props.children}</I18nProvider>
    </>
  );
};

export default Providers;
