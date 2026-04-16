import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const stats = [
  { value: '10+', label: 'Vetura në stok' },
  { value: '5★', label: 'Shërbim premium' },
  { value: 'Prizren', label: 'Showroom në qytet' },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Transparencë e plotë',
    description: 'Çmimet dhe specifikimet publike, pa surpriza të fshehta.',
  },
  {
    icon: CheckCircle2,
    title: 'Inspektim i kontrolluar',
    description: 'Çdo makinë shfaqet me fotot kryesore dhe një përshkrim të detajuar.',
  },
  {
    icon: Star,
    title: 'Përvojë e rafinuar',
    description: 'Një proces i thjeshtë, i fokusuar tek vetura dhe kontakti direkt.',
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat('sq-AL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const formatKilometers = (value) =>
  new Intl.NumberFormat('sq-AL').format(value);

export default function Home() {
  const { vehicles } = useAppContext();
  const availableVehicles = vehicles.filter((vehicle) => !vehicle.sold);
  const featuredVehicles = availableVehicles.filter((vehicle) => vehicle.featured).slice(0, 3);
  const heroVehicle = featuredVehicles[0] || availableVehicles[0];

  return (
    <>
      <Helmet>
        <title>Auto Salloni BMW – Prizren | Vetura Premium</title>
        <meta
          name="description"
          content="Një showroom i qartë BMW në Prizren. Shikoni veturat e disponueshme dhe kontaktoni direkt për më shumë informacion."
        />
      </Helmet>

      <div className="bg-dark">
        <section className="site-container pt-6 md:pt-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] rounded-[2rem] bg-white p-8 shadow-[0_18px_60px_rgba(17,17,17,0.08)]">
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <span className="badge">Auto Salloni BMW</span>
                <h1 className="section-title max-w-3xl text-5xl md:text-6xl">
                  Veturat më të mira për drejtimin luksoz në Prizren
                </h1>
                <p className="max-w-2xl text-body-lg text-luxury-text-secondary">
                  Një koleksion i përzgjedhur BMW, Mercedes dhe Audi me prezantim të qartë dhe kontakte të drejtpërdrejta.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link to="/cars" className="btn-primary inline-flex items-center justify-center gap-2">
                  Shiko Vetura <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-outline inline-flex items-center justify-center gap-2">
                  Kontakto Shitësin
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-luxury-border bg-dark-10 px-4 py-5 text-center">
                    <p className="text-2xl font-semibold text-[#2b2b2b]">{item.value}</p>
                    <p className="mt-2 text-sm text-luxury-text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {heroVehicle && (
              <div className="relative overflow-hidden rounded-[1.8rem] bg-[#f4f1ee]">
                <img
                  src={heroVehicle.images?.[1] || heroVehicle.image}
                  alt={`${heroVehicle.model} ${heroVehicle.trim}`}
                  className="h-full w-full min-h-[520px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-white/95 p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-luxury-accent">Makina e re</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#2b2b2b]">
                    {heroVehicle.model} {heroVehicle.year}
                  </h2>
                  <p className="mt-2 text-sm text-luxury-text-secondary">
                    {heroVehicle.trim} · {heroVehicle.bodyType} · {heroVehicle.color}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3 text-sm text-luxury-text-secondary">
                    <div className="rounded-2xl bg-white px-4 py-3 border border-luxury-border">
                      <p className="font-semibold text-[#2b2b2b]">{formatPrice(heroVehicle.price)}</p>
                      <p className="mt-1">Çmimi</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 border border-luxury-border">
                      <p className="font-semibold text-[#2b2b2b]">{formatKilometers(heroVehicle.mileage)} km</p>
                      <p className="mt-1">Kilometrazhi</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 border border-luxury-border">
                      <p className="font-semibold text-[#2b2b2b]">{heroVehicle.fuel}</p>
                      <p className="mt-1">Karburanti</p>
                    </div>
                  </div>
                  <Link
                    to={`/cars/${heroVehicle.id}`}
                    className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2"
                  >
                    Detaje Veture
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <div className="page-header">
              <span className="section-kicker">Stoku i fundit</span>
              <h2 className="section-title">Vetura të zgjedhura nga koleksioni jonë</h2>
              <p className="text-body-lg text-luxury-text-secondary max-w-3xl">
                Shikoni tre prej makinave më të kërkuara të momentit dhe hapni faqen e detajeve për çdo model.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {featuredVehicles.map((vehicle, index) => (
                <motion.article
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  data-aos="fade-up"
                  className="group overflow-hidden rounded-[1.8rem] border border-luxury-border bg-white shadow-[0_12px_24px_rgba(17,17,17,0.08)]"
                >
                  <div className="relative h-72 overflow-hidden bg-[#f4f1ee]">
                    <img
                      src={vehicle.images?.[(index % 3) === 1 ? 1 : 2] || vehicle.image}
                      alt={vehicle.model}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-[0.18em] text-luxury-accent">{vehicle.bodyType}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#2b2b2b]">{vehicle.model}</h3>
                    <p className="mt-2 text-sm text-luxury-text-secondary">{vehicle.trim}</p>
                    <div className="mt-5 grid gap-3 text-sm text-luxury-text-secondary">
                      <div className="flex justify-between border-t border-luxury-border pt-3">
                        <span>Viti</span>
                        <span>{vehicle.year}</span>
                      </div>
                      <div className="flex justify-between border-t border-luxury-border pt-3">
                        <span>Qmimi</span>
                        <span>{formatPrice(vehicle.price)}</span>
                      </div>
                      <div className="flex justify-between border-t border-luxury-border pt-3">
                        <span>Kilometrazhi</span>
                        <span>{formatKilometers(vehicle.mileage)} km</span>
                      </div>
                    </div>
                    <Link
                      to={`/cars/${vehicle.id}`}
                      className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2"
                    >
                      Shiko Detajet
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[#f6f4ef]">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="page-header">
                <span className="section-kicker">Pse ne</span>
                <h2 className="section-title">Një përvojë e thjeshtë, elegante dhe e besueshme</h2>
                <p className="text-body-lg text-luxury-text-secondary max-w-3xl">
                  Nga katalogu në kontakt, çdo hap ndjehet i qartë dhe i fokusuar tek vetura.
                </p>
              </div>

              <div className="grid gap-4">
                {pillars.map((item) => (
                  <article key={item.title} className="rounded-[1.5rem] border border-luxury-border bg-white p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff0ee] text-[#6b0f0f]">
                      <item.icon size={22} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#2b2b2b]">{item.title}</h3>
                    <p className="mt-3 text-body text-luxury-text-secondary">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="site-container">
            <div className="rounded-[2rem] border border-luxury-border bg-dark-10 p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-luxury-accent">Showroom i gatshëm</p>
                  <h2 className="mt-3 text-4xl font-semibold text-[#2b2b2b]">Shikoni katalogun ose kontaktoni ekipin tonë</h2>
                  <p className="mt-4 text-body-lg text-luxury-text-secondary max-w-2xl">
                    Çdo veturë në listë është përgatitur për prezantim. Për pyetje të shpejta, na shkruani me email ose telefononi tani.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/cars" className="btn-primary inline-flex items-center justify-center gap-2">
                    Shiko Vetura
                  </Link>
                  <Link to="/contact" className="btn-outline inline-flex items-center justify-center gap-2">
                    Kontakto Tani
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
