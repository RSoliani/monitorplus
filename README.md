# Plataforma de Monitoramento de Baterias 🔋☀️🌬️

Uma plataforma web front-end interativa para simular o monitoramento de sistemas de baterias associados a fontes de energia solar e eólica. Este projeto foi desenvolvido como uma demonstração prática de tecnologias web (HTML5, CSS3, JavaScript com Bootstrap) e foca na experiência do usuário para visualização e análise de dados simulados.

## Funcionalidades Principais

* **Dashboard em Tempo Real (Simulado):**
    * Exibição de métricas chave: Nível de Carga (SoC), Saúde da Bateria (SoH), Temperatura, Voltagem, Corrente e Potência.
    * Cards informativos para visualização rápida do estado do sistema.
    * Tabela com detalhes adicionais do sistema.
    * Botão para simular a atualização de dados.
* **Gráficos Dinâmicos no Dashboard:**
    * Visualização do histórico recente de "Nível de Carga".
    * Visualização da "Geração Recente (W)".
    * Utiliza a biblioteca Chart.js para renderização.
* **Seção de Histórico de Dados:**
    * Filtragem de dados históricos por período (data de início e fim).
    * Exibição dos dados filtrados em formato tabular.
    * Funcionalidade de **exportação dos dados da tabela para Excel (.xlsx)** utilizando a biblioteca SheetJS (xlsx.js).
    * Geração de uma extensa massa de dados simulados (de Jan/2025 até a data atual simulada) para exploração.
* **Navegação Estilo SPA:**
    * Transição suave entre as seções (Dashboard, Histórico, Configurações, Ajuda) sem recarregar a página, utilizando JavaScript.
* **Tema Escuro / Claro:**
    * Opção para alternar entre tema claro e escuro para melhor conforto visual.
    * A preferência de tema é salva no `localStorage` do navegador.
* **Seção de Configurações:**
    * Controle para ativar/desativar o tema escuro.
    * Campos placeholder para futuras configurações (ex: email para notificações, intervalo de atualização).
* **Seção de Ajuda:**
    * Estrutura com Perguntas Frequentes (FAQ) utilizando o componente Accordion do Bootstrap.
    * Informações de contato (placeholder).
    * Links para recursos adicionais (placeholder).
* **Interface Responsiva:**
    * Design adaptável a diferentes tamanhos de tela (desktops, tablets, smartphones) utilizando Bootstrap 5.

## Tecnologias Utilizadas

* **HTML5:** Estruturação semântica do conteúdo.
* **CSS3:** Estilização visual, layout responsivo e implementação dos temas (claro/escuro) com variáveis CSS.
* **Bootstrap 5.3.3:** Framework CSS para agilizar o desenvolvimento da interface com componentes responsivos.
* **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM, simulação de dados, interatividade, navegação, gerenciamento de tema e integração com bibliotecas.
* **Chart.js 4.4.3:** Biblioteca para criação de gráficos dinâmicos.
* **SheetJS (xlsx.js) 0.18.5:** Biblioteca para exportação de dados para o formato Excel.
* **Font Awesome 6.5.2:** Biblioteca de ícones vetoriais.

## Estrutura do Projeto

/
|-- index.html         (Arquivo HTML principal da aplicação)
|-- css/
|   |-- style.css      (Folha de estilos personalizada e temas)
|-- js/
|   |-- script.js      (Toda a lógica JavaScript da aplicação)
|-- README.md          (Este arquivo de documentação)


## Como Visualizar/Executar

1.  **Clone o repositório (se estiver no GitHub):**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git)
    ```
    (Substitua `SEU_USUARIO/NOME_DO_SEU_REPOSITORIO` pelo link real do seu projeto)

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd NOME_DO_SEU_REPOSITORIO
    ```

3.  **Abra o arquivo `index.html`:**
    * Abra o arquivo `index.html` diretamente em seu navegador web preferido (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.). Não é necessário um servidor web para este projeto front-end, mas ele funcionará se servido por um.

4.  **Conexão com a Internet:**
    * É necessária uma conexão ativa com a internet para que as bibliotecas carregadas via CDN (Bootstrap, Chart.js, SheetJS, Font Awesome) funcionem corretamente.

## Screenshots (Sugestão)

## Possíveis Melhorias Futuras

* Integração com um backend real para persistência de dados e obtenção de informações dinâmicas de sensores.
* Sistema de autenticação de usuários e perfis personalizados.
* Implementação de alertas e notificações configuráveis.
* Funcionalidade de exportação para PDF dos relatórios de histórico (se os problemas com bibliotecas forem resolvidos ou uma abordagem alternativa for usada).
* Exportação dos gráficos do dashboard (imagem, etc.).
* Paginação real para a tabela de histórico com grandes volumes de dados.
* Testes automatizados (unitários, de integração, e2e).
* Otimizações de performance.

## Contribuição

Este é um projeto desenvolvido para fins de aprendizado e demonstração. No entanto, sugestões e contribuições são bem-vindas! Sinta-se à vontade para abrir uma *Issue* para discutir ideias ou reportar problemas, ou um *Pull Request* com melhorias.

## Licença

Este projeto é primariamente para fins educacionais.
---
