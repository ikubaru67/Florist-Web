import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or ready to place an order? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#064232] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-[#064232]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#064232] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-[#064232]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#064232] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-[#064232] resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#064232] hover:bg-[#568F87] text-white py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#064232] p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-1 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Visit Us</h3>
                <p className="text-gray-600">
                  123 Blossom Street<br />
                  Garden City, GC 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#064232] p-3 rounded-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-1 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Call Us</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#064232] p-3 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-1 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Email Us</h3>
                <p className="text-gray-600">hello@kalaflorist.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#064232] p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-1 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9AM - 6PM<br />
                  Saturday: 10AM - 4PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}