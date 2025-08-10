const { jsPDF } = window.jspdf;

window.addEventListener("DOMContentLoaded", () => {
  const objetivoTextarea = document.getElementById("objetivo");
  if (objetivoTextarea && !objetivoTextarea.value) {
    objetivoTextarea.value = "Pretendo contribuir com dedicação e comprometimento, visando alcançar, junto à empresa, resultados de excelência.";
  }
});


document.getElementById("curriculoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let nascimento = document.getElementById("nascimento").value;
    let estadoCivil = document.getElementById("estadoCivil").value;
    let endereco = document.getElementById("endereco").value;
    let objetivo = document.getElementById("objetivo").value;
    let formacao = document.getElementById("formacao").value;
    let habilidades = document.getElementById("habilidades").value;
    let foto = document.getElementById("foto").files[0];
    let template = document.getElementById("templateSelecionado").value;

    if (nascimento) {
        const dataObj = new Date(nascimento);
        nascimento = dataObj.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    }

    telefone = telefone.replace(/\D/g, "");
    if (telefone.length === 11) {
        telefone = telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
    }

    function montarExperiencias() {
        let experiencias = "";
        const lista = document.querySelectorAll(".experiencia-item");
        lista.forEach(item => {
            experiencias += `<p>${item.innerHTML}</p>`;
        });
        return experiencias || "<p>Sem experiências cadastradas</p>";
    }

    function gerarCurriculoTemplate(template, fotoBase64) {
        switch(template) {
            case "1":
                return `
                <div id="curriculo" class="template1">
                  <div class="cabecalho">
                    <div class="foto-container">
                      ${fotoBase64 ? `<div class="foto-bg" style="background-image: url('${fotoBase64}');"></div>` : ""}
                    </div>
                    <div>
                      <h2>${nome}</h2>
                      <div class="contatos">
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Telefone:</strong> ${telefone}</p>
                        <p><strong>Data de nascimento:</strong> ${nascimento}</p>
                        <p><strong>Estado civil:</strong> ${estadoCivil}</p>
                        <p><strong>Endereço:</strong> ${endereco}</p>
                      </div>
                    </div>
                  </div>

                  <h3>Objetivo Profissional</h3>
                  <p>${objetivo}</p>

                  <h3>Experiência Profissional</h3>
                  ${montarExperiencias()}

                  <h3>Formação Acadêmica</h3>
                  <p>${formacao}</p>

                  <h3>Habilidades</h3>
                  <p>${habilidades}</p>
                </div>
                `;

            case "2":
                return `
                <div id="curriculo" class="template2"> 
                  <aside class="sidebar">
                    <div class="foto-container">
                      ${fotoBase64 ? `<div class="foto-bg" style="background-image: url('${fotoBase64}');"></div>` : ""}
                    </div>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Telefone:</strong> ${telefone}</p>
                    <p><strong>Data de nascimento:</strong> ${nascimento}</p>
                    <p><strong>Estado civil:</strong> ${estadoCivil}</p>
                    <p><strong>Endereço:</strong> ${endereco}</p>
                  </aside>
                  <main>
                    <h2 class="nome-principal">${nome}</h2>
                    <h3>Objetivo Profissional</h3>
                    <p>${objetivo}</p>

                    <h3>Experiência Profissional</h3>
                    ${montarExperiencias()}

                    <h3>Formação Acadêmica</h3>
                    <p>${formacao}</p>

                    <h3>Habilidades</h3>
                    <p>${habilidades}</p>
                  </main>
                </div>
                `;

            case "3":
                return `
                <div id="curriculo" class="template3">
                    <header>
                        <div class="foto-container">
                          ${fotoBase64 ? `<div class="foto-bg" style="background-image: url('${fotoBase64}');"></div>` : ""}
                        </div>
                        <div class="info-cabecalho">
                            <h2 class="nome-principal">${nome}</h2>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Telefone:</strong> ${telefone}</p>
                            <p><strong>Data de nascimento:</strong> ${nascimento}</p>
                            <p><strong>Estado civil:</strong> ${estadoCivil}</p>
                            <p><strong>Endereço:</strong> ${endereco}</p>
                        </div>
                    </header>

                    <section>
                        <h3>Objetivo Profissional</h3>
                        <p>${objetivo}</p>
                    </section>

                    <section>
                        <h3>Experiência Profissional</h3>
                        ${montarExperiencias()}
                    </section>

                    <section>
                        <h3>Formação Acadêmica</h3>
                        <p>${formacao}</p>
                    </section>

                    <section>
                        <h3>Habilidades</h3>
                        <p>${habilidades}</p>
                    </section>
                </div>
                `;

            case "4":
                return `
                <div id="curriculo" class="template4">
                  <div class="cabecalho">
                    <div class="foto-container">
                      ${fotoBase64 ? `<div class="foto-bg" style="background-image: url('${fotoBase64}');"></div>` : ""}
                    </div>
                    <div>
                      <h2>${nome}</h2>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Telefone:</strong> ${telefone}</p>
                    </div>
                  </div>

                  <section>
                    <h3>Objetivo Profissional</h3>
                    <p>${objetivo}</p>
                  </section>

                  <section>
                    <h3>Experiência Profissional</h3>
                    ${montarExperiencias()}
                  </section>

                  <section>
                    <h3>Formação Acadêmica</h3>
                    <p>${formacao}</p>
                  </section>

                  <section>
                    <h3>Habilidades</h3>
                    <p>${habilidades}</p>
                  </section>
                </div>
                `;

            case "5":
                return `
                <div id="curriculo" class="template5">
                  <header>
                    <div class="foto-container">
                      ${fotoBase64 ? `<div class="foto-bg" style="background-image: url('${fotoBase64}');"></div>` : ""}
                    </div>
                    <div class="info-corporativo">
                      <h2>${nome}</h2>
                      <p><strong>Email:</strong> ${email} | <strong>Telefone:</strong> ${telefone} | <strong>Estado civil:</strong> ${estadoCivil}</p>
                      <p><strong>Data de nascimento:</strong> ${nascimento} | <strong>Endereço:</strong> ${endereco}</p>
                    </div>
                  </header>

                  <section>
                    <h2>Objetivo Profissional</h2>
                    <p>${objetivo}</p>
                  </section>

                  <section>
                    <h2>Experiência Profissional</h2>
                    ${montarExperiencias()}
                  </section>

                  <section>
                    <h2>Formação Acadêmica</h2>
                    <p>${formacao}</p>
                  </section>

                  <section>
                    <h2>Habilidades</h2>
                    <p>${habilidades}</p>
                  </section>
                </div>
                `;
        }
    }

    function gerarCurriculo(fotoBase64) {
        const curriculoHTML = gerarCurriculoTemplate(template, fotoBase64);
        const resultadoHTML = curriculoHTML + `<button id="baixarPDF">📄 Baixar em PDF</button>`;
        document.getElementById("resultado").innerHTML = resultadoHTML;

        const botaoPDF = document.getElementById("baixarPDF");
        botaoPDF.addEventListener("click", async function() {
            const elemento = document.getElementById("curriculo");

            const botoes = elemento.querySelectorAll("button");
            botoes.forEach(btn => btn.style.display = "none");

            const imgs = elemento.querySelectorAll("img");
            await Promise.all(Array.from(imgs).map(img => {
                if (img.complete) return;
                return new Promise(resolve => {
                    img.onload = img.onerror = resolve;
                });
            }));

            const canvas = await html2canvas(elemento, {
                scale: 4,
                useCORS: true,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF("p", "mm", "a4");

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${nome}_curriculo.pdf`);

            botoes.forEach(btn => btn.style.display = "");
        });
    }

    if (foto) {
        let reader = new FileReader();
        reader.onload = function(e) {
            gerarCurriculo(e.target.result);
        };
        reader.readAsDataURL(foto);
    } else {
        gerarCurriculo(null);
    }
});

const btnAddExperiencia = document.getElementById("btnAddExperiencia");
const modalExperiencia = document.getElementById("modalExperiencia");
const btnSalvarExperiencia = document.getElementById("btnSalvarExperiencia");
const btnCancelarExperiencia = document.getElementById("btnCancelarExperiencia");

const inputEmpresa = document.getElementById("inputEmpresa");
const inputCargo = document.getElementById("inputCargo");
const inputPeriodo = document.getElementById("inputPeriodo");

const listaExperiencias = document.getElementById("listaExperiencias");

btnAddExperiencia.addEventListener("click", () => {
  inputEmpresa.value = "";
  inputCargo.value = "";
  inputPeriodo.value = "";
  modalExperiencia.style.display = "flex";
  inputEmpresa.focus();
});

btnCancelarExperiencia.addEventListener("click", () => {
  modalExperiencia.style.display = "none";
});

btnSalvarExperiencia.addEventListener("click", () => {
  const empresa = inputEmpresa.value.trim();
  const cargo = inputCargo.value.trim();
  const periodo = inputPeriodo.value.trim();

  if (!empresa || !cargo || !periodo) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const experienciaDiv = document.createElement("div");
  experienciaDiv.classList.add("experiencia-item");
  experienciaDiv.innerHTML = `
    <div>
      <strong>Empresa:</strong> ${empresa} <br>
      <strong>Cargo:</strong> ${cargo} <br>
      <strong>Período:</strong> ${periodo}
    </div>
    <div class="separa-experiencia">
      <button class="btn-excluir" id="button-lixo"><img src="lixo-simbolo.jpg" class="lixo"></button>
    </div>
  `;

  experienciaDiv.querySelector(".btn-excluir").addEventListener("click", function() {
    experienciaDiv.remove();
  });

  listaExperiencias.appendChild(experienciaDiv);
  modalExperiencia.style.display = "none";
});
