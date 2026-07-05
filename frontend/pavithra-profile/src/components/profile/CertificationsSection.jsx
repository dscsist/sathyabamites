export default function CertificationsSection() {
  const certs = [
    "AWS Cloud Practitioner",
    "Python Essentials",
    "React Fundamentals",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        📜 Certifications
      </h2>

      <div className="space-y-3">
        {certs.map((cert) => (
          <div
            key={cert}
            className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3"
          >
            <span className="text-green-600">✔</span>
            <span>{cert}</span>
          </div>
        ))}
      </div>
    </div>
  );
}