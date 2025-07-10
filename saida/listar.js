let gravar = document.getElementById('gravar')
let res = document.getElementById('res')

gravar.addEventListener('click', (e) => {
   e.preventDefault()

   fetch(`http://localhost:8081/saida`, {
       method: 'GET'
   })
   .then(resp => {
       if (!resp.ok) throw new Error(`Erro Http! STATUS: ${resp.status}`)
           return resp.json()
   })
   .then(saida => {
       console.log('Entregas listadas.', saida)
       res.innerHTML = saida.map(p =>
        `
        Motivo: ${p.motivo} <br>
        Local de destino: ${p.localDestino} <br>
        status: ${p.status} <br>
        nomeAluno: ${p.nomeAluno} <br>
        nomeProfessor: ${p.nomeProfessor} <br>
        
    
         <br>  
           
         `
           
       ).join('')
   })
   .catch(err => {
       console.error('Erro ao listar os produtos', err)
       res.innerHTML = `Erro ao listar os produtos: ${err.message}`
   })
})