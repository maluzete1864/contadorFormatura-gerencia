import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tempoRestante, setTempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
    acabou: false,
  });

  useEffect(() => {
    const dataFormatura = new Date("2025-12-15T00:00:00").getTime();

    const atualizarTempo = () => {
      const agora = new Date().getTime();
      const diferenca = dataFormatura - agora;

      if (diferenca <= 0) {
        setTempoRestante({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
          acabou: true,
        });
        return;
      }

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      setTempoRestante({ dias, horas, minutos, segundos, acabou: false });
    };

    atualizarTempo();
    const intervalo = setInterval(atualizarTempo, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container">
      <h1>Contagem Regressiva para a Formatura</h1>

      <p className="nome">
        Maria Luiza Martins Meira - Ensino Médio Integrado ao Curso Técnico em
        Informática 6A
      </p>

      {!tempoRestante.acabou ? (
        <>
          <div className="contador">
            <div className="bloco">
              <span className="numero">{tempoRestante.dias}</span>
              <span className="rotulo">dias</span>
            </div>
            <div className="bloco">
              <span className="numero">{tempoRestante.horas}</span>
              <span className="rotulo">horas</span>
            </div>
            <div className="bloco">
              <span className="numero">{tempoRestante.minutos}</span>
              <span className="rotulo">min</span>
            </div>
            <div className="bloco">
              <span className="numero">{tempoRestante.segundos}</span>
              <span className="rotulo">seg</span>
            </div>
          </div>

          <p className="frase">
            Após a formatura, vou viajar nas férias, me matricular na faculdade e entrar no mercado de trabalho!
          </p>
        </>
      ) : (
        <div className="mensagem-final">
          <h2>Chegou o grande dia!</h2>
          <p className="frase">
             Após a formatura, vou viajar nas férias, me matricular na faculdade e entrar no mercado de trabalho!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
