import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiAppointment from "../../../apiServices/ApiAppointment";
import ApiSales from "../../../apiServices/ApiSales";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function SalePay() {
  const [searchParams] = useSearchParams();
  const ventaId = searchParams.get("venta_id");
  const citaId = searchParams.get("cita_id");

  const [sale, setSale] = useState(null);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      const dataSale = await ApiSales.getById(ventaId);
      const dataAppointment = await ApiAppointment.getById(citaId);
      setSale(dataSale);
      setAppointment(dataAppointment);
    };

    if (ventaId && citaId) {
      fetchAll();
    }
  }, [ventaId, citaId]);

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.text("Boleta de Venta", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Detalle", "Valor"]],
      body: [
        ["ID Venta", sale?.id_venta],
        ["Total", `$${sale?.total}`],
        ["Fecha Venta", sale?.fecha_venta],
        ["ID Cita", appointment?.id_cita],
        ["Fecha Cita", appointment?.fecha_cita],
        ["Hora", `${appointment?.hora_inicio} - ${appointment?.hora_termino}`],
        ["Estado", appointment?.estado],
      ],
    });

    doc.save("boleta_venta.pdf");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-green-600 mb-4">¡Venta realizada con éxito!</h1>

      {sale && appointment ? (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Datos de la Venta</h2>
            <p><strong>ID Venta:</strong> {sale.id_venta}</p>
            <p><strong>Total:</strong> ${sale.total}</p>
            <p><strong>Fecha Venta:</strong> {sale.fecha_venta}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Datos de la Cita</h2>
            <p><strong>ID Cita:</strong> {appointment.id_cita}</p>
            <p><strong>Fecha Cita:</strong> {appointment.fecha_cita}</p>
            <p><strong>Hora:</strong> {appointment.hora_inicio} - {appointment.hora_termino}</p>
            <p><strong>Estado:</strong> {appointment.estado}</p>
          </div>

          <button
            onClick={generarPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            Descargar Boleta (PDF)
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Cargando datos...</p>
      )}
    </div>
  );
}
