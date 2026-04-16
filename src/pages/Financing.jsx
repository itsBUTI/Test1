import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { DollarSign, TrendingUp, Clock, Shield, Zap, CheckCircle, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AnimatedNumber from '../components/AnimatedNumber';

export default function Financing() {
  const { addInquiry } = useAppContext();
  const [calculator, setCalculator] = useState({
    carPrice: 50000,
    downPayment: 10000,
    interestRate: 6.5,
    loanTerm: 60,
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    monthlyIncome: '',
  });

  const monthlyPayment = calculator.carPrice > 0 ? Math.round(
    ((calculator.carPrice - calculator.downPayment) * (calculator.interestRate / 100 / 12) * Math.pow(1 + calculator.interestRate / 100 / 12, calculator.loanTerm)) /
    (Math.pow(1 + calculator.interestRate / 100 / 12, calculator.loanTerm) - 1)
  ) : 0;

  const totalAmount = monthlyPayment * calculator.loanTerm;
  const totalInterest = totalAmount - (calculator.carPrice - calculator.downPayment);

  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    setCalculator(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    addInquiry({
      ...formData,
      type: 'financing_application',
      carPrice: calculator.carPrice,
      monthlyPayment,
      timestamp: new Date(),
    });
    alert('Application submitted! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', monthlyIncome: '' });
  };

  return (
    <>
      <Helmet>
        <title>Financing Options - BMW AutoSallon</title>
        <meta name="description" content="Flexible financing options for your BMW purchase. Get pre-approved today." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-dark py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-hero mb-4">Flexible Financing Solutions</h1>
            <p className="text-body-xl text-luxury-text-secondary max-w-2xl">
              Drive home in your premium BMW with our competitive financing plans. Quick approvals, transparent terms.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-dark min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { icon: <DollarSign size={28} />, title: 'Competitive Rates', desc: 'Lowest APR available' },
              { icon: <Clock size={28} />, title: 'Instant Approval', desc: 'Approved in minutes' },
              { icon: <TrendingUp size={28} />, title: 'Flexible Terms', desc: '24-84 month options' },
              { icon: <Shield size={28} />, title: 'Secure Process', desc: 'Safe & transparent' },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-luxury text-center group"
              >
                <div className="text-luxury-accent mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-headline-3 mb-2">{benefit.title}</h3>
                <p className="text-body-sm text-luxury-text-secondary">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Calculator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Input Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-luxury-lg group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-luxury-accent" />
                  <label className="text-body-sm font-medium">Vehicle Price</label>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-luxury-accent">
                    <AnimatedNumber value={calculator.carPrice} prefix="$" decimals={0} />
                  </span>
                </div>

                {/* Price Slider */}
                <input
                  type="range"
                  name="carPrice"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={calculator.carPrice}
                  onChange={handleCalculatorChange}
                  className="w-full h-2 bg-dark-10 rounded-lg appearance-none cursor-pointer accent-luxury-accent hover:accent-blue-400 transition-colors"
                />

                {/* Quick Select Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[25000, 50000, 75000, 100000].map(price => (
                    <motion.button
                      key={price}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCalculator(prev => ({...prev, carPrice: price}))}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
                        calculator.carPrice === price
                          ? 'bg-luxury-accent/20 border-luxury-accent text-luxury-accent'
                          : 'border-luxury-border text-luxury-text-secondary hover:border-luxury-accent'
                      }`}
                    >
                      ${(price / 1000).toFixed(0)}K
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-luxury-lg group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-luxury-accent" />
                  <label className="text-body-sm font-medium">Down Payment</label>
                </div>

                {/* Down Payment Display */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-luxury-accent">
                    <AnimatedNumber value={calculator.downPayment} prefix="$" decimals={0} />
                  </span>
                  <span className="text-body-sm text-luxury-text-secondary">
                    ({((calculator.downPayment / calculator.carPrice) * 100).toFixed(1)}%)
                  </span>
                </div>

                {/* Down Payment Slider */}
                <input
                  type="range"
                  name="downPayment"
                  min="0"
                  max={Math.min(calculator.carPrice, 100000)}
                  step="1000"
                  value={calculator.downPayment}
                  onChange={handleCalculatorChange}
                  className="w-full h-2 bg-dark-10 rounded-lg appearance-none cursor-pointer accent-luxury-accent hover:accent-blue-400 transition-colors"
                />

                {/* Quick Percentages */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[10, 20, 30, 40].map(percent => (
                    <motion.button
                      key={percent}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCalculator(prev => ({...prev, downPayment: (prev.carPrice * percent) / 100}))}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
                        Math.round((calculator.downPayment / calculator.carPrice) * 100) === percent
                          ? 'bg-luxury-accent/20 border-luxury-accent text-luxury-accent'
                          : 'border-luxury-border text-luxury-text-secondary hover:border-luxury-accent'
                      }`}
                    >
                      {percent}%
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-luxury-lg group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={18} className="text-luxury-accent" />
                  <label className="text-body-sm font-medium">Loan Term</label>
                </div>

                {/* Term Display */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-luxury-accent">
                    <AnimatedNumber value={calculator.loanTerm} decimals={0} />
                  </span>
                  <span className="text-body-sm text-luxury-text-secondary">months</span>
                </div>

                {/* Term Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[24, 36, 48, 60, 72, 84].map(term => (
                    <motion.button
                      key={term}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCalculator(prev => ({...prev, loanTerm: term}))}
                      className={`py-2 rounded-lg font-medium text-sm transition-all ${
                        calculator.loanTerm === term
                          ? 'bg-luxury-accent text-dark shadow-lg shadow-luxury-accent/30'
                          : 'border border-luxury-border text-luxury-text-secondary hover:border-luxury-accent hover:bg-dark-10'
                      }`}
                    >
                      {term}m
                    </motion.button>
                  ))}
                </div>

                {/* Interest Rate Control */}
                <div className="mt-4 pt-4 border-t border-luxury-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-caption text-luxury-text-secondary">Interest Rate</span>
                    <span className="text-body font-medium text-luxury-accent">
                      <AnimatedNumber value={calculator.interestRate} suffix="%" decimals={2} />
                    </span>
                  </div>
                  <input
                    type="range"
                    name="interestRate"
                    min="2"
                    max="12"
                    step="0.1"
                    value={calculator.interestRate}
                    onChange={handleCalculatorChange}
                    className="w-full h-1 bg-dark-10 rounded-lg appearance-none cursor-pointer accent-luxury-accent/60"
                  />
                </div>
              </motion.div>
            </div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-luxury-lg bg-dark border border-luxury-border"
            >
              <div className="grid md:grid-cols-4 gap-8">
                {/* Monthly Payment */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="text-center"
                >
                  <p className="text-caption text-luxury-text-secondary mb-2 uppercase tracking-wider">Monthly Payment</p>
                  <motion.div
                    key={monthlyPayment}
                    className="text-5xl md:text-6xl font-bold text-luxury-accent mb-1"
                  >
                    <AnimatedNumber value={monthlyPayment} prefix="$" decimals={0} />
                  </motion.div>
                  <p className="text-body-sm text-luxury-text-secondary">per month</p>
                </motion.div>

                {/* Loan Amount */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="text-center border-l border-luxury-border/30"
                >
                  <p className="text-caption text-luxury-text-secondary mb-2 uppercase tracking-wider">Loan Amount</p>
                  <motion.div
                    key={calculator.carPrice - calculator.downPayment}
                    className="text-3xl font-bold text-luxury-text"
                  >
                    <AnimatedNumber value={calculator.carPrice - calculator.downPayment} prefix="$" decimals={0} />
                  </motion.div>
                  <p className="text-body-sm text-luxury-text-secondary mt-1">over {calculator.loanTerm} months</p>
                </motion.div>

                {/* Total Interest */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="text-center border-l border-luxury-border/30"
                >
                  <p className="text-caption text-luxury-text-secondary mb-2 uppercase tracking-wider">Total Interest</p>
                  <motion.div
                    key={totalInterest}
                    className="text-3xl font-bold text-luxury-text"
                  >
                    <AnimatedNumber value={totalInterest} prefix="$" decimals={0} />
                  </motion.div>
                  <p className="text-body-sm text-luxury-text-secondary mt-1">cost of financing</p>
                </motion.div>

                {/* Total Amount */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="text-center border-l border-luxury-border/30"
                >
                  <p className="text-caption text-luxury-text-secondary mb-2 uppercase tracking-wider">Total Amount</p>
                  <motion.div
                    key={totalAmount}
                    className="text-3xl font-bold text-luxury-accent"
                  >
                    <AnimatedNumber value={totalAmount} prefix="$" decimals={0} />
                  </motion.div>
                  <p className="text-body-sm text-luxury-text-secondary mt-1">you will pay</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: <Shield size={20} />, title: '100% Transparent', desc: 'No hidden fees' },
                { icon: <Award size={20} />, title: 'Best Rates', desc: 'Competitive APR' },
                { icon: <CheckCircle size={20} />, title: 'Instant Approval', desc: 'Quick & secure' },
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-dark-10 border border-luxury-border/30 hover:border-luxury-accent/50 transition-colors"
                >
                  <div className="text-luxury-accent flex-shrink-0">{badge.icon}</div>
                  <div>
                    <p className="text-body-sm font-medium">{badge.title}</p>
                    <p className="text-caption text-luxury-text-secondary">{badge.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full mt-8 py-4 text-lg"
            >
              Get Pre-Approved Now
            </motion.button>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="card-luxury-lg max-w-2xl mx-auto"
          >
            <h2 className="text-headline-2 mb-8">Apply for Financing</h2>

            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="text-body font-medium mb-2 block">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-body font-medium mb-2 block">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-body font-medium mb-2 block">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="+1 (234) 567-8900"
                  className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-body font-medium mb-2 block">Monthly Income (Optional)</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleFormChange}
                  placeholder="$5,000"
                  className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                />
              </div>

              <button type="submit" className="btn-primary w-full mt-8">
                Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
