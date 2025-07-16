let res = document.getElementById("res")
let button = document.getElementById("listar")

button.addEventListener("click", (e) => {
    e.preventDefault()
    let listaOnline = document.getElementById("listaOnline").value

    switch (listaOnline) {
        case "todos":
            todos()
            break
        default:
            listarPorStatus()
            break
    }
})

function todos() {
    fetch("http://localhost:8081/saida", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            let html = `<table>
            <tr>
                <th>Código</th>
                <th>Data da Solicitação</th>
                <th>Hora de Saída</th>
                <th>Hora de Retorno</th>
                <th>Motivo</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Aluno</th>
                <th>Professor</th>
            </tr>`

            valores.forEach(val => {
                html += `<tr>
                <td>${val.codSaida}</td>               
                <td>${val.dataSolicitacao}</td>
                <td>${val.horaSaida}</td>
                <td>${val.horaRetorno}</td>
                <td>${val.motivo}</td>
                <td>${val.localDestino}</td>
                <td>${val.status}</td>
                <td>${val.nomeAluno}</td>
                <td>${val.nomeProfessor}</td>
            </tr>`
            })

            html += `</table>`
            res.innerHTML = `html`
        })
        .catch(err => {
            console.error("Erro:", err)
        })
}

function listarPorStatus() {
    const statusAlvo = document.getElementById("listaOnline").value

    fetch("http://localhost:8081/saida", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            let html = `<table>
            <tr>
                <th>Código</th>
                <th>Data da Solicitação</th>
                <th>Hora de Saída</th>
                <th>Hora de Retorno</th>
                <th>Motivo</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Aluno</th>
                <th>Professor</th>
                <th>Ações</th>
            </tr>`

            valores.forEach(val => {
                const status = val.status.trim().toLowerCase()

                if (status === statusAlvo) {
                    html += `<tr>
                    <td>${val.codSaida}</td>               
                    <td>${val.dataSolicitacao}</td>
                    <td>${val.horaSaida}</td>
                    <td>${val.horaRetorno}</td>
                    <td>${val.motivo}</td>
                    <td>${val.localDestino}</td>
                    <td>${val.status}</td>
                    <td>${val.nomeAluno}</td>
                    <td>${val.nomeProfessor}</td>`

                    if (status === "pendente") {
                        html += `<td>
                        <button class="aprovar" data-id="${val.codSaida}">Aprovar</button>
                        <button class="rejeitar" data-id="${val.codSaida}">Rejeitar</button>
                    </td>`
                    } else if (status === "aprovado") {
                        html += `<td>
                        <button class="finalizar" data-id="${val.codSaida}">Finalizar saída</button>
                    </td>`
                    } else {
                        html += `<td>-</td>`
                    }

                    html += `</tr>`
                }
            })

            html += "</table>"
            res.innerHTML = html
        })
        .catch(err => {
            console.error("Erro:", err)
        })
}









