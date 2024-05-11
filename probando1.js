// punto 1: por fechas
ticketsRouter.get('/by_date/:fecha1/:fecha2', async (req, res) => {
  try {
    const { fecha1, fecha2 } = req.params;
    const tickets = await TicketModel.find({ date: { $gte: new Date(fecha1), $lte: new Date(fecha2) } });
    res.json(tickets);
  } catch (error) {
    console.error('Error al buscar multas por fecha:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
//Punto 2: Mostrar todos los nombres que tienen más de "numero" de infracciones
ticketsRouter.get('/repeat_speeders/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const repeatSpeeders = await TicketModel.aggregate([
      { $group: { _id: '$name', count: { $sum: 1 } } },
      { $match: { count: { $gt: parseInt(number) } } }
    ]);
    const names = repeatSpeeders.map(speeder => speeder._id);
    res.json(names);
  } catch (error) {
    console.error('Error al buscar infractores repetidos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
//Punto 3: Borrar todas las infracciones que coincidan con "nombre"
ticketsRouter.delete('/delete_infractor/:name_infractor', async (req, res) => {
  try {
    const { name_infractor } = req.params;
    const result = await TicketModel.deleteMany({ name: name_infractor });
    res.json({ message: 'Infracciones eliminadas', result });
  } catch (error) {
    console.error('Error al eliminar infracciones por nombre:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
//Punto 4: Borrar todas las infracciones que tengan velocidad menor "numero"
ticketsRouter.delete('/delete_speedmin/:speed', async (req, res) => {
  try {
    const { speed } = req.params;
    const result = await TicketModel.deleteMany({ speed: { $lt: parseInt(speed) } });
    res.json({ message: 'Infracciones eliminadas', result });
  } catch (error) {
    console.error('Error al eliminar infracciones por velocidad mínima:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
//Punto 5: Filtrar por nombre, placa, color y tipo
ticketsRouter.get('/', async (req, res) => {
  try {
    const { name, plate, color, type } = req.query;
    const query = {};
    if (name) query.name = name;
    if (plate) query.plate = plate;
    if (color) query.color = color;
    if (type) query.type_vehicle = type;

    const filteredTickets = await TicketModel.find(query);
    res.json(filteredTickets);
  } catch (error) {
    console.error('Error al filtrar infracciones por nombre, placa, color y tipo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});