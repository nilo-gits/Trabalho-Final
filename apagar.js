let res = document.getElementById('res')
let apagar = document.getElementById('apagar')

apagar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = Number(document.getElementById('id').value)

    fetch(`http://localhost:8081/aluno/${id}`, {
        method: 'DELETE'
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP! Status: ${resp.status}`)
        return resp.text() 
    })
    .then(msg => {
        console.log('Produto deletado com sucesso:', msg)
        res.innerHTML = `Produto com ID ${id} deletado com sucesso`
    })
    .catch(err => {
        console.error('Erro ao deletar o produto:', err)
        res.innerHTML = `Erro ao deletar o produto com ID ${id}`
    })
})
