import { FaGithub, FaLinkedin, FaFacebook, FaStackOverflow } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#0b0f1a] text-white px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      {/* Optional Animated Background */}
      

      {/* Main Container */}
      <div className="relative max-w-6xl w-full grid md:grid-cols-2 gap-12 bg-[#111827]/90 p-10 rounded-2xl shadow-2xl border border-[#4cc9f0]/20 backdrop-blur-md">
        {/* Contact Form */}
        <div>
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9f0] via-[#7209b7] to-[#f72585]">
            Let’s Connect!
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            I’m <strong className="text-[#4cc9f0]">Leulseyoum</strong>, a passionate{" "}
            <span className="text-[#4cc9f0] font-medium">Flutter & Frontend Developer</span>. Got a project,
            idea or just want to say hi? Drop a message below!
          </p>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-[#1f2937] text-white rounded-lg border border-[#4cc9f0]/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-[#1f2937] text-white rounded-lg border border-[#4cc9f0]/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 bg-[#1f2937] text-white rounded-lg border border-[#4cc9f0]/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#f72585] via-[#7209b7] to-[#4cc9f0] hover:scale-105 hover:opacity-90 transition rounded-full py-3 font-semibold shadow-lg"
            >
              SEND MESSAGE 🚀
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6 text-gray-300">
          <div className="flex items-center gap-4">
            <MdEmail size={24} className="text-[#4cc9f0]" />
            <a href="mailto:Leulseyoum103@gmail.com" className="hover:text-white transition">
              Leulseyoum103@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <MdPhone size={24} className="text-[#4cc9f0]" />
            <a href="tel:+251989905112" className="hover:text-white transition">
              +251 989 905 112
            </a>
          </div>
          <div className="flex items-center gap-4">
            <MdLocationOn size={24} className="text-[#4cc9f0]" />
            <span>Addis Ababa, Ethiopia</span>
          </div>

          <div className="flex gap-5 mt-10 text-2xl">
          <a href="https://linkedin.com/in/leulseyoum" target="_blank" rel="noreferrer">
  <FaLinkedin className="hover:text-[#4cc9f0] transition-transform hover:scale-125 duration-300" />
</a>
<a href="https://stackoverflow.com/users/your_id/leulseyoum" target="_blank" rel="noreferrer">
  <FaStackOverflow className="hover:text-[#4cc9f0] transition-transform hover:scale-125 duration-300" />
</a>
<a href="https://facebook.com/leulseyoum" target="_blank" rel="noreferrer">
  <FaFacebook className="hover:text-[#4cc9f0] transition-transform hover:scale-125 duration-300" />
</a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
