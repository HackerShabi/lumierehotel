import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const galleryImages = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/676583794.jpg?k=f735c3663f8bc751573859ddf1d2d320ded17844cb363196d88b77025a16a986&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164630.jpg?k=89b8ed1e1ad540334f042e1ac3fcc96e4444ce95ed3c729b3d96298f81661abc&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164608.jpg?k=0799602a2f5edb17df11e99ade099b713e76a5b6a9e24214d2fa975b1e80feed&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164671.jpg?k=829a3584942af25911957e20daa253f2ad4efeed1bdfff442aa24cae2cd5617e&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164596.jpg?k=f2af92b3d42b376ea5ec2a224f9607214b7d15fa328cd95880e326a4dfd36b63&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164645.jpg?k=f08d89fabeeffb4b5ea69f75e7fe2b3778caa9050eca6c4a5594f616ef749abe&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164543.jpg?k=293259b10e954ad0ee56429432b84589f617ba754c43f4771c1b710ab1f1cb57&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164664.jpg?k=4811444de2293573fe8fa0021a2a5cf062a988fc3cf7c78c8025216246175cb1&o='
  ];

  return (
    <section className="py-16 bg-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Hotel Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our beautiful spaces and amenities through our photo gallery
          </p>
        </div>
        
        {/* Featured Image */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <Image
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/674164600.jpg?k=763f895e9bc4dfac0d16c0fcb3d0ebd7321936df00d5f8375f9c40a5e2e0ef42&o="
              alt="Lumiere Hotel Featured View"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Lumiere Hotel Experience</h3>
              <p className="text-lg opacity-90">Luxury and comfort in the heart of Islamabad</p>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized={true}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;