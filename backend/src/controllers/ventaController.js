const Venta = require('../models/ventaModel');
const pdfkit = require('pdfkit');
const fs = require('fs');

const ventaController = {
    create: async (req, res) => {
        const { id_cliente, fecha, num_pago, productos } = req.body;

        if (!id_cliente || !fecha || !num_pago || !productos || productos.length === 0) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            // Crear factura
            Venta.createFactura({ id_cliente, fecha, num_pago }, async (err, id_factura) => {
                if (err) return res.status(500).json({ error: err.message });

                // Registrar detalles y actualizar stock
                for (const producto of productos) {
                    await new Promise((resolve, reject) => {
                        Venta.createDetalle(
                            {
                                id_factura,
                                id_producto: producto.id_producto,
                                cantidad: producto.cantidad,
                                precio: producto.precio,
                            },
                            (err) => (err ? reject(err) : resolve())
                        );
                    });

                    // Actualizar stock
                    await new Promise((resolve, reject) => {
                        Venta.updateStock(producto.id_producto, producto.cantidad, (err) =>
                            err ? reject(err) : resolve()
                        );
                    });
                }

                res.status(201).json({ message: 'Venta registrada exitosamente', id_factura });
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getFactura: (req, res) => {
        const { id } = req.params;

        Venta.getFacturaById(id, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            if (rows.length === 0) return res.status(404).json({ error: 'Factura no encontrada' });

            const doc = new pdfkit();
            const filePath = `./facturas/factura_${id}.pdf`;

            doc.pipe(fs.createWriteStream(filePath));
            doc.fontSize(16).text(`Factura #${id}`, { align: 'center' });
            doc.text(`Fecha: ${rows[0].fecha}`);
            doc.text(`Cliente: ${rows[0].cliente}`);
            doc.text(`Dirección: ${rows[0].direccion}`);
            doc.moveDown();

            let total = 0;
            rows.forEach((row) => {
                doc.text(`${row.producto} - Cantidad: ${row.cantidad} - Precio: ${row.precio} - Subtotal: ${row.subtotal}`);
                total += row.subtotal;
            });

            doc.moveDown();
            doc.text(`Total: ${total}`, { align: 'right' });
            doc.end();

            res.json({ message: 'Factura generada', filePath });
        });
    },
};

module.exports = ventaController;
