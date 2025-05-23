'use strict';

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 DOM Carregado. Iniciando script.js (sem funcionalidade PDF).");

    // --- Seletores de Elementos ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-brand[data-target]');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggleSwitch = document.getElementById('theme-toggle-switch');
    const footerYearEl = document.getElementById('footer-year');

    const elNivelCarga = document.getElementById('data-nivel-carga');
    const elSaudeBateria = document.getElementById('data-saude-bateria');
    const elTemperatura = document.getElementById('data-temperatura');
    const elTensao = document.getElementById('data-tensao');
    const elCorrente = document.getElementById('data-corrente');
    const elPotencia = document.getElementById('data-potencia');
    const btnRefreshData = document.getElementById('btn-refresh-data');
    const chartCargaCanvas = document.getElementById('chart-carga');
    const chartGeracaoCanvas = document.getElementById('chart-geracao');

    const histDataInicioEl = document.getElementById('hist-data-inicio');
    const histDataFimEl = document.getElementById('hist-data-fim');
    const btnFiltrarHistorico = document.getElementById('btn-filtrar-historico');
    const tabelaHistoricoCorpoEl = document.getElementById('tabela-historico-corpo');
    const btnExportarExcel = document.getElementById('btn-exportar-excel');
    // const btnExportarPdf = document.getElementById('btn-exportar-pdf'); // REMOVIDO

    // --- Dados e Estado da Aplicação ---
    let dadosBateriaAtual = { 
        nivelCarga: 88, saudeBateria: 95, temperatura: 25, tensao: 48.8, corrente: 3.5, potencia: 0,
        historicoCargaDashboard: [80, 82, 81, 83, 85, 84, 86, 88, 87, 89, 90, 88],
        historicoGeracaoDashboard: [100, 150, 200, 250, 300, 280, 260, 240, 200, 180, 150, 120]
    };
    dadosBateriaAtual.potencia = parseFloat((dadosBateriaAtual.tensao * dadosBateriaAtual.corrente).toFixed(2));

    let amostraDadosHistoricosCompletos = [];
    let dadosHistoricosFiltradosGlobal = []; 

    function gerarDadosHistoricosDetalhados() { 
        const dados = [];
        try {
            const dataInicial = new Date(2025, 0, 1); 
            const dataFinal = new Date(); 
            if (dataFinal < dataInicial) dataFinal.setFullYear(2025, 4, 21); // Mês 4 = Maio
            let nivelCargaSim = 70;
            for (let dia = new Date(dataInicial); dia <= dataFinal; dia.setDate(dia.getDate() + 1)) {
                for (let hora = 0; hora < 24; hora += (Math.floor(Math.random()*3)+3) ) {
                    const dataHoraRegistro = new Date(dia);
                    dataHoraRegistro.setHours(hora, Math.floor(Math.random() * 60));
                    let correnteSim = parseFloat(((Math.random() * 25) - 12).toFixed(1));
                    nivelCargaSim = Math.max(5, Math.min(100, nivelCargaSim + correnteSim * 0.25));
                    let fonteSimulada = "Rede";
                    if (hora >= 6 && hora < 19 && Math.random() > 0.25) fonteSimulada = "Solar";
                    else if ((hora < 7 || hora > 19) && Math.random() > 0.4) fonteSimulada = "Eólica";
                    if (correnteSim < -0.5 && fonteSimulada !== "Solar" && fonteSimulada !== "Eólica") fonteSimulada = "Descarga";
                    dados.push({
                        dataHora: dataHoraRegistro.toISOString().slice(0, 16).replace('T', ' '),
                        nivelCarga: Math.round(nivelCargaSim),
                        tensao: parseFloat((45 + (nivelCargaSim / 100) * 7).toFixed(1)),
                        corrente: correnteSim,
                        temperatura: Math.round(22 + Math.random() * 8 + (Math.abs(correnteSim) / 6)),
                        fonte: fonteSimulada,
                        eventos: Math.random() > 0.97 ? "Alerta Pico Consumo" : (Math.random() > 0.96 ? "Info: Bateria Otimizada" : "-")
                    });
                }
            }
            return dados.sort((a,b) => new Date(a.dataHora.replace(' ','T')) - new Date(b.dataHora.replace(' ','T')));
        } catch (error) { console.error("❌ ERRO ao gerar dados históricos detalhados:", error); return []; }
    }
    amostraDadosHistoricosCompletos = gerarDadosHistoricosDetalhados();
    console.log(`ℹ️ Total de dados históricos gerados: ${amostraDadosHistoricosCompletos.length}`);

    // --- Funções do Dashboard, Navegação, Tema ---
    function exibirDadosDashboard() {
        if (!document.getElementById('dashboard-content')?.classList.contains('active-section')) return;
        if (elNivelCarga) elNivelCarga.textContent = `${dadosBateriaAtual.nivelCarga}%`;
        if (elSaudeBateria) elSaudeBateria.textContent = `${dadosBateriaAtual.saudeBateria}%`;
        if (elTemperatura) elTemperatura.textContent = `${dadosBateriaAtual.temperatura}°C`;
        if (elTensao) elTensao.textContent = `${dadosBateriaAtual.tensao.toFixed(1)} V`;
        if (elCorrente) elCorrente.textContent = `${dadosBateriaAtual.corrente.toFixed(1)} A`;
        if (elPotencia) elPotencia.textContent = `${dadosBateriaAtual.potencia.toFixed(2)} W`;
    }

    function simularNovosDadosDashboard() {
        dadosBateriaAtual.nivelCarga = Math.floor(Math.random() * 65) + 35;
        dadosBateriaAtual.saudeBateria = Math.max(65, dadosBateriaAtual.saudeBateria - Math.round(Math.random()));
        dadosBateriaAtual.temperatura = Math.floor(Math.random() * 18) + 18;
        dadosBateriaAtual.tensao = parseFloat((47.5 + Math.random() * 3).toFixed(1));
        dadosBateriaAtual.corrente = parseFloat(((Math.random() * 20) - 8).toFixed(1));
        dadosBateriaAtual.potencia = parseFloat((dadosBateriaAtual.tensao * dadosBateriaAtual.corrente).toFixed(2));
        dadosBateriaAtual.historicoCargaDashboard.shift(); dadosBateriaAtual.historicoCargaDashboard.push(dadosBateriaAtual.nivelCarga);
        dadosBateriaAtual.historicoGeracaoDashboard.shift(); dadosBateriaAtual.historicoGeracaoDashboard.push(Math.max(0,Math.floor(dadosBateriaAtual.potencia > 0 ? dadosBateriaAtual.potencia : Math.random() * 80)));
        exibirDadosDashboard();
        if (typeof Chart !== 'undefined') atualizarDadosGraficosDashboard();
    }
    
    function mostrarSecao(targetId) {
        contentSections.forEach(s => s.classList.toggle('active-section', s.id === targetId));
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === targetId));
        const nc = document.getElementById('mainNavbar');
        if (nc?.classList.contains('show')) bootstrap.Collapse.getInstance(nc)?.hide();
        
        if (targetId === 'dashboard-content') {
            exibirDadosDashboard();
            if (typeof Chart !== 'undefined') criarOuAtualizarGraficosDashboard();
        } else if (targetId === 'historico-content' && histDataInicioEl && histDataFimEl) {
            if (!histDataInicioEl.valueAsDate && !histDataFimEl.valueAsDate) {
                const hoje = new Date(); const umMesAtras = new Date(new Date().setMonth(hoje.getMonth() - 1));
                histDataFimEl.valueAsDate = hoje; 
                histDataInicioEl.valueAsDate = umMesAtras;
            }
        }
    }
    
    function aplicarTema(tema) {
        document.body.classList.toggle('dark-theme', tema === 'dark');
        if (themeToggleSwitch) themeToggleSwitch.checked = (tema === 'dark');
        if (typeof Chart !== 'undefined') criarOuAtualizarGraficosDashboard();
    }

    // Gráficos do Dashboard
    let chartCargaInstance, chartGeracaoInstance;
    function getChartColors() { 
        const isDark = document.body.classList.contains('dark-theme');
        return {
            grid: getComputedStyle(document.documentElement).getPropertyValue(isDark ? '--chart-grid-dark' : '--chart-grid-light').trim() || (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
            labels: getComputedStyle(document.documentElement).getPropertyValue(isDark ? '--chart-label-dark' : '--chart-label-light').trim() || (isDark ? '#bbb' : '#555'),
            cargaLine: 'rgba(54, 162, 235, 1)', cargaFill: 'rgba(54, 162, 235, 0.2)',
            geracaoBar: 'rgba(75, 192, 192, 0.7)'
        };
    }
    function criarOuAtualizarGraficosDashboard() {
        if (!document.getElementById('dashboard-content')?.classList.contains('active-section')) return;
        if (typeof Chart === 'undefined') { console.error("Chart.js não definido."); return; }
        const colors = getChartColors();
        const labels = dadosBateriaAtual.historicoCargaDashboard.map((_, i) => `${i+1}`);
        const commonOptions = { responsive: true, maintainAspectRatio: false, animation: false, scales: {x:{ticks:{color:colors.labels, font:{size:10}},grid:{color:colors.grid}}, y:{ticks:{color:colors.labels, font:{size:10}},grid:{color:colors.grid},beginAtZero:true}}, plugins:{legend:{labels:{color:colors.labels, font:{size:12}}}}};
        
        if (chartCargaCanvas) {
            const d = {labels:labels,datasets:[{label:'Carga(%)',data:dadosBateriaAtual.historicoCargaDashboard,borderColor:colors.cargaLine,backgroundColor:colors.cargaFill,fill:true,tension:0.2, pointRadius:2}]};
            if(chartCargaInstance) {chartCargaInstance.data=d; chartCargaInstance.options=commonOptions; chartCargaInstance.update();}
            else chartCargaInstance=new Chart(chartCargaCanvas,{type:'line',data:d,options:commonOptions});
        }
        if (chartGeracaoCanvas) {
            const d = {labels:labels,datasets:[{label:'Geração(W)',data:dadosBateriaAtual.historicoGeracaoDashboard,backgroundColor:colors.geracaoBar}]};
            if(chartGeracaoInstance) {chartGeracaoInstance.data=d; chartGeracaoInstance.options=commonOptions; chartGeracaoInstance.update();}
            else chartGeracaoInstance=new Chart(chartGeracaoCanvas,{type:'bar',data:d,options:commonOptions});
        }
    }
    function atualizarDadosGraficosDashboard() { 
        if(chartCargaInstance){chartCargaInstance.data.datasets[0].data=dadosBateriaAtual.historicoCargaDashboard; chartCargaInstance.update('none');}
        if(chartGeracaoInstance){chartGeracaoInstance.data.datasets[0].data=dadosBateriaAtual.historicoGeracaoDashboard; chartGeracaoInstance.update('none');}
    }

    // --- LÓGICA DA SEÇÃO DE HISTÓRICO ---
    function popularTabelaHistorico(dadosParaExibir) {
        if (!tabelaHistoricoCorpoEl) { console.error("Elem. tabela-historico-corpo não encontrado."); return; }
        tabelaHistoricoCorpoEl.innerHTML = '';
        dadosHistoricosFiltradosGlobal = []; 

        if (!dadosParaExibir || dadosParaExibir.length === 0) {
            tabelaHistoricoCorpoEl.innerHTML = `<tr><td colspan="7" class="text-center">Nenhum dado encontrado para o período.</td></tr>`; return;
        }
        dadosHistoricosFiltradosGlobal = dadosParaExibir; 
        const MAX_ROWS = 100; const dadosView = dadosParaExibir.slice(0, MAX_ROWS);
        dadosView.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${item.dataHora}</td><td>${item.nivelCarga}</td><td>${item.tensao.toFixed(1)}</td><td>${item.corrente.toFixed(1)}</td><td>${item.temperatura.toFixed(0)}</td><td><span class="badge rounded-pill text-bg-${item.fonte === 'Solar' ? 'warning' : (item.fonte === 'Eólica' ? 'info' : (item.fonte === 'Rede' ? 'primary' : (item.fonte === 'Descarga' ? 'danger' : 'secondary')))}">${item.fonte}</span></td><td>${item.eventos}</td>`;
            tabelaHistoricoCorpoEl.appendChild(tr);
        });
        if (dadosParaExibir.length > MAX_ROWS) {
             tabelaHistoricoCorpoEl.innerHTML += `<tr><td colspan="7" class="text-center text-muted small">Mostrando ${MAX_ROWS} de ${dadosParaExibir.length}. Exporte para ver todos.</td></tr>`;
        }
    }

    function filtrarHistorico() {
        if (!histDataInicioEl || !histDataFimEl) { popularTabelaHistorico([]); return; }
        const inicioStr = histDataInicioEl.value, fimStr = histDataFimEl.value;
        if (!inicioStr || !fimStr) { alert("Selecione data de início e fim."); popularTabelaHistorico([]); return; }
        const [sAno, sMes, sDia] = inicioStr.split('-').map(Number); const inicio = new Date(sAno, sMes - 1, sDia, 0, 0, 0);
        const [eAno, eMes, eDia] = fimStr.split('-').map(Number); const fim = new Date(eAno, eMes - 1, eDia, 23, 59, 59);
        if (isNaN(inicio.getTime()) || isNaN(fim.getTime()) || fim < inicio) { alert("Datas inválidas."); popularTabelaHistorico([]); return; }
        
        const filtrados = amostraDadosHistoricosCompletos.filter(item => {
            const dataItem = new Date(item.dataHora.replace(' ', 'T') + ":00"); 
            return dataItem >= inicio && dataItem <= fim;
        });
        popularTabelaHistorico(filtrados);
    }

    // Funções de EXPORTAÇÃO - APENAS EXCEL
    function exportarParaExcel() {
        console.log("📤 Tentando exportar para Excel...");
        if (typeof XLSX === 'undefined') { 
            console.error("❌ XLSX (SheetJS) não carregado!");
            alert("Erro: Biblioteca de Excel não carregada. Verifique o link CDN e a conexão. Tente recarregar a página.");
            return; 
        }
        if (dadosHistoricosFiltradosGlobal.length === 0) { 
            alert("Nenhum dado filtrado para exportar."); return; 
        }
        try {
            const dados = dadosHistoricosFiltradosGlobal.map(i=>({'Data/Hora':i.dataHora,'Carga(%)':i.nivelCarga,'Tensao(V)':i.tensao,'Corrente(A)':i.corrente,'Temp(°C)':i.temperatura,'Fonte':i.fonte,'Eventos':i.eventos}));
            const ws = XLSX.utils.json_to_sheet(dados);
            const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Histórico");
            ws["!cols"] = [{wch:18},{wch:10},{wch:10},{wch:10},{wch:10},{wch:12},{wch:30}];
            XLSX.writeFile(wb, `Relatorio_Historico_${new Date().toISOString().slice(0,10)}.xlsx`);
            console.log("✅ Excel gerado e download iniciado.");
        } catch (e) { console.error("Erro ao gerar Excel:", e); alert("Erro ao gerar Excel.");}
    }
    
    // Event Listeners e Inicialização Geral
    navLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); mostrarSecao(link.dataset.target); }));
    if (themeToggleSwitch) themeToggleSwitch.addEventListener('change', () => { const nT = themeToggleSwitch.checked?'dark':'light'; localStorage.setItem('themePreference',nT); aplicarTema(nT); });
    if (btnRefreshData) btnRefreshData.addEventListener('click', simularNovosDadosDashboard);
    if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();
    
    if (btnFiltrarHistorico) btnFiltrarHistorico.addEventListener('click', filtrarHistorico);
    if (btnExportarExcel) btnExportarExcel.addEventListener('click', exportarParaExcel);
    // Listener para btnExportarPdf REMOVIDO

    const temaInicial = localStorage.getItem('themePreference') || 'light';
    aplicarTema(temaInicial);
    
    if (navLinks.length > 0 && navLinks[0].dataset.target) {
        navLinks[0].classList.add('active');
        mostrarSecao(navLinks[0].dataset.target);
    } else if (contentSections.length > 0) {
        contentSections[0].classList.add('active-section');
        if (contentSections[0].id === 'dashboard-content') {
            exibirDadosDashboard();
            if (typeof Chart !== 'undefined') criarOuAtualizarGraficosDashboard();
        }
    }
    
    // Teste tardio de bibliotecas PDF REMOVIDO
    console.log("🏁 Script.js finalizado e aplicação pronta! (Funcionalidade PDF foi removida)");
});
