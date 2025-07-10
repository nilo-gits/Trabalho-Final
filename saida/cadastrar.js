
let res = document.getElementById('res')
let gravar = document.getElementById('gravar')
let busca = document.getElementById('busca')

gravar.addEventListener('click', (e) => {
  e.preventDefault()
  let statusInput = document.getElementById('status')

  const valores = {
    dataSolicitacao: dataSolicitacao.value,
    horaSaida: horaSaida.value,
    horaRetorno: horaRetorno.value,
    motivo: motivo.value,
    localDestino: localDestino.value,
    status: statusInput.value, 
    nomeAluno: nomeAluno.value,
    nomeProfessor: nomeProfessor.value
  }

  console.log(valores)
  res.innerHTML = ''

  fetch(`http://localhost:8081/saida`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(valores)
  })
  .then(resp => {
    if(!resp.ok) throw new Error('Erro HTTP! Status: ${resp.status}')
    return resp.json()
})
.then(dadosGrav => {
  console.log(dadosGrav)
  res.innerHTML = `` 

res.innerHTML += `Motivo: ${dadosGrav.dataSolicitacao} <br>`
res.innerHTML += `Motivo: ${dadosGrav.horaSaida} <br>`
res.innerHTML += `Motivo: ${dadosGrav.horaRetorno} <br>`
res.innerHTML += `Motivo: ${dadosGrav.motivo} <br>`
res.innerHTML += `Local de destino: ${dadosGrav.localDestino} <br>`
res.innerHTML += `status: ${dadosGrav.status} <br>`
res.innerHTML += `nomeAluno: ${dadosGrav.nomeAluno} <br>`
res.innerHTML += `nomeProfessor: ${dadosGrav.nomeProfessor} <br>`


res.style.color = 'black'
res.style.fontFamily = 'Arial'
})
.catch((err) => {
    console.error('Erro ao gravar os dados no banco de dados!', err)
  })
})

