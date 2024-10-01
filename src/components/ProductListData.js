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
    nombre: 'Estampado Neon',
    descripcion: 'Polera Hombre',
    categoria: 'men', // Categoría asignada
    precio: 990, // Precio como número
    descuento: '92.9%',
    precioOriginal: 13990, // Precio original como número
    imagen: polera1,
    tallas: ['S', 'M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 2,
    nombre: 'Splatoon Neon',
    descripcion: 'Polera Hombre',
    categoria: 'men',
    precio: 14990,
    descuento: '25%',
    precioOriginal: 20000,
    imagen: polera2,
    tallas: ['M', 'L', 'XL', 'XXL'], // Tallas disponibles
  },
  {
    id: 3,
    nombre: 'Dua Lipa Neon',
    descripcion: 'Polera Mujer',
    categoria: 'women',
    precio: 11719,
    descuento: '17.8%',
    precioOriginal: 14249,
    imagen: polera3,
    tallas: ['S', 'M', 'L'], // Tallas disponibles
  },
  {
    id: 4,
    nombre: 'Skull Neon',
    descripcion: 'Polera Hombre',
    categoria: 'men',
    precio: 14990,
    descuento: '25%',
    precioOriginal: 20000,
    imagen: polera4,
    tallas: ['M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 5,
    nombre: 'Daft Punk',
    descripcion: 'Polera Mujer',
    categoria: 'women',
    precio: 14990,
    descuento: '25%',
    precioOriginal: 20000,
    imagen: polera5,
    tallas: ['S', 'M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 6,
    nombre: 'Simbolo Neon',
    descripcion: 'Polera Mujer',
    categoria: 'women',
    precio: 11719,
    descuento: '17.8%',
    precioOriginal: 14249,
    imagen: polera6,
    tallas: ['S', 'M'], // Tallas disponibles
  },
  {
    id: 7,
    nombre: 'Splatoon Neon',
    descripcion: 'Polera Mujer',
    categoria: 'women',
    precio: 14990,
    descuento: '25%',
    precioOriginal: 20000,
    imagen: polera7,
    tallas: ['M', 'L', 'XL'], // Tallas disponibles
  },
  {
    id: 8,
    nombre: 'Kraken Neon',
    descripcion: 'Polera Hombre',
    categoria: 'men',
    precio: 14990,
    descuento: '25%',
    precioOriginal: 20000,
    imagen: polera8,
    tallas: ['M', 'L', 'XL', 'XXL'], // Tallas disponibles
  },
  {
    id: 9,
    nombre: 'Chaqueta Cyberpunk',
    descripcion: 'Chaqueta Hombre',
    categoria: 'men',
    precio: 25385,
    descuento: '12%',
    precioOriginal: 29103,
    imagen: chaqueta1,
    tallas: ['M', 'L', 'XL', 'XXL'], // Tallas disponibles
  },
];

export default productos;
