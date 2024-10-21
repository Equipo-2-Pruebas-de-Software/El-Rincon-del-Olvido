import polera1 from '../assets/ropa/polera.jpg';
import polera2 from '../assets/ropa/polera2.webp';
import polera3 from '../assets/ropa/polera3.webp';
import polera4 from '../assets/ropa/polera4.webp';
import polera5 from '../assets/ropa/polera5.webp';
import polera6 from '../assets/ropa/polera6.webp';
import polera7 from '../assets/ropa/polera7.webp';
import polera8 from '../assets/ropa/polera8.jpg';
import chaqueta1 from '../assets/ropa/chaqueta1.webp';

const productos = [
  {
    id: 1,
    name: 'Estampado Neon',
    description: 'Polera Hombre',
    category: 'men', // Categoría asignada
    price: 990, // Precio como número
    discount: 0.929, // Descuento como número decimal
    originalPrice: 13990, // Precio original como número
    image: polera1,
    availableSizes: ['S', 'M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 2,
    name: 'Splatoon Neon',
    description: 'Polera Hombre',
    category: 'men',
    price: 14990,
    discount: 0.25, // Descuento como número decimal
    originalPrice: 20000,
    image: polera2,
    availableSizes: ['M', 'L', 'XL', 'XXL'], // Tallas disponibles
  },
  {
    id: 3,
    name: 'Dua Lipa Neon',
    description: 'Polera Mujer',
    category: 'women',
    price: 11719,
    discount: 0.178, // Descuento como número decimal
    originalPrice: 14249,
    image: polera3,
    availableSizes: ['S', 'M', 'L'], // Tallas disponibles
  },
  {
    id: 4,
    name: 'Skull Neon',
    description: 'Polera Hombre',
    category: 'men',
    price: 14990,
    discount: 0.25, // Descuento como número decimal
    originalPrice: 20000,
    image: polera4,
    availableSizes: ['M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 5,
    name: 'Daft Punk',
    description: 'Polera Mujer',
    category: 'women',
    price: 14990,
    discount: 0.25, // Descuento como número decimal
    originalPrice: 20000,
    image: polera5,
    availableSizes: ['S', 'M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 6,
    name: 'Simbolo Neon',
    description: 'Polera Mujer',
    category: 'women',
    price: 11719,
    discount: 0.178, // Descuento como número decimal
    originalPrice: 14249,
    image: polera6,
    availableSizes: ['S', 'M'], // Tallas disponibles
  },
  {
    id: 7,
    name: 'Splatoon Neon',
    description: 'Polera Mujer',
    category: 'women',
    price: 14990,
    discount: 0.25, // Descuento como número decimal
    originalPrice: 20000,
    image: polera7,
    availableSizes: ['M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 8,
    name: 'Kraken Neon',
    description: 'Polera Hombre',
    category: 'men',
    price: 14990,
    discount: 0.25, // Descuento como número decimal
    originalPrice: 20000,
    image: polera8,
    availableSizes: ['M', 'L', 'XL', 'XXL'], // Tallas disponibles
  },
  {
    id: 9,
    name: 'Chaqueta Cyberpunk',
    description: 'Chaqueta Hombre',
    category: 'men',
    price: 25385,
    discount: 0.12, // Descuento como número decimal
    originalPrice: 29103,
    image: chaqueta1,
    availableSizes: ['M', 'L', 'XL', 'XXL'], // Tallas disponibles
  },
];

export default productos;
