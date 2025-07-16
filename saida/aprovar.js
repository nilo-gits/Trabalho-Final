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
    .then(saidas => {
      console.log('Saídas listadas.', saidas)
      res.innerHTML = saidas.map(p => `
        <div class="saida-item">
          <strong>Motivo:</strong> ${p.motivo} <br>
          <strong>Local de destino:</strong> ${p.localDestino} <br>
          <strong>Status:</strong> ${p.status} <br>
          <strong>Aluno:</strong> ${p.nomeAluno} <br>
          <strong>Professor:</strong> ${p.nomeProfessor} <br><br>

          <button onclick="atualizarStatus(${p.id}, 'Aprovado')">Aprovar</button>
          <button onclick="atualizarStatus(${p.id}, 'Rejeitado')">Rejeitar</button>
          <hr>
        </div>
      `).join('')
    })
    .catch(err => {
      console.error('Erro ao listar as saídas', err)
      res.innerHTML = `Erro: ${err.message}`
    })
})

function atualizarStatus(id, novoStatus) {
  fetch(`http://localhost:8081/saida/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: novoStatus })
  })
    .then(resp => {
      if (!resp.ok) throw new Error(`Erro ao atualizar status: ${resp.status}`)
      return resp.json()
    })
    .then(data => {
      alert(`Status atualizado para: ${novoStatus}`)
      gravar.click() // recarrega a lista
    })
    .catch(err => {
      console.error('Erro ao atualizar status', err)
      alert('Erro ao atualizar status')
    })
}