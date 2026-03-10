import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

// Componente para um coração individual caindo
const FallingHeart = ({ delay, duration, left }: { delay: number; duration: number; left: number }) => {
  return (
    <div
      className="absolute top-0 text-red-500 opacity-70 pointer-events-none"
      style={{
        left: `${left}%`,
        animation: `fall ${duration}s linear ${delay}s infinite`,
        fontSize: `${Math.random() * 20 + 15}px`
      }}
    >
      ❤️
    </div>
  );
};

function App() {
  // Define a data de início do relacionamento: 18 de outubro de 2024
  const startDate = new Date('2024-10-18');
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Estado para controlar a animação de corações
  const [showHearts, setShowHearts] = useState(true);

  // Efeito que atualiza o contador a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      // Calcula os anos completos
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
      
      // Calcula os meses (aproximadamente, considerando mês como 30.44 dias)
      const totalMonths = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
      const months = totalMonths - (years * 12);
      
      // Calcula os dias restantes após contar os meses completos
      const daysInMonths = totalMonths * 30.44;
      const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24) - daysInMonths);
      
      // Calcula as horas, minutos e segundos
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeElapsed({ years, months, days: remainingDays, hours, minutes, seconds });
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, []);

  // Efeito para parar a animação de corações após 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHearts(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Gera array de corações com propriedades aleatórias
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4,
    left: Math.random() * 100
  }));

  return (
    // Container principal com gradiente de fundo rosa
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animação de corações caindo */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {hearts.map((heart) => (
            <FallingHeart
              key={heart.id}
              delay={heart.delay}
              duration={heart.duration}
              left={heart.left}
            />
          ))}
        </div>
      )}
      
      {/* Container do conteúdo central */}
      <div className="max-w-2xl w-full space-y-8 text-center relative z-20">
        {/* Seção da foto com coração */}
        <div className="relative flex justify-center">
          {/* Container da imagem com largura fixa */}
          <div className="w-[400px] h-[350px] relative overflow-hidden rounded-2xl shadow-lg">
            {/* Imagem do casal */}
            <img
              src="https://raw.githubusercontent.com/LeonaaaRdo/Teste/4cc42f5e42eed516b71231347de2df4a52c744ea/beijinho.png"
              alt="Foto do Casal"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Ícone de coração sobreposto à imagem */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <Heart className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-lg" />
          </div>
        </div>
        
        {/* Card com o contador */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg mt-12">
          {/* Título e subtítulo */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Começo de algo incrível</h1>
          <p className="text-gray-600 mb-6">Mais feliz desde 18 de outubro de 2024</p>
          
          {/* Grid com os contadores */}
          <div className="grid grid-cols-6 gap-3">
            {/* Contador de anos */}
            <div className="bg-pink-50 p-3 rounded-lg">
              <div className="text-3xl font-bold text-pink-600">{timeElapsed.years}</div>
              <div className="text-sm text-gray-600">Anos</div>
            </div>
            {/* Contador de meses */}
            <div className="bg-pink-50 p-3 rounded-lg">
              <div className="text-3xl font-bold text-pink-600">{timeElapsed.months}</div>
              <div className="text-sm text-gray-600">Meses</div>
            </div>
            {/* Contador de dias */}
            <div className="bg-pink-50 p-3 rounded-lg">
              <div className="text-3xl font-bold text-pink-600">{timeElapsed.days}</div>
              <div className="text-sm text-gray-600">Dias</div>
            </div>
            {/* Contador de horas */}
            <div className="bg-pink-50 p-3 rounded-lg">
              <div className="text-3xl font-bold text-pink-600">{timeElapsed.hours}</div>
              <div className="text-sm text-gray-600">Horas</div>
            </div>
            {/* Contador de minutos */}
            <div className="bg-pink-50 p-3 rounded-lg">
              <div className="text-3xl font-bold text-pink-600">{timeElapsed.minutes}</div>
              <div className="text-sm text-gray-600">Minutos</div>
            </div>
            {/* Contador de segundos */}
            <div className="bg-pink-50 p-3 rounded-lg">
              <div className="text-3xl font-bold text-pink-600">{timeElapsed.seconds}</div>
              <div className="text-sm text-gray-600">Segundos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;