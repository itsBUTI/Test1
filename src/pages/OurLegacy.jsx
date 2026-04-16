import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const formatPrice = (value) =>
  new Intl.NumberFormat('sq-AL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

export default function OurLegacy() {
  const { vehicles } = useAppContext();

  const availableVehicles = vehicles.filter((vehicle) => !vehicle.sold);
  const featuredVehicles = availableVehicles.filter((vehicle) => vehicle.featured);
  const bodyTypes = [...new Set(availableVehicles.map((vehicle) => vehicle.bodyType))];
  const newestYear = availableVehicles.length
    ? Math.max(...availableVehicles.map((vehicle) => vehicle.year))
    : null;
  const averagePrice = availableVehicles.length
    ? Math.round(
        availableVehicles.reduce((sum, vehicle) => sum + vehicle.price, 0) / availableVehicles.length
      )
    : 0;

  const focusPoints = [
    'Stoku është përditësuar përpara çdo thirrjeje.',
    'Faqet e veturave tregojnë modelin, vitin, kilometrazhin, karburantin, motorin dhe çmimin.',
    'Për më shumë informacion, kontaktoni showroom-in direkt pa hapa të panevojshëm.',
  ];

  const supportPoints = [
    'Ndihmë për krahasimin e modeleve dhe trim-eve',
    'Përgjigje e qartë për disponueshmërinë',
    'Udhëzim i shkurtër përpara vizitës',
  ];

  return (
    <>
      <Helmet>
        <title>Rreth Nesh | Auto Salloni BMW</title>
        <meta
          name="description"
          content="Mësoni më shumë për mënyrën se si Auto Salloni BMW trajton stokun, mbështet blerësit dhe ofron kontakt të drejtpërdrejtë."
        />
      </Helmet>

      <div className="bg-dark">
        <section className="border-b border-luxury-border">
          <div className="container-luxury py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-2xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-luxury-accent">
                  Rreth Nesh
                </p>
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                  Një mënyrë e qartë për të shfletuar veturat në Prizren.
                </h1>
                <p className="mb-4 text-lg leading-8 text-luxury-text-secondary md:text-xl">
                  Ky site ndërtohet mbi një listë të pastër të stokut dhe kontakt të drejtpërdrejtë. Ne nuk e komplikojmë procesin me formularë të panevojshëm.
                </p>
                <p className="text-base leading-7 text-luxury-text-secondary">
                  Tani stokun përbëjnë {availableVehicles.length} vetura në {bodyTypes.length} lloje karrocerie, me modelet e zgjedhura në shfaqje.
                </p>
              </div>

              <div className="rounded-2xl border border-luxury-border bg-dark-10 p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-bold">Çfarë e veçon biznesin</h2>
                <div className="space-y-4">
                  <div className="rounded-xl border border-luxury-border bg-dark px-4 py-4">
                    <p className="text-sm text-luxury-text-secondary">Veturat aktuale</p>
                    <p className="mt-2 text-3xl font-bold">{availableVehicles.length}</p>
                  </div>
                  <div className="rounded-xl border border-luxury-border bg-dark px-4 py-4">
                    <p className="text-sm text-luxury-text-secondary">Çmimi mesatar</p>
                    <p className="mt-2 text-3xl font-bold">{formatPrice(averagePrice)}</p>
                  </div>
                  <div className="rounded-xl border border-luxury-border bg-dark px-4 py-4">
                    <p className="text-sm text-luxury-text-secondary">Viti më i ri</p>
                    <p className="mt-2 text-3xl font-bold">{newestYear}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-luxury-border bg-dark-10">
          <div className="container-luxury py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Si e mbajmë të thjeshtë procesin</h2>
                <p className="mb-6 text-luxury-text-secondary">
                  Qëllimi nuk është të shtojmë premtime të tepërta. Qëllimi është të kuptoni lehtë se çfarë është në stok dhe si të kontaktoni.
                </p>
                <div className="space-y-3">
                  {focusPoints.map((point) => (
                    <div
                      key={point}
                      className="flex gap-3 rounded-xl border border-luxury-border bg-dark px-4 py-4"
                    >
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-luxury-accent" />
                      <p className="text-luxury-text-secondary">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-luxury-border bg-dark">
                {availableVehicles[0] && (
                  <img
                    src={availableVehicles[0].image}
                    alt={`${availableVehicles[0].year} BMW ${availableVehicles[0].model} ${availableVehicles[0].trim}`}
                    className="h-72 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="mb-3 text-2xl font-bold">Fillimi me stokun, pastaj detajet.</h3>
                  <p className="text-luxury-text-secondary">
                    Kjo është e gjithë struktura e faqes. Ne hoqëm seksionet e panevojshme dhe mbajtëm vetëm ato që ndihmojnë të zgjidhet një veturë: foto, specifikime, çmim dhe kontakt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-luxury-border">
          <div className="container-luxury py-16 md:py-20">
            <div className="mb-10 max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Çfarë ndodh pasi të na kontaktoni</h2>
              <p className="text-luxury-text-secondary">
                Ne e mbajmë hapin tjetër të thjeshtë. Kontakti është për pyetje reale mbi veturat aktuale në listë.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {supportPoints.map((item) => (
                <div key={item} className="rounded-2xl border border-luxury-border bg-dark-10 p-6">
                  <p className="text-lg font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark-10">
          <div className="container-luxury py-16 md:py-20">
            <div className="rounded-2xl border border-luxury-border bg-dark p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-2xl">
                  <h2 className="mb-3 text-3xl font-bold">Browse the cars or contact the showroom.</h2>
                  <p className="text-luxury-text-secondary">
                    If you want to compare the current stock, start with the cars page. If you already have
                    a model in mind, go straight to contact.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/cars"
                    className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-6 py-3 font-semibold text-dark"
                  >
                    Shiko veturat <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-luxury-border px-6 py-3 font-semibold text-luxury-text"
                  >
                    Kontaktoni
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
