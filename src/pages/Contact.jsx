import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const openingHours = [
  { day: 'Hënë - Premte', hours: '09:00 - 18:00' },
  { day: 'Shtunë', hours: '10:00 - 16:00' },
  { day: 'Diel', hours: 'Mbyllur' },
];

export default function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData(initialFormState);
  };

  return (
    <>
      <Helmet>
        <title>Kontakti | Auto Salloni BMW</title>
        <meta
          name="description"
          content="Kontaktoni Auto Salloni BMW për pyetje mbi stokun, oraret e punës dhe detajet e showroom-it."
        />
      </Helmet>

      <div className="min-h-screen bg-dark py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 max-w-2xl"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-luxury-accent">
              Kontakti
            </p>
            <h1 className="mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Flisni me salonin tonë të BMW-ve në Prizren
            </h1>
            <p className="text-base leading-7 text-luxury-text-secondary">
              Për pyetje rreth një veture, verifikoni disponueshmërinë ose planifikoni një vizitë, na shkruani ose telefononi gjatë orarit të punës.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <motion.section
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-luxury-border bg-dark-10 p-6">
                <h2 className="mb-5 text-xl font-semibold">Detajet e kontaktit</h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Phone size={18} className="mt-1 text-luxury-accent" />
                    <div>
                      <p className="text-sm text-luxury-text-secondary">Telefoni</p>
                      <div className="space-y-1">
                        <a href="tel:+38344316881" className="block font-medium hover:text-luxury-accent">
                          +383 (0) 44 316 881
                        </a>
                        <a href="tel:+38349316881" className="block font-medium hover:text-luxury-accent">
                          +383 (0) 49 316 881
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail size={18} className="mt-1 text-luxury-accent" />
                    <div>
                      <p className="text-sm text-luxury-text-secondary">Email</p>
                      <a href="mailto:autosallonibmw@gmail.com" className="font-medium hover:text-luxury-accent">
                        autosallonibmw@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="mt-1 text-luxury-accent" />
                    <div>
                      <p className="text-sm text-luxury-text-secondary">Showroom</p>
                      <p className="font-medium">
                        Rruga e Tiranës 18
                        <br />
                        Prizren 20000, Kosovë
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-luxury-border bg-dark-10 p-6">
                <h2 className="mb-5 text-xl font-semibold">Orari i punës</h2>
                <div className="space-y-3">
                  {openingHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between gap-4 border-b border-luxury-border pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-luxury-text-secondary">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-luxury-border bg-dark-10 p-6">
                <h2 className="mb-3 text-xl font-semibold">Çfarë të përfshini</h2>
                <ul className="space-y-2 text-sm leading-6 text-luxury-text-secondary">
                  <li>• Modelin që po kërkoni</li>
                  <li>• Kur dëshironi të vizitoni</li>
                  <li>• Numrin e telefonit për përgjigje të shpejtë</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-luxury-border bg-dark-10 p-6 md:p-7"
            >
              <h2 className="mb-5 text-xl font-semibold">Dërgo një mesazh</h2>

              {submitted ? (
                <div className="rounded-2xl border border-luxury-border bg-dark p-6">
                  <h3 className="mb-2 text-lg font-semibold">Mesazhi u dërgua</h3>
                  <p className="text-luxury-text-secondary">
                    Faleminderit. Mesazhi juaj është regjistruar. Nëse kërkesa juaj është urgjente, na telefononi gjithashtu.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-primary mt-6"
                  >
                    Dërgo përsëri
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Emri
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                      placeholder="Emri juaj"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Telefoni
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                        placeholder="+383 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Mesazh
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                      placeholder="Na tregoni për cilën veturë ose pyetje bëhet fjalë."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Dërgo mesazh
                  </button>
                </form>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
}