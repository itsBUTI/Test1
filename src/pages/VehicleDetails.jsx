import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Heart,
  Zap,
  Shield,
  Gauge,
  Fuel,
  Cog,
  MapPin,
  Wrench,
  CheckCircle,
  Camera,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SpecCard = ({ icon: Icon, label, value }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="group p-4 md:p-5 rounded-xl bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 hover:border-luxury-accent/30 transition-all duration-300"
  >
    <div className="flex items-start gap-3">
      <div className="p-2.5 rounded-lg bg-luxury-accent/10 group-hover:bg-luxury-accent/20 transition-colors">
        <Icon size={20} className="text-luxury-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">{label}</p>
        <p className="text-sm md:text-base font-semibold text-white mt-1 break-words">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles, addInquiry } = useAppContext();
  const vehicle = vehicles.find(v => v.id === parseInt(id));

  const formatPrice = (value) =>
    new Intl.NumberFormat('sq-AL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const galleryRef = useRef(null);
  const contentRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-luxury-text mb-4">Veturë nuk u gjet</h1>
          <Link to="/cars" className="btn-primary">
            <ChevronLeft size={18} /> Kthehu te Veturat
          </Link>
        </div>
      </div>
    );
  }

  // Scroll detection for sticky CTA bar
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const elementTop = contentRef.current.getBoundingClientRect().top;
        setShowStickyBar(elementTop < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Swipe gesture handlers
  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? vehicle.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === vehicle.images.length - 1 ? 0 : prev + 1));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addInquiry({
      ...formData,
      vehicleId: vehicle.id,
      vehicleModel: vehicle.model,
      timestamp: new Date(),
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert('Inquiry sent successfully!');
  };

  return (
    <>
      <Helmet>
        <title>{`${vehicle.model} ${vehicle.year} | ${vehicle.trim} - BMW AutoSallon`}</title>
        <meta
          name="description"
          content={`Check out this ${vehicle.year} ${vehicle.model} ${vehicle.trim}. ${vehicle.description}`}
        />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        {/* Header Navigation */}
        <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-300 hover:text-luxury-accent transition-colors font-medium"
            >
              <ChevronLeft size={20} /> Kthehu
            </motion.button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left Section - Image Gallery & Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div
                  ref={galleryRef}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden group bg-black "
                >
                  <motion.img
                    key={selectedImage}
                    src={vehicle.images[selectedImage]}
                    alt={`${vehicle.model} view ${selectedImage + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-700/60 backdrop-blur-md hover:bg-slate-600/80 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 border border-slate-600/40"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-700/60 backdrop-blur-md hover:bg-slate-600/80 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 border border-slate-600/40"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-sm font-medium border border-slate-600/30">
                    {selectedImage + 1} / {vehicle.images.length}
                  </div>

                  {/* Featured Badge */}
                  {vehicle.featured && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-4 px-4 py-2 bg-red-600 rounded-full text-white text-sm font-bold backdrop-blur-md border border-red-500/30"
                    >
                      ⭐ FRESHTUAR
                    </motion.div>
                  )}

                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-slate-700/60 backdrop-blur-md hover:bg-slate-600/80 text-white flex items-center justify-center transition-all duration-300 border border-slate-600/40"
                  >
                    <Heart
                      size={24}
                      className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                    />
                  </motion.button>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
                  {vehicle.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === idx
                          ? 'border-luxury-accent ring-2 ring-luxury-accent/50'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tabs Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden"
              >
                <div className="flex border-b border-slate-700 overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Përshkrim' },
                    { id: 'features', label: 'Karakteristikat' },
                    { id: 'specifications', label: 'Specifikazimet' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                        activeTab === tab.id
                          ? 'text-luxury-accent border-luxury-accent'
                          : 'text-slate-300 border-transparent hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6 md:p-8 min-h-96">
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Rreth këtij {vehicle.bodyType}</h3>
                        <p className="text-white/70 leading-relaxed text-base">
                          {vehicle.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          <CheckCircle size={20} className="text-luxury-accent" /> Gjendja e Veturës
                        </h4>
                        <ul className="space-y-3 ml-7">
                          <li className="flex items-center gap-3 text-white/70">
                            <span className="w-2 h-2 bg-luxury-accent rounded-full flex-shrink-0"></span>
                            Inspektuar me kujdes dhe certifikuar
                          </li>
                          <li className="flex items-center gap-3 text-white/70">
                            <span className="w-2 h-2 bg-luxury-accent rounded-full flex-shrink-0"></span>
                            Histori e plotë dhe e pastër e makinës
                          </li>
                          <li className="flex items-center gap-3 text-white/70">
                            <span className="w-2 h-2 bg-luxury-accent rounded-full flex-shrink-0"></span>
                            Garanci e disponueshme në kërkesë
                          </li>
                          <li className="flex items-center gap-3 text-white/70">
                            <span className="w-2 h-2 bg-luxury-accent rounded-full flex-shrink-0"></span>
                            Servis i kompletuar dhe i dokumentuar
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'features' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {vehicle.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ x: 8 }}
                            className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-luxury-accent/50 transition-all"
                          >
                            <div className="w-2 h-2 bg-luxury-accent rounded-full flex-shrink-0"></div>
                            <span className="text-white/80 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'specifications' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid md:grid-cols-2 gap-6"
                    >
                      <SpecCard icon={Cog} label="Motor" value={vehicle.engine} />
                      <SpecCard icon={Gauge} label="Transmetim" value={vehicle.transmission} />
                      <SpecCard icon={Fuel} label="Karburant" value={vehicle.fuel} />
                      <SpecCard icon={Camera} label="Ngjyrë" value={vehicle.color} />
                      <SpecCard icon={MapPin} label="Kilometrazhi" value={`${vehicle.mileage.toLocaleString()} km`} />
                      <SpecCard icon={Wrench} label="VIN" value={vehicle.vin} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6 h-fit sticky top-32"
            >
              {/* Price Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-slate-800 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8"
              >
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Çmim</p>
                <h2 className="text-4xl md:text-5xl font-black text-luxury-accent mb-2">
                  {formatPrice(vehicle.price)}
                </h2>
                <p className="text-slate-500 text-sm">Kërkesë konkurrente</p>

                {/* Quick Info Grid */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Viti</span>
                    <span className="text-white font-semibold text-lg">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Kilometrazhi</span>
                    <span className="text-white font-semibold text-lg">{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Lloji</span>
                    <span className="text-white font-semibold text-lg">{vehicle.bodyType}</span>
                  </div>
                </div>
              </motion.div>

              {/* Status Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
                  <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                  <span className="text-green-300 font-semibold text-sm">Inspektuar &amp; Certifikuar</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl backdrop-blur-sm">
                  <Shield size={20} className="text-blue-400 flex-shrink-0" />
                  <span className="text-blue-300 font-semibold text-sm">Garanci e Disponueshme</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <Link
                  to="/contact"
                  className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 py-4"
                >
                  <Phone size={20} /> Kontaktoni
                </Link>
                <a
                  href="tel:+38344316881"
                  className="btn-secondary w-full text-center inline-flex items-center justify-center gap-2 py-4"
                >
                  <Phone size={20} /> Telefononi
                </a>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleFormSubmit}
                className="bg-slate-800 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 space-y-4"
              >
                <h3 className="text-xl font-bold text-white">Pyesni për këtë veturë</h3>
                <input
                  type="text"
                  placeholder="Emri i plotë"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:border-luxury-accent outline-none transition-colors backdrop-blur-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:border-luxury-accent outline-none transition-colors backdrop-blur-sm"
                />
                <input
                  type="tel"
                  placeholder="Numri i telefonit"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:border-luxury-accent outline-none transition-colors backdrop-blur-sm"
                />
                <button type="submit" className="btn-primary w-full py-3">
                  Dërgo Pyetje
                </button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={showStickyBar ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-700 bg-slate-900/95 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/contact"
              className="btn-primary text-center inline-flex items-center justify-center gap-2 py-3 text-sm md:text-base"
            >
              <Phone size={18} /> Kontaktoni
            </Link>
            <a
              href="tel:+38344316881"
              className="btn-secondary text-center inline-flex items-center justify-center gap-2 py-3 text-sm md:text-base"
            >
              <Phone size={18} /> Telefononi
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
