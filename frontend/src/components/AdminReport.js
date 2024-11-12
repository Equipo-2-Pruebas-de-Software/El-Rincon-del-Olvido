import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const AdminReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el reporte desde la API usando fetch
  const fetchReport = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/report");
      if (!response.ok) {
        throw new Error("Error al obtener el reporte");
      }
      const data = await response.json();
      setReport(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Función para generar el PDF del reporte
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reporte de Productos", 105, 10, null, null, "center"); // Título centrado

    if (report) {
      // Ventas Totales
      doc.setFontSize(12);
      doc.text("Ventas Totales:", 10, 20);
      doc.setFontSize(10);
      doc.text(`${report.totalSales}`, 50, 20);

      // Total de Vistas y Añadidos al Carrito
      doc.setFontSize(12);
      doc.text("Resumen de Interacción:", 10, 30);
      doc.setFontSize(10);
      doc.text(`Total de Vistas: ${report.totalViews}`, 10, 40);
      doc.text(
        `Total Añadidos al Carrito: ${report.totalAddToCartCount}`,
        10,
        50
      );

      // Sección: Productos Más Vistos
      doc.setFontSize(12);
      doc.text("Top 5 Productos Más Vistos:", 10, 60);
      report.mostViewedProducts.forEach((product, index) => {
        doc.setFontSize(10);
        doc.text(
          `${index + 1}. ${product.name} - Vistas: ${product.views}`,
          15,
          70 + index * 10
        );
      });

      // Sección: Productos Más Añadidos al Carrito
      doc.setFontSize(12);
      doc.text("Top 5 Productos Más Añadidos al Carrito:", 10, 120);
      report.mostAddedToCartProducts.forEach((product, index) => {
        doc.setFontSize(10);
        doc.text(
          `${index + 1}. ${product.name} - Añadidos: ${product.addToCartCount}`,
          15,
          130 + index * 10
        );
      });

      // Sección: Productos Más Vendidos
      doc.setFontSize(12);
      doc.text("Top 5 Productos Más Vendidos:", 10, 180);
      report.bestSellingProducts.forEach((product, index) => {
        doc.setFontSize(10);
        doc.text(
          `${index + 1}. ${product.name} - Compras: ${product.purchaseCount}`,
          15,
          190 + index * 10
        );
      });
    }

    // Guardar el documento PDF con un nombre descriptivo
    doc.save("reporte_productos.pdf");
  };

  // Llamada a la API al montar el componente
  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) return <p>Cargando reporte...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Reporte de Productos</h2>
      {report && (
        <div>
          <p>
            <strong>Ventas Totales:</strong> {report.totalSales}
          </p>
          <p>
            <strong>Total de Vistas:</strong> {report.totalViews}
          </p>
          <p>
            <strong>Total Añadidos al Carrito:</strong>{" "}
            {report.totalAddToCartCount}
          </p>

          <div className="mt-4">
            <h3>Top 5 Productos Más Vistos</h3>
            <ul>
              {report.mostViewedProducts.map((product, index) => (
                <li key={index}>
                  {product.name} - Vistas: {product.views}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3>Top 5 Productos Más Añadidos al Carrito</h3>
            <ul>
              {report.mostAddedToCartProducts.map((product, index) => (
                <li key={index}>
                  {product.name} - Añadidos: {product.addToCartCount}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3>Top 5 Productos Más Vendidos</h3>
            <ul>
              {report.bestSellingProducts.map((product, index) => (
                <li key={index}>
                  {product.name} - Compras: {product.purchaseCount}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-center">
            <button onClick={generatePDF} className="btn btn-primary">
              Generar PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReport;
