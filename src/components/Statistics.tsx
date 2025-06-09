
const Statistics = () => {
  const stats = [
    { number: "2,500+", label: "محامي مُسجل", icon: "👨‍💼" },
    { number: "15,000+", label: "قضية ناجحة", icon: "⚖️" },
    { number: "98%", label: "نسبة رضا العملاء", icon: "😊" },
    { number: "24/7", label: "دعم متواصل", icon: "🕐" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-800/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">منصة سند بالأرقام</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            أرقام تعكس ثقة العملاء وجودة الخدمات المقدمة في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-secondary mb-2">{stat.number}</div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
