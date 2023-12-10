import { color } from "@/theme/theme.config";
import { useEffect } from "react";
import { useRef } from "react";

const ChatBot = () => {
  const MessengerRef = useRef();
  useEffect(() => {
    MessengerRef.current.setAttribute("page_id", process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID);
    MessengerRef.current.setAttribute("theme_color", color.primary);
    MessengerRef.current.setAttribute("attribution", "biz_inbox");

    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v16.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <>
      <div id="fb-root"></div>
      <div
        ref={MessengerRef}
        id="fb-customer-chat"
        className="fb-customerchat"
      ></div>
    </>
  );
};
export default ChatBot;

