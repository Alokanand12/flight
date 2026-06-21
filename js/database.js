/* ============================================================
   DATABASE.JS — Mock Data & LocalStorage Management
   ============================================================ */

const DB = (() => {
  // Mock Data Generators
  const initialPassengers = [
    { id: 'P001', name: 'John Doe', gender: 'Male', city: 'New York' },
    { id: 'P002', name: 'Jane Smith', gender: 'Female', city: 'London' },
    { id: 'P003', name: 'Michael Chen', gender: 'Male', city: 'Singapore' },
    { id: 'P004', name: 'Sarah Connor', gender: 'Female', city: 'Los Angeles' },
    { id: 'P005', name: 'Ahmed Hassan', gender: 'Male', city: 'Dubai' }
  ];

  const initialAgencies = [
    { id: 'A001', name: 'SkyHigh Travels', city: 'New York' },
    { id: 'A002', name: 'Global Flights', city: 'London' },
    { id: 'A003', name: 'Zenith Booking', city: 'Dubai' },
    { id: 'A004', name: 'Wanderlust Agency', city: 'Singapore' }
  ];

  const initialFlights = [
    { id: 'FL101', date: '2026-07-15', time: '10:00 AM', source: 'New York', destination: 'London' },
    { id: 'FL202', date: '2026-07-16', time: '02:30 PM', source: 'Dubai', destination: 'Singapore' },
    { id: 'FL303', date: '2026-07-18', time: '08:15 AM', source: 'London', destination: 'Dubai' },
    { id: 'FL404', date: '2026-07-20', time: '11:45 PM', source: 'Singapore', destination: 'Los Angeles' },
    { id: 'FL505', date: '2026-07-22', time: '06:00 AM', source: 'Los Angeles', destination: 'New York' }
  ];

  const initialBookings = [
    { id: 'B001', passengerId: 'P001', agencyId: 'A001', flightId: 'FL101', date: '2026-06-20', status: 'Confirmed' },
    { id: 'B002', passengerId: 'P002', agencyId: 'A002', flightId: 'FL303', date: '2026-06-21', status: 'Confirmed' },
    { id: 'B003', passengerId: 'P005', agencyId: 'A003', flightId: 'FL202', date: '2026-06-21', status: 'Pending' }
  ];

  // Initialize DB
  function init() {
    if (!localStorage.getItem('flight_db_initialized')) {
      localStorage.setItem('passengers', JSON.stringify(initialPassengers));
      localStorage.setItem('agencies', JSON.stringify(initialAgencies));
      localStorage.setItem('flights', JSON.stringify(initialFlights));
      localStorage.setItem('bookings', JSON.stringify(initialBookings));
      localStorage.setItem('flight_db_initialized', 'true');
    }
  }

  // Generic CRUD
  function getTable(table) {
    return JSON.parse(localStorage.getItem(table) || '[]');
  }

  function saveTable(table, data) {
    localStorage.setItem(table, JSON.stringify(data));
  }

  function addRecord(table, record) {
    const data = getTable(table);
    data.push(record);
    saveTable(table, data);
    return record;
  }

  function updateRecord(table, idField, idValue, updatedRecord) {
    let data = getTable(table);
    const index = data.findIndex(r => r[idField] === idValue);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedRecord };
      saveTable(table, data);
      return data[index];
    }
    return null;
  }

  function deleteRecord(table, idField, idValue) {
    let data = getTable(table);
    data = data.filter(r => r[idField] !== idValue);
    saveTable(table, data);
  }

  // Specific Getters
  function getStats() {
    return {
      passengers: getTable('passengers').length,
      agencies: getTable('agencies').length,
      flights: getTable('flights').length,
      bookings: getTable('bookings').length
    };
  }

  return {
    init,
    getTable,
    addRecord,
    updateRecord,
    deleteRecord,
    getStats
  };
})();

// Initialize on load
DB.init();
