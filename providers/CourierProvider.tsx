"use client";
import { Inbox, useInbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";
import { CourierProvider } from "@trycourier/react-provider";
import { ReactNode, useEffect } from "react";

const MyInbox = () => {
  const inbox: any = useInbox();

  useEffect(() => {
    inbox.fetchMessages();
  }, []);

  return (
    <div className="">
      {inbox.messages?.map((message: any, index: number) => {
        return (
          <div key={message.messageId}>
            <p>
              {index} {message.preview}
            </p>
            {message.read ? (
              <>
                <button
                  onClick={() => {
                    inbox.markMessageUnread(message.messageId);
                  }}
                >
                  Unread Me
                </button>
                <button>Archive Me</button>
              </>
            ) : (
              <button
                onClick={() => {
                  inbox.markMessageRead(message.messageId);
                }}
              >
                Read Me
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
const CustomCourierProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CourierProvider
      userId="pandemuliada"
      clientKey={process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY as string}
    >
      <Toast />
      <MyInbox />

      {children}
    </CourierProvider>
  );
};

export default CustomCourierProvider;
