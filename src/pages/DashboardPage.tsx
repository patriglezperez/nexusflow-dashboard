
import React from 'react';

function DashboardPage() {
  return (

    <div className="pt-6 pb-6 h-full flex flex-col"> 
      <h2 className="text-3xl font-bold text-gray-800 mb-8"></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Proyectos Activos</h3>
          <p className="text-5xl font-extrabold text-primary">12</p>
        </div>
        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Tareas Pendientes</h3>
          <p className="text-5xl font-extrabold text-warning">34</p>
        </div>
        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Miembros del Equipo</h3>
          <p className="text-5xl font-extrabold text-success">8</p>
        </div>
      </div>

      <div className="bg-white-ish p-6 rounded-2xl shadow-lg border border-gray-200 flex-1"> 
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Actividad Reciente</h3>
        <ul className="space-y-4">
          <li className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-xl mr-4 text-primary">⚡</span>
            <p className="text-gray-700">
              <span className="font-semibold">Juan Pérez</span> ha actualizado el proyecto "Desarrollo de App Móvil".
              <span className="text-sm text-gray-500 ml-2">Hace 5 min</span>
            </p>
          </li>
          <li className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-xl mr-4 text-success">✅</span>
            <p className="text-gray-700">
              <span className="font-semibold">Maria López</span> completó la tarea "Diseño de Interfaz de Usuario".
              <span className="text-sm text-gray-500 ml-2">Hace 30 min</span>
            </p>
          </li>
          <li className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-xl mr-4 text-warning">⚠️</span>
            <p className="text-gray-700">
              <span className="font-semibold">Sistema</span>: Tarea "Reporte Financiero Q2" está próxima a vencer.
              <span className="text-sm text-gray-500 ml-2">Hace 1 hora</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;