import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiAppointment from "../../../apiServices/ApiAppointment";
import ApiSales from "../../../apiServices/ApiSales";
import ApiService from "../../../apiServices/ApiService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dateFormat from "../../../utils/FormatDate";
export default function SalePay() {
  const [searchParams] = useSearchParams();
  const ventaId = searchParams.get("venta_id");
  const citaId = searchParams.get("cita_id");

  const [sale, setSale] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [service, setService] = useState(null);
  const nombre = sessionStorage.getItem("nombre");
  const rut = sessionStorage.getItem("rut");
  useEffect(() => {
    const fetchAll = async () => {
      const dataSale = await ApiSales.getById(ventaId);
      const dataAppointment = await ApiAppointment.getById(citaId);
      const dataService = await ApiService.getById(dataSale.servicio_id);
      setSale(dataSale);
      setAppointment(dataAppointment);
      setService(dataService);
    };

    if (ventaId && citaId) {
      fetchAll();
    }
  }, [ventaId, citaId]);

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setDrawColor(0); // color del borde: negro
    doc.setLineWidth(0.5); // grosor del borde
    doc.rect(10, 10, 190, 25); // (x, y, ancho, alto)

    doc.setTextColor(0, 0, 0); // texto blanco
    doc.setFontSize(12);
    doc.text(`RUT: 76.123.456-7`, 80, 18);
    doc.text(`Boleta Electrónica`, 81, 25);
    doc.text(`N° ${sale?.id_venta}`, 92, 32);

    // Información del emisor
    doc.setFontSize(11);
    doc.text("Servix Marketplace S.A.", 14, 45);
    doc.text("Servicios Informáticos", 14, 51);

    // Fecha de emisión actual
    doc.text(`Emisión: ${dateFormat(sale?.fecha_venta)}`, 14, 58);

    // Línea separadora
    doc.line(10, 63, 200, 63);

    // Detalle del servicio
    doc.setFontSize(12);
    doc.text("Servicio:", 14, 71);
    doc.setFontSize(11);
    doc.text(`${service?.nombre}`, 35, 71);

    doc.text("Precio:", 14, 77);
    doc.text(`$${sale?.total}`, 35, 77);

    // Más detalles con tabla
    autoTable(doc, {
      startY: 85,
      head: [["Detalle", "Valor"]],
      body: [
        ["Fecha Venta", dateFormat(sale?.fecha_venta)],
        ["Fecha Cita", dateFormat(appointment?.fecha_cita)],
        ["Hora", `${appointment?.hora_inicio} - ${appointment?.hora_termino}`],
        ["Estado", appointment?.estado],
        ["Nombre Usuario", nombre],
        ["Rut", rut],
      ],
      styles: { fontSize: 10 },
    });

    // Guardar PDF
    doc.save(`boleta_${sale?.id_venta}.pdf`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        ¡Venta realizada con éxito!
      </h1>

      {sale && appointment ? (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Datos de la Venta</h2>
            <p>
              <strong>ID Venta:</strong> {sale.id_venta}
            </p>
            <p>
              <strong>Total:</strong> ${sale.total}
            </p>
            <p>
              <strong>Fecha Venta:</strong> {sale.fecha_venta}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Datos de la Cita</h2>
            <p>
              <strong>Fecha Cita:</strong> {appointment.fecha_cita}
            </p>
            <p>
              <strong>Hora:</strong> {appointment.hora_inicio} -{" "}
              {appointment.hora_termino}
            </p>
            <p>
              <strong>Estado:</strong> {appointment.estado}
            </p>
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
