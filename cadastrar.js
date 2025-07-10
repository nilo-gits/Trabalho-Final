
let res = document.getElementById('res')
let gravar = document.getElementById('gravar')





gravar.addEventListener('click', (e) => {
  e.preventDefault()

  const valores = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    matricula: matricula.value,
    telefone: telefone.value,
    email: email.value,
    
  }

  console.log(valores)
  res.innerHTML = ''

  fetch(`http://localhost:8081/aluno`,{
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

res.innerHTML += `Nome: ${dadosGrav.nome} <br>`
res.innerHTML += `Sobrenome: ${dadosGrav.sobrenome} <br>`
res.innerHTML += `Matricula: ${dadosGrav.matricula} <br>`
res.innerHTML += `Telefone: ${dadosGrav.telefone} <br>`
res.innerHTML += `E-mail: ${dadosGrav.email} <br>`
res.style.color = 'black'
res.style.fontFamily = 'Arial'
})
.catch((err) => {
    console.error('Erro ao gravar os dados no banco de dados!', err)
  })
})

