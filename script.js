document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cep-form");
    const cepInput = document.getElementById("cep");
    const resultDiv = document.getElementById("result");
    const spinner = document.getElementById("spinner");
    const errorMessage = document.getElementById("error-message");
    const historyList = document.getElementById("history-list");
  
    // Aplicar máscara no campo de CEP
    const maskOptions = { mask: "00000-000" };
    IMask(cepInput, maskOptions);
  
    // Função para buscar CEP na API
    async function fetchCep(cep) {
      try {
        spinner.classList.remove("hidden");
        resultDiv.classList.add("hidden");
        errorMessage.classList.add("hidden");
  
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro ao buscar o CEP");
        const data = await response.json();
        if (data.erro) throw new Error("CEP não encontrado!");
  
        // Preencher os campos com os dados recebidos
        document.getElementById("city").textContent = data.localidade;
        document.getElementById("neighborhood").textContent = data.bairro || "Não informado";
        document.getElementById("state").textContent = data.uf;
  
        resultDiv.classList.remove("hidden");
        addToHistory(cep);
      } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
      } finally {
        spinner.classList.add("hidden");
      }
    }
  
    // Função para adicionar CEP ao histórico
    function addToHistory(cep) {
      const listItem = document.createElement("li");
      listItem.textContent = cep;
      historyList.appendChild(listItem);
    }
  
    // Manipular envio do formulário
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const cep = cepInput.value.replace("-", "");
      if (cep.length !== 8) {
        errorMessage.textContent = "Por favor, insira um CEP válido.";
        errorMessage.classList.remove("hidden");
        return;
      }
      fetchCep(cep);
    });
  });