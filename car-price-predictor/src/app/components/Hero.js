import { useState } from 'react';
import { motion } from 'framer-motion';
import { data } from '../data/config';

const Hero = () => {

    const [formData, setFormData] = useState({
        model_year: 2020,
        transmission: 'automatic',
        fuel_type: 'diesel',
        mileage: 50000,
        brand: 'Dacia',
        model: 'Logan',
        number_of_doors: 4,
        origin: 'imported',
        first_owner: true,
        tax_horsepower: 6,
        condition: 'excellent',
        abs: true,
        airbags: true,
        multimedia: true,
        backup_camera: false,
        air_conditioning: true,
        esp: false,
        aluminum_wheels: false,
        speed_limiter: false,
        onboard_computer: true,
        parking_sensors: false,
        cruise_control: false,
        leather_seats: false,
        navigation_gps: false,
        sunroof: false,
        remote_central_locking: true,
        power_windows: true
    });

    const { carBrands, carConditions, fuelType, origin } = data;

    const [predictedPrice, setPredictedPrice] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('MAD'); // Moroccan Dirham is default

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked :
                type === 'number' ? parseFloat(value) : value
        });
    };


    // Currency conversion function
    const convertCurrency = (amount, targetCurrency) => {
        switch (targetCurrency) {
            case 'MAD': // Dirham
                return amount;
            case 'SANTIM':
                return amount * 100; // 1 Dirham = 100 Santim
            case 'RIYAL':
                return amount / 5; // Approximate: 1 Riyal = 5 Dirham
            default:
                return amount;
        }
    };


    const currentYear = new Date().getFullYear();


    const pulseVariants = {
        pulse: {
            scale: [1, 1.02, 1],
            boxShadow: [
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormSubmitted(true);

        try {
            // This would be your API endpoint to predict the price
            // For demo purposes, set a mock predicted price after a delay
            setTimeout(() => {
                setPredictedPrice(Math.floor(Math.random() * 100000) + 50000);
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Error predicting price:', error);
            setIsLoading(false);
        }
    };

    const ResultSection = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center py-16">
                    <motion.div
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-blue-600 font-medium"
                    >
                        Calculating your car value...
                    </motion.p>
                </div>
            );
        }

        if (predictedPrice) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-center py-8"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
                    >
                        {convertCurrency(predictedPrice, selectedCurrency).toLocaleString()} {selectedCurrency}
                    </motion.div>
                    <p className="text-gray-500 mt-2">Estimated market value</p>

                    {/* Currency selector */}
                    <div className="mt-6">
                        <div className="inline-flex items-center border rounded-md overflow-hidden">
                            <button
                                className={`px-4 py-2 text-sm font-medium ${selectedCurrency === 'MAD' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setSelectedCurrency('MAD')}
                            >
                                Dirham (DH)
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium border-l ${selectedCurrency === 'SANTIM' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setSelectedCurrency('SANTIM')}
                            >
                                Santim
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium border-l ${selectedCurrency === 'RIYAL' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setSelectedCurrency('RIYAL')}
                            >
                                Riyal
                            </button>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 border-t pt-6"
                    >
                        <p className="text-sm text-gray-600">
                            This estimation is based on similar vehicles in the Moroccan market.
                            Actual prices may vary based on additional factors.
                        </p>
                    </motion.div>
                </motion.div>
            );
        }

        return (
            <div className="text-center py-16">
                <motion.div
                    animate="pulse"
                    variants={pulseVariants}
                    className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </motion.div>
                <p className="text-gray-500 mt-4">
                    Fill out the form and click &quot;Predict Price&quot; to get an estimated value for your car
                </p>
            </div>
        );
    };


    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    // Tailwind classes for form elements
    const inputClass = "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800";
    const selectClass = "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800";
    const checkboxClass = "mr-2 h-5 w-5 text-blue-500";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const formGroupClass = "mb-4";

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="grid md:grid-cols-5 gap-8 p-8">
            {/* Form Section */}
            <motion.div
                className="md:col-span-3 space-y-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <form onSubmit={handleSubmit}>
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Car Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Brand and Model */}
                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="brand">Brand</label>
                                <select
                                    id="brand"
                                    name="brand"
                                    className={selectClass}
                                    value={formData.brand}
                                    onChange={handleChange}
                                >
                                    {carBrands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="model">Model</label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    className={inputClass}
                                    value={formData.model}
                                    onChange={handleChange}
                                />
                            </motion.div>

                            {/* Year and Mileage */}
                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="model_year">Year</label>
                                <select
                                    id="model_year"
                                    name="model_year"
                                    className={selectClass}
                                    value={formData.model_year}
                                    onChange={handleChange}
                                >
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="mileage">Mileage (km)</label>
                                <input
                                    type="number"
                                    id="mileage"
                                    name="mileage"
                                    className={inputClass}
                                    value={formData.mileage}
                                    onChange={handleChange}
                                />
                            </motion.div>

                            {/* Transmission and Fuel Type */}
                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="transmission">Transmission</label>
                                <select
                                    id="transmission"
                                    name="transmission"
                                    className={selectClass}
                                    value={formData.transmission}
                                    onChange={handleChange}
                                >
                                    <option value="automatic">Automatic</option>
                                    <option value="manual">Manual</option>
                                </select>
                            </motion.div>

                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="fuel_type">Fuel Type</label>
                                <select
                                    id="fuel_type"
                                    name="fuel_type"
                                    className={selectClass}
                                    value={formData.fuel_type}
                                    onChange={handleChange}
                                >
                                    {fuelType.map((currentType, index) => <option key={`fuel-type-${index}`} value={currentType.toLowerCase()}> {currentType.charAt(0).toUpperCase() + currentType.slice(1).toLowerCase()} </option>)}

                                </select>
                            </motion.div>

                            {/* Number of Doors and Tax HP */}
                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="number_of_doors">Number of Doors</label>
                                <select
                                    id="number_of_doors"
                                    name="number_of_doors"
                                    className={selectClass}
                                    value={formData.number_of_doors}
                                    onChange={handleChange}
                                >
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </motion.div>

                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="tax_horsepower">Tax Horsepower</label>
                                <input
                                    type="number"
                                    id="tax_horsepower"
                                    name="tax_horsepower"
                                    className={inputClass}
                                    value={formData.tax_horsepower}
                                    onChange={handleChange}
                                />
                            </motion.div>

                            {/* Origin and Condition */}
                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="origin">Origin</label>
                                <select
                                    id="origin"
                                    name="origin"
                                    className={selectClass}
                                    value={formData.origin}
                                    onChange={handleChange}
                                >
                                    <option value="imported">Imported</option>
                                    <option value="local">Local</option>
                                </select>
                            </motion.div>

                            <motion.div variants={itemVariants} className={formGroupClass}>
                                <label className={labelClass} htmlFor="condition">Condition</label>
                                <select
                                    id="condition"
                                    name="condition"
                                    className={selectClass}
                                    value={formData.condition}
                                    onChange={handleChange}
                                >
                                    {carConditions.map(condition => (
                                        <option key={condition} value={condition}>{condition.charAt(0).toUpperCase() + condition.slice(1)}</option>
                                    ))}
                                </select>
                            </motion.div>
                        </div>

                        {/* First Owner Checkbox */}
                        <motion.div variants={itemVariants} className={formGroupClass + " mt-4"}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="first_owner"
                                    name="first_owner"
                                    className={checkboxClass}
                                    checked={formData.first_owner}
                                    onChange={handleChange}
                                />
                                <label htmlFor="first_owner" className="text-sm text-gray-700">First Owner</label>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Features Section */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6"
                        whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Features</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                'abs', 'airbags', 'multimedia', 'backup_camera', 'air_conditioning', 'esp',
                                'aluminum_wheels', 'speed_limiter', 'onboard_computer', 'parking_sensors',
                                'cruise_control', 'leather_seats', 'navigation_gps', 'sunroof',
                                'remote_central_locking', 'power_windows'
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    className="flex items-center"
                                    variants={itemVariants}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <input
                                        type="checkbox"
                                        id={feature}
                                        name={feature}
                                        className={checkboxClass}
                                        checked={formData[feature]}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={feature} className="text-sm text-gray-700">
                                        {feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </label>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-6"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Predict Price'}
                        </button>
                    </motion.div>
                </form>
            </motion.div>

            {/* Result Section */}
            <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className="sticky top-8">
                    <motion.div
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 h-full"
                        whileHover={{ boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Estimated Price</h2>

                        <ResultSection />

                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="font-medium text-blue-800 mb-2">How it works</h3>
                                <p className="text-sm text-blue-700">
                                    Our AI model analyzes thousands of car listings across Morocco to provide
                                    accurate price predictions based on your vehicle&apos;s specifications and features.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default Hero;
