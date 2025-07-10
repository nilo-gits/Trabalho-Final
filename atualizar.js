let checar = document.getElementById('checar')
let gravar = document.getElementById('gravar')
let atualizarpro = document.getElementById('atualizarpro')
let res = document.getElementById('res')

checar.addEventListener('click', (e) => {
  e.preventDefault()
  let nomalu = document.getElementById('nome')
  let sobralu = document.getElementById('sobrenome')
  let matralu = document.getElementById('matricula')
  let telealu = document.getElementById('telefone')
  let emalu = document.getElementById('email')

  const codAluno = Number(document.getElementById('codAluno').value)

  fetch(`http://localhost:8081/aluno/${codAluno}`)
    .then(resp => resp.json())
    .then(dado => {
      nomalu.value = dado.nome  
      sobralu.value = dado.sobrenome 
      matralu.value = dado.matricula 
      telealu.value = dado.telefone
      emalu.value = dado.email 
    })
    .catch(err => {
      console.error('Erro ao buscar o produto:', err)
      resatualizar.innerHTML = 'Erro ao buscar o produto.'
    })
})

gravar.addEventListener('click', (e) => {
    e.preventDefault()
    let nomalu = document.getElementById('nome')
    let sobralu = document.getElementById('sobrenome')
    let telealu = document.getElementById('telefone')
    let matralu = document.getElementById('matricula')
    let emalu = document.getElementById('email')
    const codAluno = Number(document.getElementById('codAluno').value)
  
    const dadosAtualizados = {
        nome: nomalu.value,
        sobrenome: sobralu.value,
        matricula: matralu.value,
        telefone: telealu.value,
        email: emalu.value,
    }
  
    fetch(`http://localhost:8081/aluno/${codAluno}`, {
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
      .then(aluno => {
        res.innerHTML = `
           Nome: ${aluno.nome}<br>
           Sobrenome: ${aluno.sobrenome}<br>
           Matricula ${aluno.matricula}<br>
           Telefone: ${aluno.telefone}<br>
           E-mail: ${aluno.email}<br>
            <br>    
        `
        console.log('Produto atualizado:', aluno)
        res.innerHTML = `Produto com ID ${codAluno} atualizado com sucesso!`
      })
      .catch(err => {
        console.error('Erro ao atualizar o produto:', err)
        res.innerHTML = `Erro ao atualizar: ${err.message}`
      })
  })
  