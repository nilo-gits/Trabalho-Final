let gravar = document.getElementById('gravar')
let res = document.getElementById('res')

gravar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value

    if (!id) {
        res.innerHTML = 'Por favor, insira um ID válido.'
        return
    }

    fetch(`http://localhost:8081/professor/${id}`, {
        method: 'GET'
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Produto com ID ${id} não encontrado (Status: ${resp.status})`)
        return resp.json()
    })
    .then(professor => {
        console.log('Produtos listados.', professor)
        res.innerHTML = 
                `
           Nome: ${professor.nome}<br>
           Sobrenome: ${professor.sobrenome}<br>
           Matricula: ${professor.matricula}<br>
           Telefone: ${professor.telefone}<br>
           E-mail: ${professor.email}<br>
            <br>  
              
            `
    })
    .catch(err => {
        console.error('Erro ao consultar o professor', err)
        res.innerHTML = `<p style="color:red;">Erro ao consultar: ${err.message}</p>`
    })
})