let gravar = document.getElementById('gravar')
let res = document.getElementById('res')

gravar.addEventListener('click', (e) => {
   e.preventDefault()

   fetch(`http://localhost:8081/aluno`, {
       method: 'GET'
   })
   .then(resp => {
       if (!resp.ok) throw new Error(`Erro Http! STATUS: ${resp.status}`)
           return resp.json()
   })
   .then(aluno => {
       console.log('Entregas listadas.', aluno)
       res.innerHTML = aluno.map(p =>
        `
        Nome: ${p.nome}<br>
        Sobrenome: ${p.sobrenome}<br>
        Matricula: ${p.matricula}<br>
        Telefone: ${p.telefone}<br>
        E-mail: ${p.email}<br>
    
         <br>  
           
         `
           
       ).join('')
   })
   .catch(err => {
       console.error('Erro ao listar os produtos', err)
       res.innerHTML = `Erro ao listar os produtos: ${err.message}`
   })
})