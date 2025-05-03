import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DescontosFuriosos: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: '',
    recebeDescontos: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? e.target.value : '';
    setFormData(prev => ({
      ...prev,
      recebeDescontos: value
    }));
  };

  const validate = () => {
    const { nome, cpf, email, telefone, rua, numero, cidade, estado, cep, recebeDescontos } = formData;
    if (!nome || !cpf || !email || !telefone || !rua || !numero || !cidade || !estado || !cep || !recebeDescontos) {
      setError('Preencha todos os campos obrigatórios.');
      return false;
    }
    if (cpf.replace(/\D/g, '').length !== 11) {
      setError('CPF deve conter 11 dígitos.');
      return false;
    }
    if (!email.includes('@')) {
      setError('Email inválido.');
      return false;
    }
    if (telefone.replace(/\D/g, '').length < 10) {
      setError('Telefone inválido.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validate()) return;
    setLoading(true);

    try {
      await addDoc(collection(db, 'descontosFuriosos'), {
        ...formData,
        timestamp: Timestamp.now(),
      });

      setSuccess(true);
      setFormData({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: '',
        recebeDescontos: '',
      });

    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setError('Erro ao enviar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center px-4 py-12">
      <div className="bg-zinc-800 w-full max-w-4xl p-8 md:p-12 rounded-2xl shadow-[0_0_30px_rgba(255,255,0,0.2)] border border-yellow-500">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-yellow-400 drop-shadow-md">
          🚀 Descontos Furiosos
        </h1>
        <p className="text-base md:text-lg mb-8 text-center text-zinc-300">
          Preencha seus dados abaixo e desbloqueie vantagens exclusivas para os furiosos de plantão! 💥
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'nome', placeholder: 'Nome completo' },
            { name: 'cpf', placeholder: 'CPF (somente números)' },
            { name: 'email', placeholder: 'E-mail' },
            { name: 'telefone', placeholder: 'Telefone' },
            { name: 'rua', placeholder: 'Rua' },
            { name: 'numero', placeholder: 'Número' },
            { name: 'cidade', placeholder: 'Cidade' },
            { name: 'estado', placeholder: 'Estado' },
            { name: 'cep', placeholder: 'CEP' },
          ].map(({ name, placeholder }) => (
            <input
              key={name}
              type={name === 'email' ? 'email' : 'text'}
              name={name}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData] || ''}
              onChange={handleChange}
              required
              className="bg-zinc-700 text-white placeholder-zinc-400 px-4 py-3 rounded-xl border border-zinc-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-sm hover:shadow-yellow-500/10"
            />
          ))}

          <div className="col-span-full">
            <label className="block text-yellow-400 mb-2">Como você gostaria de receber os descontos?</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  value="whatsapp"
                  checked={formData.recebeDescontos === 'whatsapp'}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 accent-yellow-400 cursor-pointer"
                />
                <span className="hover:text-yellow-400 transition">WhatsApp</span>
              </label>

              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  value="email"
                  checked={formData.recebeDescontos === 'email'}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 accent-yellow-400 cursor-pointer"
                />
                <span className="hover:text-yellow-400 transition">E-mail</span>
              </label>
            </div>
          </div>

          <div className="col-span-full">
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black font-extrabold py-3 rounded-xl shadow-lg hover:bg-yellow-400 hover:shadow-yellow-300 transition duration-300 text-lg tracking-wide"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? 'Enviando...' : '🚀 Enviar e Desbloquear'}
            </motion.button>
          </div>

          {error && (
            <p className="col-span-full text-red-500 mt-2 text-center">{error}</p>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="col-span-full text-center p-6 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500 rounded-xl shadow-lg text-black font-bold"
            >
              <h2 className="text-3xl mb-4">💥 Você está oficialmente no jogo! 💥</h2>
              <p className="text-xl mb-6">
                UAU! Você acabou de desbloquear uma nova fase! Agora, conheça outros torcedores da FURIA e compartilhe a energia com a galera.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/outros-torcedores')}
                  className="px-6 py-3 bg-black text-yellow-500 font-bold text-xl rounded-xl hover:bg-yellow-500 hover:text-black transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  Conheça outros torcedores
                </motion.button>
                <motion.button
                  onClick={() => navigate('/descontos')}
                  className="px-6 py-3 bg-black text-yellow-500 font-bold text-xl rounded-xl hover:bg-yellow-500 hover:text-black transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  Ver mais descontos
                </motion.button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DescontosFuriosos;
