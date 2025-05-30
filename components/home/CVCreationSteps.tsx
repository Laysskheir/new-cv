import { Book, Database, Download, Pencil } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export function CVCreationSteps() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-7xl container px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-20"></div>
      <div className="relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-full mb-3 sm:mb-4 md:mb-6 bg-primary text-primary-foreground transition-transform duration-200"
        >
          ⚡ How it works
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4"
        >
          Create Your Professional CV
          <br className="hidden md:inline" />
          <p className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 text-muted-foreground">
            in Simple Steps
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 sm:mb-8 md:mb-12 max-w-2xl text-xs sm:text-sm md:text-base"
        >
          Our user-friendly platform guides you through the process of creating
          a standout CV, empowering you to showcase your best self to potential
          employers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {[
            {
              icon: <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />,
              title: "Choose Template",
              description:
                "Select from a variety of professional templates tailored for different industries.",
            },
            {
              icon: <Book className="w-4 h-4 sm:w-5 sm:h-5" />,
              title: "Customize Design",
              description:
                "Personalize colors, fonts, and layout to match your style and industry standards.",
            },
            {
              icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
              title: "Add Information",
              description:
                "Input your details, experience, and skills with our guided sections.",
            },
            {
              icon: <Download className="w-4 h-4 sm:w-5 sm:h-5" />,
              title: "Download CV",
              description:
                "Get your polished CV in multiple formats, ready to impress employers.",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-start p-3 sm:p-4 rounded-lg shadow-lg bg-background/50 hover:bg-background/80 transition-colors duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                className="p-2 sm:p-3 rounded-full mb-2 sm:mb-3 md:mb-4 bg-primary text-primary-foreground"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-dotted-pattern opacity-20 pointer-events-none" />
    </motion.div>
  );
}
