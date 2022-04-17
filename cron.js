const cron = require('node-cron')
const { run } = require('./handler')

console.log("Executando a tarefa a cada 2 minutos")

cron.schedule("*/2 * * * *", async () => {
  
  await run()

});
