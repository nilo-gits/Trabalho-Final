let gravar = document.getElementById('gravar')
let res = document.getElementById('res')

gravar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value

    if (!id) {
        res.innerHTML = 'Por favor, insira um ID válido.'
        return
    }

    fetch(`http://localhost:8081/aluno/${id}`, {
        method: 'GET'
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Produto com ID ${id} não encontrado (Status: ${resp.status})`)
        return resp.json()
    })
    .then(aluno => {
        console.log('Produtos listados.', aluno)
        res.innerHTML = 
                `
           Nome: ${aluno.nome}<br>
           Sobrenome: ${aluno.sobrenome}<br>
           Matricula: ${aluno.matricula}<br>
           Telefone: ${aluno.telefone}<br>
           E-mail: ${aluno.email}<br>
            <br>  
              
            `
    })
    .catch(err => {
        console.error('Erro ao consultar o produto', err)
        res.innerHTML = `<p style="color:red;">Erro ao consultar: ${err.message}</p>`
    })
})