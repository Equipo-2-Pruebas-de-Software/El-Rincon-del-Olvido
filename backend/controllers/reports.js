const Report = require('../models/reports');
const History = require('../models/history');

// Crear un nuevo reporte
const createReport = async (req, res) => {
    try {
        //Conteo de datos
        const count_report = await Report.countDocuments();
        const count_history = await History.countDocuments();

        const name = `Informe ${count_report.toString()}`;

        //Obtener ventas en los ultimos 7 dias
        const date = new Date().now();

        const date_arr = [];
        let date_trsc;

        date_arr.push(date.toDateString());
        for(let i = 1; i <= 7; i++) {
            date_trsc = new Date(date).setDate(date.getDate()-i);

            date_arr.push(date_trsc);
        }

        const last_seven_date = await History.find({ $expr: {
                $in: ["$datePurchase", date_arr]
            }
        });

        const text = `Productos vendidos hasta la fecha: ${count_history} \n 
            Productos vendidos en la última semana ${last_seven date.length}`;

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