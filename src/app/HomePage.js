// pages/index.js
'use client'
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from "./components/Footer"

export default function Home() {

  const ParticlesBackground = () => {
    const particles = useMemo(() => Array.from({ length: 50 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 2,
      duration: Math.random() * 20 + 10
    })), []);

    return (
      <div className="absolute inset-0 overflow-hidden -z-10 opacity-30">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-300 to-indigo-300"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0.1,
              scale: 0.1
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 10) % 100}%`],
              y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: particle.size,
              height: particle.size
            }}
          />
        ))}
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Head>
        <title>Moroccan Car Price Predictor</title>
        <meta name="description" content="Predict car prices in Morocco" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ParticlesBackground />

      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-xl overflow-hidden"
        >
          <Header />

          <Hero />
        </motion.div>

        <Footer />
      </div>
    </div>
  );
}