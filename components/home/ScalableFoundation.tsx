import React from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, Pencil, Eye, Download } from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.4 }}
    className="mb-6 sm:mb-8 flex items-start p-4 sm:p-6 bg-background/50 hover:bg-background/80 transition-colors duration-300 border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-md"
  >
    <div className="mr-3 sm:mr-4 mt-1 p-2 sm:p-3 rounded-full bg-primary text-primary-foreground">
      {icon}
    </div>
    <div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const ScalableFoundation: React.FC = () => {
  return (
    <section className="relative  px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 md:mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Professional tools.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8"
        >
          Free for everyone.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto px-4"
        >
          Elevate your career with our comprehensive, user-friendly platform. We
          provide cutting-edge tools to showcase your unique talents and
          experiences, all at absolutely no cost.
        </motion.p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <Feature
          title="Customizable Templates"
          description="Select from our curated collection of ATS-optimized templates, designed to captivate employers across diverse industries and roles."
          icon={<LayoutTemplate className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
        />
        <Feature
          title="Intuitive Content Editing"
          description="Our sleek interface empowers you to effortlessly craft, refine, and structure your resume content, ensuring your professional narrative shines."
          icon={<Pencil className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
        />
        <Feature
          title="Real-time Preview"
          description="Witness your resume transform instantly with our dynamic preview feature, allowing you to perfect every detail as you build your professional masterpiece."
          icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
        />
        <Feature
          title="Versatile Export Options"
          description="Download your polished resume in multiple industry-standard formats, including PDF and DOCX, to meet diverse application requirements and showcase your professionalism."
          icon={<Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
        />
      </div>
    </section>
  );
};

export default ScalableFoundation;
