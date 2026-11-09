import React from 'react';
import { Link } from 'react-router-dom';
import aboutVideo from '../assets/ocean.mp4'; 

const About = () => {
  return (
    // Applied the font to the entire page here
    <div className="w-full bg-[#FAF9F6] dark:bg-gray-900 text-[#2C3E35] dark:text-gray-100 font-['Times_New_Roman',_Times,_serif] min-h-screen">
      
      {/* 1. FULL-SCREEN CINEMATIC HERO (Video + Text merged) */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        
        {/* The Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={aboutVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* The Dark Transparent Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40"></div>

        {/* The Text sitting ON TOP of the video */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto w-full">
          <span className="text-xs font-bold text-[#A3B18A] uppercase tracking-widest mb-4 block drop-shadow-md">
            Our Philosophy
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            The quietest form of self-care.
          </h1>
          <p className="text-white/90 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Focus Machine is a continuous, self-paced visual training tool designed to help you bring your attention back to the present moment. It’s not a medical treatment—it’s simply a calm, honest space to notice your mind and train your focus. 
          </p>
        </div>
      </section>

      {/* 2. CONTENT GRID */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Column: The Mission & Target Users */}
        <div className="flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#2C3E35] dark:text-white">Why we built this</h2>
            <p className="text-[#607367] dark:text-gray-400 leading-relaxed mb-4 text-lg">
              The app is designed for people experiencing depression, anxiety, pressure, fear, and stress-related physical tension. It combines a cognitive training task with simple self-monitoring of internal state so you can observe change over time.
            </p>
            <p className="text-[#607367] dark:text-gray-400 leading-relaxed font-bold text-lg">
              Our core promise: A calm, focused practice tool that trains attentional control and gives honest feedback — never a medical treatment.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#2C3E35] dark:text-white">Who it's for</h2>
            <ul className="space-y-3 text-[#607367] dark:text-gray-400 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-[#4A7C59] dark:text-[#A3B18A] mt-1">•</span>
                <span>Adults and older adolescents experiencing mild-to-moderate anxiety, low mood, pressure, or scattered attention.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A7C59] dark:text-[#A3B18A] mt-1">•</span>
                <span>Psychology students and anyone interested in training attentional control.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A7C59] dark:text-[#A3B18A] mt-1">•</span>
                <span>University counselling and student wellness programmes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A7C59] dark:text-[#A3B18A] mt-1">•</span>
                <span>People looking for a short daily practice to support focus and emotional regulation.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Core Design Principles */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#2C3E35] dark:text-white">Our Design Principles</h2>
          <div className="flex flex-col gap-6">
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#E2DFD5] dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-xl text-[#4A7C59] dark:text-[#A3B18A] mb-2">No forced time limit</h3>
              <p className="text-[#607367] dark:text-gray-400">You are encouraged to practise at least 7 minutes per day, but the session is completely self-paced. There are no hard cutoffs.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#E2DFD5] dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-xl text-[#4A7C59] dark:text-[#A3B18A] mb-2">Calm, low-stimulation interface</h3>
              <p className="text-[#607367] dark:text-gray-400">Never arcade-like or high-arousal. We use soft sage greens, warm greys, and minimal animations.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#E2DFD5] dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-xl text-[#4A7C59] dark:text-[#A3B18A] mb-2">Honest, non-shaming feedback</h3>
              <p className="text-[#607367] dark:text-gray-400">We measure your focus accurately, but we never use aggressive streaks, leaderboards, or pressure language.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#E2DFD5] dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-xl text-[#4A7C59] dark:text-[#A3B18A] mb-2">Local-first privacy</h3>
              <p className="text-[#607367] dark:text-gray-400">For Version 1, your data is stored locally on your device. No forced account creation. Cloud sync is optional later.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MANDATORY SAFETY DISCLAIMER */}
      <section className="bg-[#E8F0EA] dark:bg-gray-800 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-4xl mb-6 block">🛡️</span>
          <h2 className="text-4xl font-bold mb-6 text-[#2C3E35] dark:text-white">A Gentle Reminder</h2>
          <p className="text-[#607367] dark:text-gray-400 leading-relaxed mb-10 text-xl max-w-2xl mx-auto">
            Focus Machine is a training tool to practise attention and self-monitoring. It does <strong>not</strong> diagnose, treat, or cure depression, anxiety, high blood pressure, or any medical or psychological condition. If you are in significant distress or crisis, please contact a qualified professional or local emergency services.
          </p>
          <Link to="/safety" className="inline-block bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-4 px-10 rounded-full shadow-sm transition-all text-base">
            View Crisis Resources
          </Link>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      {/* Added a top border and a solid background to create a distinct visual break */}
      <section className="py-24 text-center px-6 bg-white dark:bg-gray-900 border-t border-[#E2DFD5] dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-[#2C3E35] dark:text-white">Ready to try it?</h2>
          <p className="text-[#607367] dark:text-gray-400 mb-10 max-w-lg mx-auto text-xl">
            Take a few minutes today to build a calmer, more focused you.
          </p>
          <Link to="/checkin" className="inline-block bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-4 px-12 rounded-full shadow-md transition-all hover:-translate-y-0.5 text-lg">
            Start a Session
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;