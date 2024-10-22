const Report = require('../models/reports');
const History = require('../models/history');

// Crear un nuevo reporte
const createReport = async (req, res) => {
    try {
        // Conteo de datos
        const count_report = await Report.countDocuments();
        const count_history = await History.countDocuments();

        const name = `Informe ${count_report.toString()}`;

        // Obtener ventas en los últimos 7 días
        const date = new Date().now();
        const date_arr = [date];

        for (let i = 1; i <= 7; i++) {
            date_arr.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i));
        }

        const last_seven_date = await History.find({ 
            datePurchase: { $in: date_arr }
        });

        const text = `Productos vendidos hasta la fecha: ${count_history} \n Productos vendidos en la última semana: ${last_seven_date.reduce((acc, cur) => acc.quantityProduct + cur.quantityProduct, 0)}`;

        const newReport = new Report({
            name,
            date: date.toString(),
            text
        });

        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Obtener un producto por ID
const getReport = async (req, res) => {
    try {
        const reporte = await Report.findById(req.params.id);
        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.status(200).json(reporte);
    } catch (error) {
        console.error('Error al obtener el producto:', error); // Log de error
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

module.exports = {
    createReport,
    getReport,
};