document.addEventListener("click", function (e) {
  if (e.target.classList.contains("aprovar")) {
      let id = Number(e.target.dataset.id)
      console.log("Aprovar ID:", id)

      fetch(`http://localhost:8081/saida/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })
          .then(resp => resp.json())
          .then(val => {
              console.log("Saída obtida:", val)
              fetch(`http://localhost:8081/aluno`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              })
                  .then(resp => resp.json())
                  .then(alunos => {
                      const alunoExistente = alunos.find(alu =>
                          `${alu.nome} ${alu.sobrenome}`.trim().toLowerCase() === `${val.nomeAluno}`.trim().toLowerCase() ||
                          alu.nome.trim().toLowerCase() === val.nomeAluno.trim().toLowerCase()
                      )

                      fetch(`http://localhost:8081/professor`, {
                          method: "GET",
                          headers: {
                              "Content-Type": "application/json"
                          }
                      })
                          .then(resp => resp.json())
                          .then(professor => {
                            const professorExistente = professor.find(prof => {
                                const nomeCompleto = `${(prof.nome ?? "").trim().toLowerCase()} ${(prof.sobrenome ?? "").trim().toLowerCase()}`
                                const nomeSimples = (prof.nome ?? "").trim().toLowerCase()
                                const nomeProfessorVal = (val.nomeProfessor ?? "").trim().toLowerCase()
                        
                                return nomeCompleto === nomeProfessorVal || nomeSimples === nomeProfessorVal
                            })
                        
                            if (!professorExistente) {
                                console.error("Professor não encontrado:", val.nomeProfessor)
                                return
                            }
                        
                            console.log(professorExistente)
                        
                            const dados = {
                                dataSolicitacao: val.dataSolicitacao,
                                horaSaida: val.horaSaida,
                                horaRetorno: val.horaRetorno,
                                motivo: val.motivo,
                                localDestino: val.localDestino,
                                status: "aprovado",
                                nomeAluno: val.nomeAluno,
                                aluno_cod: alunoExistente.codAluno,
                                nomeProfessor: val.nomeProfessor,
                                professor_cod: professorExistente.codProfessor
                            }

                              fetch(`http://localhost:8081/saida/${id}`, {
                                  method: "PUT",
                                  headers: {
                                      "Content-Type": "Application/JSON"
                                  },
                                  body: JSON.stringify(dados)
                              })
                                  .then(resp => resp.body)
                                  .then(() => {
                                      location.reload()
                                  })
                                  .catch(err => {
                                      console.error("Erro:", err)
                                  })
                          })
                  })
          })

  }
})

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("rejeitar")) {
      let id = Number(e.target.dataset.id)
      console.log("Aprovar ID:", id)

      fetch(`http://localhost:8081/saida/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })
          .then(resp => resp.json())
          .then(val => {
              console.log("Saída obtida:", val)
              fetch(`http://localhost:8081/aluno`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              })
                  .then(resp => resp.json())
                  .then(alunos => {
                      const alunoExistente = alunos.find(alu =>
                         `${alu.nome} ${alu.sobrenome}`.trim().toLowerCase() === `${val.nomeAluno}`.trim().toLowerCase() ||
                          alu.nome.trim().toLowerCase() === val.nomeAluno.trim().toLowerCase()
                      )

                      fetch(`http://localhost:8081/professor`, {
                          method: "GET",
                          headers: {
                              "Content-Type": "application/json"
                          }
                      })
                          .then(resp => resp.json())
                          .then(professor => {
                              const professorExistente = professor.find(prof =>
                                 `${prof.nome} ${prof.sobrenome}`.trim().toLowerCase() === val.nomeProfessor.trim().toLowerCase() ||
                                  prof.nome.trim().toLowerCase() === val.nomeProfessor.trim().toLowerCase()
                              )
                              console.log(professorExistente)

                              const dados = {
                                  dataSolicitacao: val.dataSolicitacao,
                                  horaSaida: val.horaSaida,
                                  horaRetorno: val.horaRetorno,
                                  motivo: val.motivo,
                                  localDestino: val.localDestino,
                                  status: "rejeitado",
                                  nomeAluno: val.nomeAluno,
                                  aluno_cod: alunoExistente.codAluno,
                                  nomeProfessor: val.nomeProfessor,
                                  professor_cod: professorExistente.codProfessor
                              }

                              fetch(`http://localhost:8081/saida/${id}`, {
                                  method: "PUT",
                                  headers: {
                                      "Content-Type": "Application/JSON"
                                  },
                                  body: JSON.stringify(dados)
                              })
                                  .then(resp => resp.body)
                                  .then(() => {
                                      location.reload()
                                  })
                                  .catch(err => {
                                      console.error("Erro:", err)
                                  })
                          })
                  })
          })

  }
})

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("finalizar")) {
      let id = Number(e.target.dataset.id)
      console.log("Aprovar ID:", id)

      fetch(`http://localhost:8081/saida/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })
          .then(resp => resp.json())
          .then(val => {
              console.log("Saída obtida:", val)
              fetch(`http://localhost:8081/aluno`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              })
                  .then(resp => resp.json())
                  .then(alunos => {
                      const alunoExistente = alunos.find(alu =>
                         `${alu.nome} ${alu.sobrenome}`.trim().toLowerCase() === `${val.nomeAluno}`.trim().toLowerCase() ||
                          alu.nome.trim().toLowerCase() === val.nomeAluno.trim().toLowerCase()
                      )

                      fetch(`http://localhost:8081/professor`, {
                          method: "GET",
                          headers: {
                              "Content-Type": "application/json"
                          }
                      })
                          .then(resp => resp.json())
                          .then(professor => {
                              const professorExistente = professor.find(prof =>
                                 `${prof.nome} ${prof.sobrenome}`.trim().toLowerCase() === val.nomeProfessor.trim().toLowerCase() ||
                                  prof.nome.trim().toLowerCase() === val.nomeProfessor.trim().toLowerCase()
                              )
                              console.log(professorExistente)

                              const dados = {
                                  dataSolicitacao: val.dataSolicitacao,
                                  horaSaida: val.horaSaida,
                                  horaRetorno: val.horaRetorno,
                                  motivo: val.motivo,
                                  localDestino: val.localDestino,
                                  status: "finalizado",
                                  nomeAluno: val.nomeAluno,
                                  aluno_cod: alunoExistente.codAluno,
                                  nomeProfessor: val.nomeProfessor,
                                  professor_cod: professorExistente.codProfessor
                              }

                              fetch(`http://localhost:8081/saida/${id}`, {
                                  method: "PUT",
                                  headers: {
                                      "Content-Type": "Application/JSON"
                                  },
                                  body: JSON.stringify(dados)
                              })
                                  .then(resp => resp.body)
                                  .then(() => {
                                      location.reload()
                                  })
                                  .catch(err => {
                                      console.error("Erro:", err)
                                  })
                          })
                  })
          })

  }
})