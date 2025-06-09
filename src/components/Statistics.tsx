
const Statistics = () => {
  const stats = [
    { number: "2,500+", label: "محامي مُسجل", icon: "👨‍💼" },
    { number: "15,000+", label: "قضية ناجحة", icon: "⚖️" },
    { number: "98%", label: "نسبة رضا العملاء", icon: "😊" },
    { number: "24/7", label: "دعم متواصل", icon: "🕐" }
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">منصة سند بالأرقام</h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            أرقام تعكس ثقة العملاء وجودة الخدمات المقدمة في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-secondary mb-2">{stat.number}</div>
              <div className="opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
