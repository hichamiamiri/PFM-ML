import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="my-8 text-center text-gray-500 text-sm"
            >
                © {new Date().getFullYear()} Moroccan Car Price Predictor |
                Built with ❤️ by <a className='underline' href="https://www.linkedin.com/in/hicham-iamiri/" target="_blank" >Hicham </a> 
                And <a className='underline' href="https://www.linkedin.com/in/anass-bouras-0b0361285/" target="_blank">Anass</a>
            </motion.div>
        </>
    );
}

export default Footer;
