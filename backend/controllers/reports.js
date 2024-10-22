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
        const date = new Date();
        const date_arr = [date];

        for (let i = 1; i <= 7; i++) {
            date_arr.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i));
        }

        const last_seven_date = await History.find({ 
            datePurchase: { $in: date_arr }
        });

        const text = `Productos vendidos hasta la fecha: ${count_history} \n Productos vendidos en la última semana: ${last_seven_date.length}`;

        const newReport = new Report({
            name,
            date,
            text
        });

        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

module.exports = {
    createReport,
};
