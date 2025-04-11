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
    className="mb-8 flex items-start p-6 bg-background/50 hover:bg-background/80 transition-colors duration-300 border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-md"
  >
    <div className="mr-4 mt-1.5 p-3 rounded-full mb-3 md:mb-4 bg-primary text-primary-foreground">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const ScalableFoundation: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Professional tools.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
        >
          Free for everyone.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
        >
          Elevate your career with our comprehensive, user-friendly platform. We
          provide cutting-edge tools to showcase your unique talents and
          experiences, all at absolutely no cost.
        </motion.p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        <Feature
          title="Customizable Templates"
          description="Select from our curated collection of ATS-optimized templates, designed to captivate employers across diverse industries and roles."
          icon={<LayoutTemplate className="w-6 h-6" />}
        />
        <Feature
          title="Intuitive Content Editing"
          description="Our sleek interface empowers you to effortlessly craft, refine, and structure your resume content, ensuring your professional narrative shines."
          icon={<Pencil className="w-6 h-6" />}
        />
        <Feature
          title="Real-time Preview"
          description="Witness your resume transform instantly with our dynamic preview feature, allowing you to perfect every detail as you build your professional masterpiece."
          icon={<Eye className="w-6 h-6" />}
        />
        <Feature
          title="Versatile Export Options"
          description="Download your polished resume in multiple industry-standard formats, including PDF and DOCX, to meet diverse application requirements and showcase your professionalism."
          icon={<Download className="w-6 h-6" />}
        />
      </div>
    </section>
  );
};

export default ScalableFoundation;
