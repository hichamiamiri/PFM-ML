import { motion } from 'framer-motion';

const Header = () => {

    const FloatingCar = () => {
        return (
            <motion.div
                className="absolute right-6 top-20 w-48 h-28 opacity-70 hidden lg:block"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                <svg viewBox="0 0 640 512" fill="currentColor" className="text-blue-500">
                    <path d="M640 320V368C640 385.7 625.7 400 608 400H574.7C567.1 445.4 527.6 480 480 480C432.4 480 392.9 445.4 385.3 400H254.7C247.1 445.4 207.6 480 160 480C112.4 480 72.9 445.4 65.3 400H32C14.33 400 0 385.7 0 368V256C0 245.4 3.004 235.5 8.497 227.3L32 192L47.13 176.9C53.86 170.1 62.85 168 72 168H120L136 104C142.2 81.58 162.3 65.88 185.6 64.13C186.1 64.09 186.5 64.03 186.9 64H264C287.5 64 307.4 79.78 313.6 104L328 168H400C408.8 168 416 160.8 416 152C416 143.2 408.8 136 400 136H304V104C304 90.75 293.3 80 280 80H232C218.7 80 208 90.75 208 104V136H100.4C91.44 136 82.59 137.1 74.12 140.7L34.41 155.2C28.21 157.3 23.05 161.1 19.39 167.5L0 195.3V120C0 106.7 10.75 96 24 96H96V24C96 10.75 106.7 0 120 0H312C325.3 0 336 10.75 336 24V96H416C444.1 96 467.8 118.1 479.1 144H520C533.3 144 544 154.7 544 168V264C544 277.3 533.3 288 520 288H507.6C507.9 290.6 508 293.3 508 296V320H640zM480 384C497.7 384 512 369.7 512 352C512 334.3 497.7 320 480 320C462.3 320 448 334.3 448 352C448 369.7 462.3 384 480 384zM160 384C177.7 384 192 369.7 192 352C192 334.3 177.7 320 160 320C142.3 320 128 334.3 128 352C128 369.7 142.3 384 160 384zM464 208C437.5 208 416 229.5 416 256C416 282.5 437.5 304 464 304C490.5 304 512 282.5 512 256C512 229.5 490.5 208 464 208z" />
                </svg>
            </motion.div>
        );
    };

    return (
        <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-6 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIyOTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTAgMjkwaDEyMDB2LTI5MHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L3N2Zz4=')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <FloatingCar />
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-bold text-white relative z-10"
                >
                    Moroccan Car Price Predictor
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-2 text-blue-100 relative z-10"
                >
                    Enter your car details to get an estimated market value
                </motion.p>
            </div>
        </>
    );
}

export default Header;
