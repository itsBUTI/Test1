import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const getRange = (vehicles, key, fallbackMin, fallbackMax) => {
  if (!vehicles.length) {
    return { min: fallbackMin, max: fallbackMax };
  }

  const values = vehicles
    .map((vehicle) => vehicle[key])
    .filter((value) => typeof value === 'number' && !Number.isNaN(value));

  if (!values.length) {
    return { min: fallbackMin, max: fallbackMax };
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('sq-AL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const formatKilometers = (value) =>
  new Intl.NumberFormat('sq-AL').format(value);

export default function Inventory() {
  const { vehicles } = useAppContext();

  const priceRange = useMemo(() => getRange(vehicles, 'price', 0, 100000), [vehicles]);
  const yearRange = useMemo(() => getRange(vehicles, 'year', 2020, new Date().getFullYear()), [vehicles]);
  const mileageRange = useMemo(() => getRange(vehicles, 'mileage', 0, 50000), [vehicles]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    model: '',
    bodyType: '',
    fuel: '',
    transmission: '',
    color: '',
    priceMax: priceRange.max,
    yearMin: yearRange.min,
    yearMax: yearRange.max,
    mileageMax: mileageRange.max,
  });

  const uniqueModels = [...new Set(vehicles.map((vehicle) => vehicle.model))].sort();
  const uniqueBodyTypes = [...new Set(vehicles.map((vehicle) => vehicle.bodyType))].sort();
  const uniqueFuels = [...new Set(vehicles.map((vehicle) => vehicle.fuel))].sort();
  const uniqueTransmissions = [...new Set(vehicles.map((vehicle) => vehicle.transmission))].sort();
  const uniqueColors = [...new Set(vehicles.map((vehicle) => vehicle.color))].sort();

  const filteredVehicles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesSearch =
        !term ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.trim.toLowerCase().includes(term) ||
        vehicle.year.toString().includes(term) ||
        vehicle.color.toLowerCase().includes(term);

      const matchesModel = !filters.model || vehicle.model === filters.model;
      const matchesBodyType = !filters.bodyType || vehicle.bodyType === filters.bodyType;
      const matchesFuel = !filters.fuel || vehicle.fuel === filters.fuel;
      const matchesTransmission = !filters.transmission || vehicle.transmission === filters.transmission;
      const matchesColor = !filters.color || vehicle.color === filters.color;
      const matchesPrice = vehicle.price <= filters.priceMax;
      const matchesYear = vehicle.year >= filters.yearMin && vehicle.year <= filters.yearMax;
      const matchesMileage = vehicle.mileage <= filters.mileageMax;

      return (
        matchesSearch &&
        matchesModel &&
        matchesBodyType &&
        matchesFuel &&
        matchesTransmission &&
        matchesColor &&
        matchesPrice &&
        matchesYear &&
        matchesMileage
      );
    });
  }, [filters, searchTerm, vehicles]);

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      model: '',
      bodyType: '',
      fuel: '',
      transmission: '',
      color: '',
      priceMax: priceRange.max,
      yearMin: yearRange.min,
      yearMax: yearRange.max,
      mileageMax: mileageRange.max,
    });
  };

  return (
    <>
      <Helmet>
        <title>Vetura | Auto Salloni BMW</title>
        <meta
          name="description"
          content="Shfletoni veturat e disponueshme në Auto Salloni BMW me filtra të thjeshtë sipas modeli, karrocerisë, karburantit, vitit, kilometrazhit dhe çmimit."
        />
      </Helmet>

      <div className="min-h-screen bg-dark py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-10"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-luxury-accent">
              Cars
            </p>
            <h1 className="mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Current stock
            </h1>
            <p className="max-w-2xl text-base leading-7 text-luxury-text-secondary">
              Përdorni filtrat për të zvogëluar listën sipas modeli, karrocerisë, karburantit, vitit, kilometrazhit ose çmimit.
              Çdo kartë më poshtë tregon veturat aktuale në showroom.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-fit rounded-2xl border border-luxury-border bg-dark-10 p-5"
            >
              <div className="mb-6 flex items-center gap-3">
                <SlidersHorizontal size={18} className="text-luxury-accent" />
                <h2 className="text-lg font-semibold">Filtro veturat</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">Kërko</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-text-secondary" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Model, trim, vit, ngjyrë"
                      className="w-full rounded-xl border border-luxury-border bg-dark px-10 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Model</label>
                  <select
                    value={filters.model}
                    onChange={(event) => handleFilterChange('model', event.target.value)}
                    className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                  >
                    <option value="">Të gjitha modelet</option>
                    {uniqueModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Lloji karrocerisë</label>
                  <select
                    value={filters.bodyType}
                    onChange={(event) => handleFilterChange('bodyType', event.target.value)}
                    className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                  >
                    <option value="">Të gjitha karroceritë</option>
                    {uniqueBodyTypes.map((bodyType) => (
                      <option key={bodyType} value={bodyType}>
                        {bodyType}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Karburanti</label>
                  <select
                    value={filters.fuel}
                    onChange={(event) => handleFilterChange('fuel', event.target.value)}
                    className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                  >
                    <option value="">Të gjitha karburantet</option>
                    {uniqueFuels.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Transmisioni</label>
                  <select
                    value={filters.transmission}
                    onChange={(event) => handleFilterChange('transmission', event.target.value)}
                    className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                  >
                    <option value="">Të gjitha transmisionet</option>
                    {uniqueTransmissions.map((transmission) => (
                      <option key={transmission} value={transmission}>
                        {transmission}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Ngjyra</label>
                  <select
                    value={filters.color}
                    onChange={(event) => handleFilterChange('color', event.target.value)}
                    className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                  >
                    <option value="">Të gjitha ngjyrat</option>
                    {uniqueColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium">Çmimi maksimal</label>
                    <span className="text-sm text-luxury-text-secondary">
                      {formatCurrency(filters.priceMax)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    step="1000"
                    value={filters.priceMax}
                    onChange={(event) => handleFilterChange('priceMax', Number(event.target.value))}
                    className="w-full accent-luxury-accent"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Viti</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min={yearRange.min}
                      max={yearRange.max}
                      value={filters.yearMin}
                      onChange={(event) => handleFilterChange('yearMin', Number(event.target.value))}
                      className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                    />
                    <input
                      type="number"
                      min={yearRange.min}
                      max={yearRange.max}
                      value={filters.yearMax}
                      onChange={(event) => handleFilterChange('yearMax', Number(event.target.value))}
                      className="w-full rounded-xl border border-luxury-border bg-dark px-4 py-3 text-sm text-luxury-text outline-none transition-colors focus:border-luxury-accent"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium">Kilometrazh maksimal</label>
                    <span className="text-sm text-luxury-text-secondary">
                      {formatKilometers(filters.mileageMax)} km
                    </span>
                  </div>
                  <input
                    type="range"
                    min={mileageRange.min}
                    max={mileageRange.max}
                    step="1000"
                    value={filters.mileageMax}
                    onChange={(event) => handleFilterChange('mileageMax', Number(event.target.value))}
                    className="w-full accent-luxury-accent"
                  />
                </div>

                <button type="button" onClick={resetFilters} className="btn-secondary w-full">
                  Pastro filtrat
                </button>
              </div>
            </motion.aside>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-luxury-text-secondary">Rezultatet</p>
                  <h2 className="text-2xl font-semibold">
                    {filteredVehicles.length} veturë{filteredVehicles.length === 1 ? '' : 'a'} të gjetura
                  </h2>
                </div>
                <p className="text-sm text-luxury-text-secondary">
                  Çmimi në stok: {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
                </p>
              </div>

              {filteredVehicles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredVehicles.map((vehicle, index) => (
                    <Link key={vehicle.id} to={`/cars/${vehicle.id}`} className="block group">
                      <motion.article
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="overflow-hidden rounded-2xl border border-luxury-border bg-dark-10 transition-shadow hover:shadow-[0_18px_40px_rgba(17,17,17,0.12)]"
                      >
                        <div className="aspect-[16/10] overflow-hidden bg-dark">
                          <img
                            src={vehicle.images?.[(index % 3) === 0 ? 2 : (index % 3) === 1 ? 0 : 1] || vehicle.image}
                            alt={`${vehicle.model} ${vehicle.trim}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-5">
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold">
                                {vehicle.model} {vehicle.trim}
                              </h3>
                              <p className="mt-1 text-sm text-luxury-text-secondary">
                                {vehicle.year} • {vehicle.bodyType} • {vehicle.color}
                              </p>
                            </div>
                            <p className="text-lg font-semibold text-luxury-accent">
                              {formatCurrency(vehicle.price)}
                            </p>
                          </div>

                          <dl className="grid grid-cols-2 gap-4 border-t border-luxury-border pt-4 text-sm">
                            <div>
                              <dt className="text-luxury-text-secondary">Kilometrazhi</dt>
                              <dd className="mt-1 font-medium text-luxury-text">
                                {formatKilometers(vehicle.mileage)} km
                              </dd>
                            </div>
                            <div>
                              <dt className="text-luxury-text-secondary">Karburanti</dt>
                              <dd className="mt-1 font-medium text-luxury-text">{vehicle.fuel}</dd>
                            </div>
                            <div>
                              <dt className="text-luxury-text-secondary">Transmisioni</dt>
                              <dd className="mt-1 font-medium text-luxury-text">{vehicle.transmission}</dd>
                            </div>
                            <div>
                              <dt className="text-luxury-text-secondary">Motor</dt>
                              <dd className="mt-1 font-medium text-luxury-text">{vehicle.engine}</dd>
                            </div>
                          </dl>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-luxury-border bg-dark-10 p-8 text-center md:p-12">
                  <h3 className="mb-2 text-xl font-semibold">Nuk u gjet asnjë veturë me këto filtra</h3>
                  <p className="mb-6 text-luxury-text-secondary">
                    Zgjero kufirin e çmimit ose pastroni filtrat për të parë të gjithë stokun.
                  </p>
                  <button type="button" onClick={resetFilters} className="btn-primary">
                    Shiko të gjitha veturat
                  </button>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
}