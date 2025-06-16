"use client";
import { Card } from "../ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Details: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className=" flex items-center justify-center lg:container xl:!max-w-none">
      <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Text Section */}
        <motion.div
          ref={ref}
          className="flex-1 space-y-6 text-center md:text-left max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Professional CVs, <br className="hidden md:block" /> created
            effortlessly.
          </h1>
          <p className="text-base text-muted-foreground">
            Our user-friendly platform guides you through the process of
            creating a standout CV, empowering you to showcase your best self to
            potential employers.
          </p>
        </motion.div>

        {/* Image Section */}
        <div className="relative flex justify-center md:justify-end w-full md:w-1/2 max-w-2xl">
          <motion.div
            className="w-full max-w-xs md:max-w-md lg:max-w-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://www.fey.com/marketing/_next/static/media/newsletter-desktop-1_2x.8e1be62e.png"
                alt="Main image"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </Card>
          </motion.div>
          <motion.div
            className="absolute -bottom-16 -right-8 md:-right-16 w-full max-w-xs md:max-w-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Card className="overflow-hidden rounded-[2.5rem] shadow-lg">
              <Image
                src="https://www.fey.com/marketing/_next/static/media/newsletter-desktop-2_2x.31b9e14e.png"
                alt="Secondary image"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Details;
