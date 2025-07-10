let gravar = document.getElementById('gravar')
let res = document.getElementById('res')

gravar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value

    if (!id) {
        res.innerHTML = 'Por favor, insira um ID válido.'
        return
    }

    fetch(`http://localhost:8081/saida/${id}`, {
        method: 'GET'
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Produto com ID ${id} não encontrado (Status: ${resp.status})`)
        return resp.json()
    })
    .then(saida => {
        console.log('Produtos listados.', saida)
        res.innerHTML = 
                `
            Motivo: ${saida.motivo} <br>
            Local de destino: ${saida.localDestino} <br>
            status: ${saida.status} <br>
            nomeAluno: ${saida.nomeAluno} <br>
            nomeProfessor: ${saida.nomeProfessor} <br>
           
            <br>  
              
            `
    })
    .catch(err => {
        console.error('Erro ao consultar o produto', err)
        res.innerHTML = `<p style="color:red;">Erro ao consultar: ${err.message}</p>`
    })
})