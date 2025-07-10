let checar = document.getElementById('checar')
let gravar = document.getElementById('gravar')

let res = document.getElementById('res')

checar.addEventListener('click', (e) => {
  e.preventDefault()
  let nomalu = document.getElementById('nome')
  let sobralu = document.getElementById('sobrenome')
  let matralu = document.getElementById('matricula')
  let telealu = document.getElementById('telefone')
  let emalu = document.getElementById('email')

  const codProfessor = Number(document.getElementById('codProfessor').value)

  fetch(`http://localhost:8081/professor/${codProfessor}`)
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
    const codProfessor = Number(document.getElementById('codProfessor').value)
  
    const dadosAtualizados = {
        nome: nomalu.value,
        sobrenome: sobralu.value,
        matricula: matralu.value,
        telefone: telealu.value,
        email: emalu.value,
    }
  
    fetch(`http://localhost:8081/professor/${codProfessor}`, {
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
      .then(professor => {
        res.innerHTML = `
           Nome: ${professor.nome}<br>
           Sobrenome: ${professor.sobrenome}<br>
           Matricula ${professor.matricula}<br>
           Telefone: ${professor.telefone}<br>
           E-mail: ${professor.email}<br>
            <br>    
        `
        console.log('Produto atualizado:', professor)
        res.innerHTML = `Produto com ID ${codProfessor} atualizado com sucesso!`
      })
      .catch(err => {
        console.error('Erro ao atualizar o produto:', err)
        res.innerHTML = `Erro ao atualizar: ${err.message}`
      })
  })
  