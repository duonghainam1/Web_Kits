import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      const formData = new FormData(form.current);
      const emailInput = formData.get("email") as string;

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(emailInput)) {
        toast.error("Định dạng email không hợp lệ, vui lòng thử lại.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        content: formData.get("content"),
      };

      try {
        const response = await fetch("http://localhost:2004/api/v1/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          emailjs
            .sendForm(
              "service_cwchhdc",
              "template_dxp3ou9",
              form.current,
              "kGSzc2RJ3qF1lHtBo"
            )
            .then(
              () => {
                toast.success("Gửi email thành công!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                form.current?.reset();
                //setIsSubmitted(true); // Disable nút gửi sau khi gửi thành công
              },
              (error) => {
                toast.error("Gửi email thất bại: " + error.text, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            );
        } else {
          toast.error("Gửi email thất bại", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error("Gửi email thất bại", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="max-w-[1440px] w-[95vw] mx-auto">
      <div className="lg:mt-[40px] mt-[60px]">
        <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
          <Link to={`/`} className="text-gray-500 hover:text-black">
            Trang chủ
          </Link>
          <span className="mx-1 text-gray-500">&#10148;</span>
          Liên hệ
        </div>
        <div className="grid grid-cols-1 gap-4 mx-auto my-10 sm:grid-cols-2 md:grid-cols-2">
          <div>
            <h2 className="text-[25px] text-[#222222] font-semibold">
              Hãy giữ liên lạc! Liên hệ với chúng tôi
            </h2>
            <p className="text-[16px] text-[#999999] mt-5 max-w-[683px]">
              Phong cách tối giản không phải là tạo ra một không gian lạnh lẽo,
              cứng nhắc, trống rỗng. Đó là việc sử dụng những hình thức đơn giản
              và tự nhiên, đồng thời bỏ đi những lớp thừa thãi mà không mất đi
              vẻ đẹp thẩm mỹ của không gian.
            </p>
            <form ref={form} onSubmit={sendEmail}>
              <label className="block mt-4">Tên của bạn</label>
              <input
                className="lg:w-[683px] md:w-[90%] w-full h-[45px] border border-[#999999] rounded-md pl-4"
                type="text"
                name="name"
                placeholder="Tên của bạn"
                required
              />
              <label className="block mt-4">Email của bạn</label>
              <input
                className="lg:w-[683px] md:w-[90%] w-full h-[45px] border border-[#999999] rounded-md pl-4"
                type="email"
                name="email"
                placeholder="Email của bạn"
                required
              />
              <label className="block mt-4">Nội dung</label>
              <textarea
                className="lg:w-[683px] md:w-[90%] w-full h-[100px] border border-[#999999] rounded-md pl-4 pt-4"
                name="content"
                placeholder="Nội dung tin nhắn"
                required
              />
              <input
                className={`lg:w-[683px] md:w-[90%] w-full h-[45px] bg-black text-white mt-4 rounded-md text-sm ${
                  isSubmitted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-[#f68e56]"
                }`}
                type="submit"
                value="Gửi"
                disabled={isSubmitted}
              />
            </form>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.868087911924!2d105.74692680000003!3d21.037963500000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455305afd834b%3A0x17268e09af37081e!2sT%C3%B2a%20nh%C3%A0%20FPT%20Polytechnic.!5e0!3m2!1svi!2s!4v1725121386565!5m2!1svi!2s"
              className="lg:w-[710px] w-full h-[510px]"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
