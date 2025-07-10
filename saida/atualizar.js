let checar = document.getElementById('checar')
let gravar = document.getElementById('gravar')
let res = document.getElementById('res')

checar.addEventListener('click', (e) => {
  e.preventDefault()
  let dataSolicitacao = document.getElementById('dataSolicitacao')
  let horaSaida = document.getElementById('horaSaida')
  let horaRetorno = document.getElementById('horaRetorno')
  let motivo = document.getElementById('motivo')
  let localDestino = document.getElementById('localDestino')
  let status = document.getElementById('status')
  let nomeAluno = document.getElementById('nomeAluno')
  let nomeProfessor = document.getElementById('nomeProfessor')

  const codSaida = Number(document.getElementById('codSaida').value)

  fetch(`http://localhost:8081/saida/${codSaida}`)
    .then(resp => resp.json())
    .then(dado => {

      dataSolicitacao.value = dado.dataSolicitacao
      horaSaida.value = dado.horaSaida
      horaRetorno.value = dado.horaRetorno
      motivo.value = dado.motivo  
      localDestino.value = dado.localDestino 
      status.value = dado.status 
      nomeAluno.value = dado.nomeAluno
      nomeProfessor.value = dado.nomeProfessor 

    })
    .catch(err => {
      console.error('Erro ao buscar o produto:', err)
      res.innerHTML = 'Erro ao buscar o produto.'
    })
})

gravar.addEventListener('click', (e) => {
    e.preventDefault()
    
    let dataSolicitacao = document.getElementById('dataSolicitacao')
    let horaSaida = document.getElementById('horaSaida')
    let horaRetorno = document.getElementById('horaRetorno')
    let motivo = document.getElementById('motivo')
    let localDestino = document.getElementById('localDestino')
    let statusInput = document.getElementById('status')
    let nomeAluno = document.getElementById('nomeAluno')
    let nomeProfessor = document.getElementById('nomeProfessor')

    const codSaida = Number(document.getElementById('codSaida').value)
  
   const dadosAtualizados = {
  dataSolicitacao: dataSolicitacao.value,
  horaSaida: horaSaida.value,
  horaRetorno: horaRetorno.value,
  motivo: motivo.value,
  localDestino: localDestino.value,
  status: statusInput.value,
  nomeAluno: nomeAluno.value,
  nomeProfessor: nomeProfessor.value,
  aluno_cod: Number(document.getElementById('aluno_id').value),
  professor_cod: Number(document.getElementById('professor_id').value)
}
  
    fetch(`http://localhost:8081/saida/${codSaida}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`Erro ao atualizar o produto (HTTP ${resp.status})`)
        }
        return resp.json()
      })
      .then(saida => {
        res.innerHTML = `
          
           Data de Solicitação: ${saida.dataSolicitacao}<br>
           Hora de Saida: ${saida.horaSaida}<br>
           Hora de Retorno: ${saida.horaRetorno}<br>
           Motivo: ${saida.motivo}<br>
           Local de destino: ${saida.localDestino}<br>
           Status: ${saida.status}<br>
           Nome do aluno: ${saida.nomeAluno}<br>
           Nome do professor: ${saida.nomeProfessor}<br>
            <br>    
        `
        console.log('Produto atualizado:', saida)
        res.innerHTML = `Produto com ID ${codSaida} atualizado com sucesso!`
      })
      .catch(err => {
        console.error('Erro ao atualizar o produto:', err)
        res.innerHTML = `Erro ao atualizar: ${err.message}`
      })
  })
  